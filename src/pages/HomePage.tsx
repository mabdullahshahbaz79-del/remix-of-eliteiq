import { Link } from "react-router-dom";
import { Sparkles, Layers, Zap, BarChart3, Upload, Brain, Edit3, CheckCircle, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-dashboard.jpg";

const platforms = [
  "Vecteezy", "123RF", "Freepik", "Pond5", "Depositphotos", "Canva", "iStock", "Shutterstock", "Dreamstime"
];

const stats = [
  { value: "9", label: "Supported Platforms", icon: Layers },
  { value: "50+", label: "Keywords Per Asset", icon: Sparkles },
  { value: "Bulk", label: "Processing Support", icon: Zap },
  { value: "100%", label: "Offline Option (Soon)", icon: BarChart3 },
];

const features = [
  { title: "AI Metadata Generation", desc: "Powered by Gemini, GPT & more. Auto-generate titles, descriptions, and keywords.", icon: Brain },
  { title: "Multi-Platform Export", desc: "Export CSV tailored for each of the 9 stock platforms instantly.", icon: Layers },
  { title: "Bulk Processing", desc: "Process hundreds of files at once with batch upload support.", icon: Zap },
  { title: "Confidence Scoring", desc: "See AI confidence levels for each keyword to ensure quality.", icon: BarChart3 },
];

const steps = [
  { step: "01", title: "Upload Files", desc: "Drag & drop your images, vectors, or videos.", icon: Upload },
  { step: "02", title: "AI Analyzes", desc: "Our AI generates metadata in seconds.", icon: Brain },
  { step: "03", title: "Edit Metadata", desc: "Review, tweak, and perfect your metadata.", icon: Edit3 },
  { step: "04", title: "Export & Done", desc: "Download CSV files ready for each platform.", icon: CheckCircle },
];

const HomePage = () => (
  <div>
    {/* Hero */}
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at 30% 20%, hsl(255 60% 64% / 0.3), transparent 60%), radial-gradient(ellipse at 70% 80%, hsl(174 100% 40% / 0.2), transparent 60%)" }} />
      <div className="container relative mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-slide-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-glass-border bg-muted/50 px-4 py-1.5 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> v1.1.3 — Now with 9 platforms
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight lg:text-6xl">
              <span className="gradient-text">eliteiq.tech</span>
              <br />
              <span className="text-foreground">Multi-Platform Metadata Generator</span>
            </h1>
            <p className="mb-8 max-w-lg text-lg text-muted-foreground">
              Generate Adobe Stock, Shutterstock, Freepik metadata in seconds. AI-powered, bulk processing, 9 platforms supported.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/download" className="gradient-btn flex items-center gap-2 text-lg">
                Download Now <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/pricing" className="rounded-xl border border-glass-border bg-muted/30 px-8 py-3 font-semibold text-foreground transition-all hover:bg-muted/50">
                View Pricing
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {platforms.map((p) => (
                <span key={p} className="rounded-full border border-glass-border bg-muted/30 px-3 py-1 text-xs text-muted-foreground">{p}</span>
              ))}
            </div>
          </div>

          <div className="animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl" style={{ background: "var(--gradient-primary)" }} />
              <img src={heroImg} alt="eliteiq.tech Dashboard" className="relative rounded-2xl border border-glass-border shadow-2xl" width={1280} height={800} />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="glass-card p-6 text-center transition-transform hover:scale-105">
              <s.icon className="mx-auto mb-3 h-8 w-8 text-primary" />
              <div className="text-3xl font-bold gradient-text">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold">Key Features</h2>
          <p className="text-muted-foreground">Everything you need for professional stock metadata</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="glass-card group p-6 transition-all hover:scale-105 hover:border-primary/30">
              <div className="mb-4 inline-flex rounded-xl p-3" style={{ background: "var(--gradient-subtle)" }}>
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold">How It Works</h2>
          <p className="text-muted-foreground">Four simple steps to perfect metadata</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.step} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-10 hidden h-0.5 w-full translate-x-1/2 lg:block" style={{ background: "var(--gradient-primary)", opacity: 0.3 }} />
              )}
              <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl" style={{ background: "var(--gradient-subtle)" }}>
                <s.icon className="h-8 w-8 text-primary" />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold" style={{ background: "var(--gradient-primary)" }}>
                  {s.step}
                </span>
              </div>
              <h3 className="mb-1 font-semibold">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="glass-card relative overflow-hidden p-12 text-center">
          <div className="absolute inset-0 opacity-10" style={{ background: "var(--gradient-primary)" }} />
          <h2 className="relative mb-4 text-3xl font-bold">Ready to Automate Your Metadata?</h2>
          <p className="relative mb-8 text-muted-foreground">Start with a free 30-day trial. No credit card required.</p>
          <Link to="/pricing" className="gradient-btn relative inline-flex items-center gap-2 text-lg">
            Get Started Now <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
