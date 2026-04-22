

## How to Set the Default Payment Success URL in Paddle

This is a configuration step inside your **Paddle Dashboard** — no code changes needed. Once set, every successful checkout will redirect customers back to your pricing page with the success banner shown.

### Steps

1. **Log in to Paddle Dashboard** → https://vendors.paddle.com
2. In the left sidebar, click **Checkout** → **Checkout settings**
   *(On newer Paddle UI: **Developer Tools** → **Checkout settings**)*
3. Scroll to the **Default payment link** (or **Default success URL**) field
4. Paste this exact URL:
   ```
   https://eliteiq.tech/pricing?payment=success
   ```
5. Click **Save**

### What happens after

- Customer clicks "Get Pro" → Paddle's hosted checkout opens
- Customer completes payment → Paddle redirects to `https://eliteiq.tech/pricing?payment=success`
- Your existing green success banner + toast notification appear automatically (already coded in `PricingPage.tsx`)
- The webhook (`paddle-webhook` Edge Function) generates the license key and stores the transaction in the background

### Approved domain reminder

Make sure `eliteiq.tech` is also listed under **Checkout** → **Approved domains** in Paddle (you confirmed it already is). The success URL must use a domain from that approved list, otherwise Paddle rejects it.

### If you can't find the setting

Paddle occasionally renames menu items. Look for any of these labels:
- "Default payment link"
- "Default success URL"
- "Checkout completion URL"
- "Post-checkout redirect"

All refer to the same field. If still missing, it may be under **Developer Tools** → **Checkout settings** instead of **Checkout** → **Checkout settings**.

### No code changes required

Your code is already correct:
- `create-checkout` Edge Function lets Paddle return its hosted checkout URL
- `PricingPage.tsx` redirects users there
- The success banner reads `?payment=success` from the URL when they return

Once you save the URL in Paddle, the full flow will work end-to-end.

