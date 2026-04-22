import { Link, useSearchParams } from "react-router-dom";
import { Check, Star, Sparkles, Loader2, CheckCircle, XCircle } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-animation";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";

const allFeatures = [
  "All 9 platforms support",
  "Unlimited files",
  "50 keywords per asset",
  "CSV export",
  "Metadata embedding",
  "Confidence scoring",
];

const plans = [
  { name: "Starter", price: "$2.99", original: null, duration: "1 Month", save: null, badge: null, highlight: false },
  { name: "Creator", price: "$7.49", original: "$8.97", duration: "3 Months", save: "Save 17%", badge: "Popular", highlight: true },
  { name: "Pro", price: "$14.99", original: "$17.94", duration: "6 Months", save: "Save 16%", badge: null, highlight: false },
  { name: "Studio", price: "$29.99", original: "$35.88", duration: "1 Year", save: "Save 16%", badge: "Best Value", highlight: true },
];

const paymentSteps = [
  "Choose your plan and click the button",
  "Complete payment via Paddle secure checkout",
  "Receive your license key via email within minutes",
];

const PricingPage = () => {
  const [searchParams] = useSearchParams();
  const paymentStatus = searchParams.get("payment");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  useEffect(() => {
    if (paymentStatus === "success") {
      toast.success("Payment successful! Your license key has been generated and will be sent to your email shortly.");
    } else if (paymentStatus === "cancelled") {
      toast.error("Payment was cancelled.");
    }
  }, [paymentStatus]);

  const handleCheckout = async (planName: string) => {
    setLoadingPlan(planName);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { plan: planName },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err: any) {
      toast.error(err.message || "Checkout failed. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div>
      <SEOHead
        title="Pricing — Affordable Stock Metadata Plans"
        description="Choose from Starter ($2.99/mo), Creator, Pro, or Studio plans. All plans include 9 platform support, bulk processing, and CSV export."
        canonical="/pricing"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "eliteiq.tech Stock Metadata Generator",
          "offers": [
            { "@type": "Offer", "name": "Starter", "price": "2.99", "priceCurrency": "USD" },
            { "@type": "Offer", "name": "Creator", "price": "7.49", "priceCurrency": "USD" },
            { "@type": "Offer", "name": "Pro", "price": "14.99", "priceCurrency": "USD" },
            { "@type": "Offer", "name": "Studio", "price": "29.99", "priceCurrency": "USD" },
          ],
        }}
      />
      {/* Payment Status Banner */}
      {paymentStatus === "success" && (
        <div className="bg-success/10 border-b border-success/20">
          <div className="container mx-auto px-6 py-4 flex items-center justify-center gap-3">
            <CheckCircle className="h-5 w-5 text-success" />
            <p className="text-sm font-medium text-success">
              Payment successful! Your license key has been generated and sent to your email.
            </p>
          </div>
        </div>
      )}
      {paymentStatus === "cancelled" && (
        <div className="bg-destructive/10 border-b border-destructive/20">
          <div className="container mx-auto px-6 py-4 flex items-center justify-center gap-3">
            <XCircle className="h-5 w-5 text-destructive" />
            <p className="text-sm font-medium text-destructive">
              Payment was cancelled. You can try again anytime.
            </p>
          </div>
        </div>
      )}
      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 opacity-15" style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(255 60% 64% / 0.3), transparent 60%)" }} />
        <div className="container relative mx-auto px-6">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Pricing</span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h1 className="mb-4 text-center text-4xl font-bold leading-tight lg:text-6xl">
            <span className="text-foreground">Simple,</span>{" "}
            <span className="gradient-text">Transparent</span>
            <br />
            <span className="text-muted-foreground">Pricing</span>
          </h1>
          <p className="mx-auto max-w-md text-center text-muted-foreground">
            Choose your plan — all plans unlock all 9 platforms with full features.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan, i) => (
              <ScrollReveal key={plan.name} delay={i * 0.1}>
                <div className={`glass-card relative flex h-full flex-col p-8 transition-all hover:border-primary/30 ${plan.highlight ? "border-primary/40 ring-1 ring-primary/20" : ""}`}>
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="flex items-center gap-1 rounded-full px-4 py-1 text-xs font-semibold text-foreground" style={{ background: "var(--gradient-primary)" }}>
                        <Star className="h-3 w-3" /> {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="mb-8 pt-2">
                    <h3 className="mb-1 text-lg font-semibold text-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.duration}</p>
                    <div className="mt-4">
                      {plan.original && (
                        <span className="mr-2 text-sm text-muted-foreground line-through">{plan.original}</span>
                      )}
                      <span className="text-3xl font-bold gradient-text">{plan.price}</span>
                    </div>
                    {plan.save && (
                      <span className="mt-2 inline-block rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">{plan.save}</span>
                    )}
                  </div>

                  <ul className="mb-8 flex-1 space-y-3">
                    {allFeatures.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 shrink-0 text-success" /> {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleCheckout(plan.name)}
                    disabled={loadingPlan !== null}
                    className={`w-full rounded-full py-3 text-sm font-semibold transition-all hover:scale-105 disabled:opacity-60 disabled:hover:scale-100 ${plan.highlight ? "gradient-btn" : "border border-foreground/20 text-foreground hover:bg-foreground/10"}`}
                  >
                    {loadingPlan === plan.name ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Processing...
                      </span>
                    ) : (
                      `Get ${plan.name}`
                    )}
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Instructions */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="glass-card mx-auto max-w-2xl p-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-8 bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">Payment</span>
              </div>
              <h2 className="mb-8 text-2xl font-bold text-foreground">How to Get Your License Key</h2>

              <div className="mb-8 space-y-4">
                {paymentSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-foreground" style={{ background: "var(--gradient-primary)" }}>
                      {i + 1}
                    </span>
                    <span className="pt-1 text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 rounded-2xl border border-glass-border bg-muted/10 p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Also Available</h3>
                {[
                  { method: "JazzCash", detail: "0329 7409088 (Salman Ahmad)" },
                  { method: "Meezan Bank", detail: "50010112691566 (Salman Ahmad)" },
                  { method: "Skrill", detail: "salmangraphics839@gmail.com" },
                ].map((p) => (
                  <div key={p.method} className="flex items-center justify-between rounded-xl bg-muted/20 p-4">
                    <span className="text-sm font-medium text-foreground">{p.method}</span>
                    <span className="text-sm text-muted-foreground">{p.detail}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <a href="https://wa.me/923297090888" target="_blank" rel="noopener noreferrer" className="gradient-btn inline-flex items-center gap-2">
                  Contact on WhatsApp
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
