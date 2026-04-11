

## Plan: Replace Stripe with LemonSqueezy

### What Changes

Replace the current Stripe payment integration with LemonSqueezy for checkout and webhook-based license generation. The flow stays identical: user clicks plan button -> redirected to checkout -> webhook auto-generates license key.

### Setup Required (Before Code)

1. **Create a LemonSqueezy account** at lemonsqueezy.com
2. **Create a Store** and add 4 products (Starter, Creator, Pro, Studio) with correct prices
3. **Note the Store ID and Variant IDs** for each plan (each product has a variant ID)
4. **Create an API key** from LemonSqueezy Settings -> API
5. **Create a Webhook** in LemonSqueezy pointing to your backend function URL, listening for `order_completed` event, with a signing secret

### Technical Steps

**Step 1: Add secrets**
- Add `LEMONSQUEEZY_API_KEY` (API key from LS dashboard)
- Add `LEMONSQUEEZY_WEBHOOK_SECRET` (signing secret you set when creating webhook)

**Step 2: Rewrite `create-checkout` edge function**
- Replace Stripe SDK with LemonSqueezy REST API (`POST https://api.lemonsqueezy.com/v1/checkouts`)
- Map plan names to LemonSqueezy variant IDs
- Create checkout with variant ID, redirect URLs, and plan metadata in `custom` field
- Return the checkout URL

**Step 3: Rewrite `stripe-webhook` -> `lemonsqueezy-webhook` edge function**
- Verify signature using HMAC SHA-256 with `X-Signature` header
- Listen for `order_completed` event
- Extract plan name from `meta.custom_data.plan`
- Extract customer email from event data
- Generate license key (same logic as current)
- Insert license, transaction, and activity log (same DB logic)

**Step 4: Update `PricingPage.tsx`**
- Change payment step text from "Stripe" to "LemonSqueezy"
- Keep the same `handleCheckout` flow (calls `create-checkout` edge function)

**Step 5: Delete old Stripe webhook function**
- Remove `supabase/functions/stripe-webhook/` and deploy deletion

### Files to Create/Modify
- `supabase/functions/create-checkout/index.ts` — rewrite for LemonSqueezy API
- `supabase/functions/lemonsqueezy-webhook/index.ts` — new webhook handler
- `src/pages/PricingPage.tsx` — update text references
- Delete `supabase/functions/stripe-webhook/index.ts`

### What You Need to Provide
After approval, I will need:
1. Your **LemonSqueezy API key**
2. Your **LemonSqueezy Store ID**
3. The **Variant IDs** for each plan (Starter, Creator, Pro, Studio)
4. A **webhook signing secret** (you choose any random string)

