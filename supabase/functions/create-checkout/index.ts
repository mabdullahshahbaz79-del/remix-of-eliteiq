import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// TODO: Replace these with your actual LemonSqueezy variant IDs
const PLAN_VARIANTS: Record<string, string> = {
  Starter: "VARIANT_ID_STARTER",
  Creator: "VARIANT_ID_CREATOR",
  Pro: "VARIANT_ID_PRO",
  Studio: "VARIANT_ID_STUDIO",
};

// TODO: Replace with your actual LemonSqueezy Store ID
const STORE_ID = "STORE_ID_HERE";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { plan, email } = await req.json();

    if (!plan || !PLAN_VARIANTS[plan]) {
      return new Response(JSON.stringify({ error: "Invalid plan" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const apiKey = Deno.env.get("LEMONSQUEEZY_API_KEY");
    if (!apiKey) {
      throw new Error("LemonSqueezy API key not configured");
    }

    const origin = req.headers.get("origin") || "https://adobescribe-pro.lovable.app";

    const checkoutBody = {
      data: {
        type: "checkouts",
        attributes: {
          checkout_options: {
            embed: false,
          },
          checkout_data: {
            email: email || undefined,
            custom: {
              plan: plan,
            },
          },
          product_options: {
            redirect_url: `${origin}/pricing?payment=success`,
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: STORE_ID,
            },
          },
          variant: {
            data: {
              type: "variants",
              id: PLAN_VARIANTS[plan],
            },
          },
        },
      },
    };

    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        "Accept": "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(checkoutBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("LemonSqueezy API error:", errorText);
      throw new Error(`LemonSqueezy API error: ${response.status}`);
    }

    const result = await response.json();
    const checkoutUrl = result.data.attributes.url;

    return new Response(JSON.stringify({ url: checkoutUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
