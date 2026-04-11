

## Plan: Update Paddle Price IDs

Replace the placeholder Price IDs in `supabase/functions/create-checkout/index.ts` with the real ones:

- **Starter** → `pri_01kny0s65drgrxz0v1kefsjxn2`
- **Creator** → `pri_01kny0ts2vwaqgtxhh28gw1bvs`
- **Pro** → `pri_01kny0yxxdgbm597wgs57re975`
- **Studio** → `pri_01kny10dkzn5nr7k59n96kajp3`

Single file change in the `PLAN_PRICES` mapping at the top of the edge function.

