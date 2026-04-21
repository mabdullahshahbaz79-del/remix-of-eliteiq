

## Plan: Restore Custom Success/Cancel Redirect URLs in Paddle Checkout

Now that `eliteiq.tech` is approved in your Paddle dashboard, we can re-enable the custom checkout redirect so users return to your pricing page with a success or cancellation status after payment.

### What changes

**File:** `supabase/functions/create-checkout/index.ts`

Add the `checkout.url` property back to the `transactionBody` sent to Paddle, but point it at your approved domain (`https://eliteiq.tech`) instead of the Lovable preview origin. This guarantees Paddle accepts the URL regardless of which environment (preview, published, custom domain) initiated the checkout.

```ts
const SUCCESS_REDIRECT = "https://eliteiq.tech/pricing?payment=success";

const transactionBody: Record<string, unknown> = {
  items: [{ price_id: PLAN_PRICES[plan], quantity: 1 }],
  custom_data: { plan },
  checkout: { url: SUCCESS_REDIRECT },
};
```

The existing `origin`-based logic is removed since it caused the 400 error whenever the request came from an unapproved domain (e.g., the Lovable preview subdomain).

### Result

- After successful payment → user is redirected to `https://eliteiq.tech/pricing?payment=success` (triggers the existing green success banner + toast).
- After cancellation → Paddle's default cancel behavior returns the user to the same URL; the existing `payment=cancelled` handler still works if Paddle appends it.
- No more `transaction_checkout_url_domain_is_not_approved` 400 errors.

### Optional follow-up (not included unless you ask)

If you want preview/test checkouts to redirect back to the Lovable preview instead of production, you'd need to also add `id-preview--dc2c398a-5c9e-419e-b454-f4b8cd66114f.lovable.app` to Paddle's approved domains. For now, all checkouts will land on `eliteiq.tech`.

