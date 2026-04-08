import { createClient } from "npm:@supabase/supabase-js@2.49.1";
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
import { z } from "npm:zod@3.25.76";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const ADMIN_EMAIL = "mabdullahwork0@gmail.com";
const ADMIN_PASSWORD_HASH = "flower\\182!@#$";

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function verifyAdmin(req: Request): Promise<boolean> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return false;
  const token = authHeader.replace("Bearer ", "");
  const { data } = await supabase.auth.getUser(token);
  return data?.user?.email === ADMIN_EMAIL;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.pathname.split("/").pop();

    // Login doesn't need auth verification
    if (action === "login" && req.method === "POST") {
      const body = await req.json();
      const { email, password } = body;
      if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD_HASH) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), {
          status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      // Sign in via Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        // If user doesn't exist, create them
        if (error.message.includes("Invalid login")) {
          const { data: signUpData, error: signUpError } = await supabase.auth.admin.createUser({
            email, password, email_confirm: true,
          });
          if (signUpError) {
            return new Response(JSON.stringify({ error: "Auth setup failed" }), {
              status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
          const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
          if (loginError) {
            return new Response(JSON.stringify({ error: loginError.message }), {
              status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
          return new Response(JSON.stringify({ session: loginData.session, user: loginData.user }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify({ error: error.message }), {
          status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ session: data.session, user: data.user }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // All other actions require admin auth
    const isAdmin = await verifyAdmin(req);
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // DASHBOARD STATS
    if (action === "stats") {
      const [profiles, licenses, transactions, logs] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact" }),
        supabase.from("licenses").select("*"),
        supabase.from("transactions").select("*"),
        supabase.from("activity_logs").select("*").order("created_at", { ascending: false }).limit(10),
      ]);

      const allLicenses = licenses.data || [];
      const activeLicenses = allLicenses.filter((l: any) => l.status === "active");
      const totalRevenue = (transactions.data || []).reduce((sum: number, t: any) => sum + Number(t.amount), 0);
      const expiringLicenses = allLicenses.filter((l: any) => {
        if (!l.expires_at) return false;
        const diff = new Date(l.expires_at).getTime() - Date.now();
        return diff > 0 && diff < 7 * 24 * 60 * 60 * 1000;
      });

      return new Response(JSON.stringify({
        totalUsers: profiles.count || 0,
        activeLicenses: activeLicenses.length,
        totalLicenses: allLicenses.length,
        totalRevenue,
        expiringSoon: expiringLicenses.length,
        recentActivity: logs.data || [],
        licenseBreakdown: {
          free: allLicenses.filter((l: any) => l.plan === "free").length,
          plus: allLicenses.filter((l: any) => l.plan === "plus").length,
          pro: allLicenses.filter((l: any) => l.plan === "pro").length,
          max: allLicenses.filter((l: any) => l.plan === "max").length,
        },
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // LICENSES
    if (action === "licenses") {
      if (req.method === "GET") {
        const { data, error } = await supabase.from("licenses").select("*").order("created_at", { ascending: false });
        return new Response(JSON.stringify(data || []), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (req.method === "POST") {
        const body = await req.json();
        const { plan, quantity = 1, max_activations = 1, expires_at, price_pkr, duration } = body;
        const prefixMap: Record<string, string> = { free: "ELITE-FREE", plus: "ELITE-PLUS", pro: "ELITE-PRO", max: "ELITE-MAX" };
        const prefix = prefixMap[plan] || "ELITE-FREE";
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const seg = (len: number) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");

        const keys = [];
        for (let i = 0; i < Math.min(quantity, 100); i++) {
          const license_key = `${prefix}-${seg(4)}-${seg(4)}`;
          keys.push({
            license_key, plan, max_activations, price_pkr: price_pkr || 0,
            duration: duration || "1 month", status: "active",
            expires_at, generated_by_admin: ADMIN_EMAIL,
          });
        }
        const { data, error } = await supabase.from("licenses").insert(keys).select();
        if (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (req.method === "PATCH") {
        const body = await req.json();
        const { id, ...updates } = body;
        const { data, error } = await supabase.from("licenses").update(updates).eq("id", id).select();
        if (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (req.method === "DELETE") {
        const body = await req.json();
        const { ids } = body;
        const { error } = await supabase.from("licenses").delete().in("id", ids);
        if (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // USERS (profiles)
    if (action === "users") {
      if (req.method === "GET") {
        const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
        return new Response(JSON.stringify(data || []), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (req.method === "PATCH") {
        const body = await req.json();
        const { id, ...updates } = body;
        const { data, error } = await supabase.from("profiles").update(updates).eq("id", id).select();
        if (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // LOGS
    if (action === "logs") {
      const { data } = await supabase.from("activity_logs").select("*").order("created_at", { ascending: false }).limit(500);
      return new Response(JSON.stringify(data || []), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // NOTIFICATIONS
    if (action === "notifications") {
      if (req.method === "GET") {
        const { data } = await supabase.from("notifications").select("*").order("created_at", { ascending: false });
        return new Response(JSON.stringify(data || []), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (req.method === "POST") {
        const body = await req.json();
        const { data, error } = await supabase.from("notifications").insert({
          ...body, created_by_admin: ADMIN_EMAIL, sent_at: body.is_draft ? null : new Date().toISOString(),
        }).select();
        if (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (req.method === "PATCH") {
        const body = await req.json();
        const { id, ...updates } = body;
        const { data, error } = await supabase.from("notifications").update(updates).eq("id", id).select();
        if (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (req.method === "DELETE") {
        const body = await req.json();
        const { ids } = body;
        const { error } = await supabase.from("notifications").delete().in("id", ids);
        if (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // LOG AN ACTION
    if (action === "log-action") {
      const body = await req.json();
      await supabase.from("activity_logs").insert({
        admin_email: ADMIN_EMAIL,
        action: body.action,
        action_type: body.action_type,
        target_email: body.target_email,
        target_license: body.target_license,
        details: body.details || {},
        status: body.status || "success",
        ip_address: req.headers.get("x-forwarded-for") || "unknown",
      });
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
