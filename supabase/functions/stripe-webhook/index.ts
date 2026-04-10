import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.49.1";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2025-08-27.basil",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const PLAN_MAP: Record<string, { plan: string; prefix: string; duration: string; months: number; maxActivations: number }> = {
  Starter: { plan: "free", prefix: "ELITE-FREE", duration: "1 month", months: 1, maxActivations: 1 },
  Creator: { plan: "plus", prefix: "ELITE-PLUS", duration: "3 months", months: 3, maxActivations: 2 },
  Pro:     { plan: "pro",  prefix: "ELITE-PRO",  duration: "6 months", months: 6, maxActivations: 2 },
  Studio:  { plan: "max",  prefix: "ELITE-MAX",  duration: "1 year",   months: 12, maxActivations: 999 },
};

function generateKey(prefix: string): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const seg = (len: number) =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `${prefix}-${seg(4)}-${seg(4)}`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200 });
  }

  const signature = req.headers.get("stripe-signature");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  if (!signature || !webhookSecret) {
    return new Response("Missing signature or webhook secret", { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Webhook signature verification failed:", msg);
    return new Response(`Webhook Error: ${msg}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const planName = session.metadata?.plan;
    const customerEmail = session.customer_details?.email || session.customer_email;

    if (!planName || !PLAN_MAP[planName]) {
      console.error("Unknown plan in session metadata:", planName);
      return new Response("Unknown plan", { status: 400 });
    }

    const config = PLAN_MAP[planName];
    const licenseKey = generateKey(config.prefix);

    // Calculate expiry
    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setMonth(expiresAt.getMonth() + config.months);

    // Insert license
    const { error: licenseError } = await supabase.from("licenses").insert({
      license_key: licenseKey,
      plan: config.plan,
      status: "active",
      max_activations: config.maxActivations,
      duration: config.duration,
      expires_at: expiresAt.toISOString(),
      used_by_email: customerEmail || null,
      activated_at: now.toISOString(),
    });

    if (licenseError) {
      console.error("Failed to create license:", licenseError.message);
      return new Response("License creation failed", { status: 500 });
    }

    // Record transaction
    const amountPaid = session.amount_total ? session.amount_total / 100 : 0;
    await supabase.from("transactions").insert({
      amount: amountPaid,
      currency: session.currency || "usd",
      status: "completed",
      payment_method: "stripe",
      reference: session.id,
    });

    // Log activity
    await supabase.from("activity_logs").insert({
      action: `License ${licenseKey} auto-generated for ${customerEmail} (${planName} plan via Stripe)`,
      action_type: "license_auto_generate",
      target_license: licenseKey,
      target_email: customerEmail || null,
      status: "success",
      details: {
        plan: planName,
        amount: amountPaid,
        currency: session.currency,
        stripe_session_id: session.id,
      },
    });

    console.log(`License ${licenseKey} created for ${customerEmail} - Plan: ${planName}`);
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
});
