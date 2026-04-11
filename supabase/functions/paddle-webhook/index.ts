import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.49.1";

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

async function verifyPaddleSignature(body: string, signatureHeader: string, secret: string): Promise<boolean> {
  // Paddle-Signature format: ts=TIMESTAMP;h1=HASH
  const parts: Record<string, string> = {};
  for (const part of signatureHeader.split(";")) {
    const [key, val] = part.split("=");
    if (key && val) parts[key.trim()] = val.trim();
  }

  const ts = parts["ts"];
  const h1 = parts["h1"];
  if (!ts || !h1) return false;

  const signedPayload = `${ts}:${body}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signed = await crypto.subtle.sign("HMAC", key, encoder.encode(signedPayload));
  const hex = Array.from(new Uint8Array(signed))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hex === h1;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200 });
  }

  const signatureHeader = req.headers.get("paddle-signature");
  const webhookSecret = Deno.env.get("PADDLE_WEBHOOK_SECRET");

  if (!signatureHeader || !webhookSecret) {
    return new Response("Missing signature or webhook secret", { status: 400 });
  }

  const body = await req.text();

  const isValid = await verifyPaddleSignature(body, signatureHeader, webhookSecret);
  if (!isValid) {
    console.error("Paddle webhook signature verification failed");
    return new Response("Invalid signature", { status: 400 });
  }

  let event;
  try {
    event = JSON.parse(body);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const eventType = event.event_type;

  if (eventType === "transaction.completed") {
    const customData = event.data?.custom_data;
    const planName = customData?.plan;
    const customerEmail = event.data?.customer?.email || event.data?.billing_details?.email;

    if (!planName || !PLAN_MAP[planName]) {
      console.error("Unknown plan in webhook data:", planName);
      return new Response("Unknown plan", { status: 400 });
    }

    const config = PLAN_MAP[planName];
    const licenseKey = generateKey(config.prefix);

    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setMonth(expiresAt.getMonth() + config.months);

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

    const totals = event.data?.details?.totals;
    const amountPaid = totals ? parseFloat(totals.grand_total) / 100 : 0;
    const currency = event.data?.currency_code || "USD";
    const transactionId = event.data?.id;

    await supabase.from("transactions").insert({
      amount: amountPaid,
      currency,
      status: "completed",
      payment_method: "paddle",
      reference: transactionId ? String(transactionId) : null,
    });

    await supabase.from("activity_logs").insert({
      action: `License ${licenseKey} auto-generated for ${customerEmail} (${planName} plan via Paddle)`,
      action_type: "license_auto_generate",
      target_license: licenseKey,
      target_email: customerEmail || null,
      status: "success",
      details: {
        plan: planName,
        amount: amountPaid,
        currency,
        paddle_transaction_id: transactionId,
      },
    });

    console.log(`License ${licenseKey} created for ${customerEmail} - Plan: ${planName}`);
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
});
