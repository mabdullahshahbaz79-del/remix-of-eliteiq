import { Link } from "react-router-dom";
import { Sparkles, Layers, Zap, BarChart3, Upload, Brain, Edit3, CheckCircle, ArrowRight, ArrowDown } from "lucide-react";
import heroImg from "@/assets/hero-dashboard.jpg";

const platforms = [
  "Vecteezy", "123RF", "Freepik", "Pond5", "Depositphotos", "Canva", "iStock", "Shutterstock", "Dreamstime"
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
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at 30% 40%, hsl(255 60% 64% / 0.25), transparent 60%), radial-gradient(ellipse at 80% 60%, hsl(174 100% 40% / 0.15), transparent 50%)" }} />

      <div className="container relative mx-auto px-6 pt-24 pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Text */}
          <div className="animate-slide-up">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">eliteiq.tech</span>
            </div>

            <h1 className="mb-8 text-5xl font-bold leading-[1.1] tracking-tight lg:text-7xl">
              <span className="text-muted-foreground">Automate</span>
              <br />
              <span className="text-muted-foreground">Stock Metadata</span>
              <br />
              <span className="text-foreground">& Dominate</span>
              <br />
              <span className="gradient-text">Platforms.</span>
            </h1>

            <p className="mb-10 max-w-md text-base leading-relaxed text-muted-foreground">
              AI-powered multi-platform metadata generator. Process bulk assets, export to 9 platforms, and scale your stock content business effortlessly.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/download" className="rounded-full border border-foreground/20 bg-foreground/5 px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-foreground/10 hover:scale-105">
                Get Started Free
              </Link>
              <Link to="/pricing" className="rounded-full border border-glass-border px-8 py-3.5 text-sm font-semibold text-muted-foreground transition-all hover:text-foreground hover:border-foreground/20">
                View Pricing
              </Link>
            </div>

            {/* Scroll indicator */}
            <div className="mt-16 hidden items-center gap-3 lg:flex">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Features</span>
              <ArrowDown className="h-4 w-4 text-muted-foreground animate-bounce" />
            </div>
          </div>

          {/* Right - Image */}
          <div className="animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl opacity-30 blur-xl" style={{ background: "var(--gradient-primary)" }} />
              <img
                src={heroImg}
                alt="eliteiq.tech Dashboard Preview"
                className="relative rounded-2xl border border-glass-border shadow-2xl"
                width={1280}
                height={800}
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Platforms strip */}
    <section className="border-y border-glass-border py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Supported Platforms</span>
          <div className="hidden h-4 w-px bg-glass-border sm:block" />
          {platforms.map((p) => (
            <span key={p} className="text-sm font-medium text-muted-foreground/60 transition-colors hover:text-foreground">{p}</span>
          ))}
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Features</span>
          </div>
          <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
            <span className="text-foreground">Everything You Need</span>
            <br />
            <span className="text-muted-foreground">For Professional Metadata</span>
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="glass-card group p-8 transition-all hover:border-primary/30">
              <div className="mb-6 inline-flex rounded-xl p-3" style={{ background: "var(--gradient-subtle)" }}>
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Process</span>
          </div>
          <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
            <span className="text-foreground">How It</span>{" "}
            <span className="gradient-text">Works</span>
          </h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-10 hidden h-px w-full translate-x-1/2 bg-glass-border lg:block" />
              )}
              <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: "var(--gradient-subtle)" }}>
                <s.icon className="h-7 w-7 text-primary" />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-foreground" style={{ background: "var(--gradient-primary)" }}>
                  {s.step}
                </span>
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="glass-card relative overflow-hidden p-16 text-center">
          <div className="absolute inset-0 opacity-10" style={{ background: "var(--gradient-primary)" }} />
          <h2 className="relative mb-4 text-4xl font-bold text-foreground">Ready to Automate Your Metadata?</h2>
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
