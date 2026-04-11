

## Plan: Implement Paddle Payment Integration

### Step 1: Add Secrets
Add two new secrets:
- `PADDLE_API_KEY` — user will input their Paddle API key
- `PADDLE_WEBHOOK_SECRET` — value: `pdl_ntfset_01knxzr1svhs1wbaghesde9qrv_2RBQaJuHCJw82NkzAjTLcRAdJYCtedvu`

### Step 2: Rewrite `create-checkout` Edge Function
Replace LemonSqueezy API calls with Paddle Billing API:
- Map plan names to Paddle Price IDs (placeholders until user provides them)
- Use `POST https://api.paddle.com/transactions` to create checkout
- Return the checkout URL

### Step 3: Create `paddle-webhook` Edge Function
New function at `supabase/functions/paddle-webhook/index.ts`:
- Verify webhook signature using Paddle's `Paddle-Signature` header (ts + h1 HMAC-SHA256)
- Handle `transaction.completed` event
- Extract plan from custom data, customer email from event payload
- Generate license key, insert into `licenses`, `transactions`, and `activity_logs` tables (same logic as current LemonSqueezy webhook)

### Step 4: Update Frontend
- Update `PricingPage.tsx` to replace "LemonSqueezy" references with "Paddle"

### Step 5: Delete Old Webhook
- Remove `supabase/functions/lemonsqueezy-webhook/` directory

### What I Still Need From You
- Your **Paddle API key** (will be requested via the secrets tool)
- The **Price IDs** for each plan (Starter, Creator, Pro, Studio) — or I can use placeholders you update later
- Are you using **Sandbox** or **Live** mode? (determines API base URL)

