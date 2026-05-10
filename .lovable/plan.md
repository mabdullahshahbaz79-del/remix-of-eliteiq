

## Final Step: Add Your Paddle Client-Side Token

The Paddle.js overlay checkout is fully integrated, but it needs your **client-side token** to initialize. Right now `src/pages/PricingPage.tsx` has a placeholder:

```ts
const PADDLE_CLIENT_TOKEN = "live_7c8e3a8f9b2d4e5f6a1b2c3d4e"; // placeholder
```

Until this is replaced with your real token, clicking "Get Pro" (or any plan) will fail silently or fall back to the broken redirect URL.

### What you need to do

**1. Get your client-side token from Paddle**

- Log in to https://vendors.paddle.com
- Go to **Developer Tools → Authentication** (left sidebar)
- Find the **Client-side tokens** section (separate from API keys)
- Click **Generate client-side token** if you don't have one yet
- Copy the token — it starts with `live_...` (e.g. `live_abc123def456...`)

> ⚠️ This is **different** from your API key (`pdl_live_apikey_...`). The API key is server-side only. The client-side token is safe to put in frontend code.

**2. Send the token to me in chat**

Just paste it in your next message, e.g.:
> "Here's my token: live_xxxxxxxxxxxxx"

### What I'll do once you send it

- Replace the placeholder `PADDLE_CLIENT_TOKEN` in `src/pages/PricingPage.tsx` with your real token
- That's it — the file is the only change needed

### What will happen after

1. User clicks "Get Pro" on the pricing page
2. `create-checkout` Edge Function creates a Paddle transaction and returns its ID
3. Paddle.js opens the **overlay checkout modal** on top of your pricing page (no redirect to a broken URL)
4. User pays → Paddle fires `checkout.completed` → page redirects to `/pricing?payment=success`
5. The `paddle-webhook` function generates the license key in the background

### Verifying afterwards

After I update the token, click any "Get [Plan]" button. You should see the Paddle overlay appear immediately — no more redirect to `eliteiq.tech/pricing?_ptxn=...`.

