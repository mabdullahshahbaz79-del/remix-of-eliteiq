import { Link } from "react-router-dom";
import { Check, Star, Sparkles } from "lucide-react";

const allFeatures = [
  "All 9 platforms support",
  "Unlimited files",
  "50 keywords per asset",
  "CSV export",
  "Metadata embedding",
  "Confidence scoring",
];

const plans = [
  { name: "Starter", price: "₨499", original: null, duration: "1 Month", save: null, badge: null, highlight: false },
  { name: "Creator", price: "₨1,347", original: "₨1,497", duration: "3 Months", save: "Save 10%", badge: "Popular", highlight: true },
  { name: "Pro", price: "₨2,546", original: "₨2,995", duration: "6 Months", save: "Save 15%", badge: null, highlight: false },
  { name: "Studio", price: "₨4,790", original: "₨5,988", duration: "1 Year", save: "Save 20%", badge: "Best Value", highlight: true },
];

const paymentSteps = [
  "Send payment via JazzCash, Meezan Bank, or Skrill",
  "Share payment screenshot on WhatsApp",
  "Receive your license key within minutes",
];

const PricingPage = () => (
  <div className="py-20">
    <div className="container mx-auto px-6">
      <div className="mb-16 text-center animate-slide-up">
        <h1 className="mb-3 text-4xl font-bold">Simple Pricing</h1>
        <p className="text-lg text-muted-foreground">Choose your plan — all plans unlock all 9 platforms</p>
      </div>

      <div className="mb-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`glass-card relative flex flex-col p-6 transition-all hover:scale-105 ${plan.highlight ? "border-primary/40 ring-1 ring-primary/20" : ""}`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="gradient-btn-sm flex items-center gap-1 text-xs">
                  <Star className="h-3 w-3" /> {plan.badge}
                </span>
              </div>
            )}

            <div className="mb-6 pt-2 text-center">
              <h3 className="mb-1 text-xl font-bold">{plan.name}</h3>
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

            <button className={`w-full rounded-xl py-3 font-semibold transition-all hover:scale-105 ${plan.highlight ? "gradient-btn" : "border border-glass-border bg-muted/30 text-foreground hover:bg-muted/50"}`}>
              Get {plan.name}
            </button>
          </div>
        ))}
      </div>

      {/* Payment Instructions */}
      <div className="glass-card mx-auto max-w-2xl p-8">
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">How to Get Your License Key</h2>
        </div>

        <div className="mb-8 space-y-4">
          {paymentSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ background: "var(--gradient-primary)" }}>
                {i + 1}
              </span>
              <span className="text-muted-foreground">{step}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4 rounded-xl border border-glass-border bg-muted/20 p-6">
          <h3 className="font-semibold">Payment Methods</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
              <span className="font-medium">JazzCash</span>
              <span className="text-muted-foreground">0329 7409088 (Salman Ahmad)</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
              <span className="font-medium">Meezan Bank</span>
              <span className="text-muted-foreground">50010112691566 (Salman Ahmad)</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
              <span className="font-medium">Skrill</span>
              <span className="text-muted-foreground">salmangraphics839@gmail.com</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="https://wa.me/923297090888" target="_blank" rel="noopener noreferrer" className="gradient-btn inline-flex items-center gap-2">
            Contact on WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default PricingPage;
