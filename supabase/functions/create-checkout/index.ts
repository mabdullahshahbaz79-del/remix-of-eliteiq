import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PLAN_PRICES: Record<string, string> = {
  Starter: "price_1TKZ7EGdkPJnSWvgS9y87bGx",
  Creator: "price_1TKZ7gGdkPJnSWvgNVXnwX0V",
  Pro: "price_1TKZ7uGdkPJnSWvgf3mDjq2G",
  Studio: "price_1TKZ7yGdkPJnSWvgDjrL3aRT",
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

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check for existing customer
    let customerId: string | undefined;
    if (email) {
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      }
    }

    const origin = req.headers.get("origin") || "https://adobescribe-pro.lovable.app";

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email || undefined,
      line_items: [
        {
          price: PLAN_PRICES[plan],
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/pricing?payment=success`,
      cancel_url: `${origin}/pricing?payment=cancelled`,
      metadata: {
        plan,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
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
