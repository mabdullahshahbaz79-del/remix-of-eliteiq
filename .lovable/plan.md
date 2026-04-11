

## Plan: Replace LemonSqueezy with Paddle

### What Changes

Replace the LemonSqueezy payment integration with Paddle. Same flow: user clicks plan → redirected to Paddle checkout → webhook auto-generates license key.

### Setup Required (Before Code)

1. **Create a Paddle account** at paddle.com (use Sandbox for testing first)
2. **Create 4 products** (Starter, Creator, Pro, Studio) with one-time prices
3. **Note the Price IDs** for each plan (e.g., `pri_01abc...`)
4. **Get your API key** from Paddle Dashboard → Developer Tools → Authentication
5. **Create a webhook** in Paddle Dashboard → Developer Tools → Notifications, pointing to your backend function URL, listening for `transaction.completed` event, and note the webhook secret key

### Technical Steps

**Step 1: Add secrets**
- Replace `LEMONSQUEEZY_API_KEY` with `PADDLE_API_KEY`
- Replace `LEMONSQUEEZY_WEBHOOK_SECRET` with `PADDLE_WEBHOOK_SECRET`

**Step 2: Rewrite `create-checkout` edge function**
- Use Paddle Billing API (`POST https://api.paddle.com/transactions`) to create an inline checkout transaction
- Map plan names to Paddle Price IDs
- Return the Paddle checkout URL (or transaction ID for overlay checkout)

**Step 3: Rewrite `lemonsqueezy-webhook` → `paddle-webhook` edge function**
- Verify signature using Paddle's webhook signature (SHA-256 HMAC via `Paddle-Signature` header with `ts` and `h1` fields)
- Listen for `transaction.completed` event
- Extract plan name from custom data
- Extract customer email from event
- Generate license key, insert license/transaction/activity log (same DB logic)

**Step 4: Update `PricingPage.tsx`**
- Change text references from "LemonSqueezy" to "Paddle"

**Step 5: Delete old LemonSqueezy webhook function**
- Remove `supabase/functions/lemonsqueezy-webhook/`

### Files to Create/Modify
- `supabase/functions/create-checkout/index.ts` — rewrite for Paddle API
- `supabase/functions/paddle-webhook/index.ts` — new webhook handler
- `src/pages/PricingPage.tsx` — update text
- Delete `supabase/functions/lemonsqueezy-webhook/`

### What You Need to Provide
After approval, I will need:
1. Your **Paddle API key**
2. The **Price IDs** for each plan (Starter, Creator, Pro, Studio)
3. Your **Paddle webhook secret key**
4. Whether you're using **Sandbox** (testing) or **Live** mode

