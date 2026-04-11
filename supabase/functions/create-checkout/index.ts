import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// TODO: Replace with your actual Paddle Price IDs
const PLAN_PRICES: Record<string, string> = {
  Starter: "pri_01kny0s65drgrxz0v1kefsjxn2",
  Creator: "pri_01kny0ts2vwaqgtxhh28gw1bvs",
  Pro: "pri_01kny0yxxdgbm597wgs57re975",
  Studio: "pri_01kny10dkzn5nr7k59n96kajp3",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { plan, email } = await req.json();

    if (!plan || !PLAN_PRICES[plan]) {
      return new Response(JSON.stringify({ error: "Invalid plan" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const apiKey = Deno.env.get("PADDLE_API_KEY");
    if (!apiKey) {
      throw new Error("Paddle API key not configured");
    }

    const origin = req.headers.get("origin") || "https://adobescribe-pro.lovable.app";

    const transactionBody: Record<string, unknown> = {
      items: [
        {
          price_id: PLAN_PRICES[plan],
          quantity: 1,
        },
      ],
      checkout: {
        url: `${origin}/pricing?payment=success`,
      },
      custom_data: {
        plan: plan,
      },
    };

    if (email) {
      transactionBody.customer = { email };
    }

    const response = await fetch("https://api.paddle.com/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(transactionBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Paddle API error:", errorText);
      throw new Error(`Paddle API error: ${response.status}`);
    }

    const result = await response.json();
    const checkoutUrl = result.data?.checkout?.url;

    if (!checkoutUrl) {
      throw new Error("No checkout URL received from Paddle");
    }

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
