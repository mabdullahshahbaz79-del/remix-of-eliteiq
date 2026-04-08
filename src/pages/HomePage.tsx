import { Link } from "react-router-dom";
import { Download, Globe, Wifi, WifiOff, Sparkles, Upload, Brain, Layers, BarChart3, Zap, CheckCircle, ArrowRight, Shield, FileText, Image, Video } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-animation";

const platforms = [
  "Adobe Stock", "Shutterstock", "Freepik", "iStock", "Vecteezy",
  "123RF", "Pond5", "Depositphotos", "Dreamstime", "Canva",
];

const features = [
  {
    icon: Brain,
    title: "AI-Powered Metadata",
    desc: "Powered by Gemini, GPT-4o, Groq, Mistral & more. Auto-generate titles, descriptions, and 40–50 keywords per asset.",
  },
  {
    icon: Layers,
    title: "Multi-Platform Export",
    desc: "Export CSV files formatted specifically for each stock platform. One click — done.",
  },
  {
    icon: Zap,
    title: "Bulk Processing",
    desc: "Process up to 1000+ images at once. Supports JPG, PNG, TIFF, SVG, EPS, MP4 and all major formats.",
  },
  {
    icon: BarChart3,
    title: "Confidence Scoring",
    desc: "See AI confidence levels for each keyword — tailored to what buyers actually search on each platform.",
  },
  {
    icon: Shield,
    title: "Metadata Embedding",
    desc: "Embed titles, descriptions, and keywords directly into your image and vector files — ready for upload.",
  },
  {
    icon: FileText,
    title: "Smart Categories",
    desc: "Auto-assign categories and editorial status optimized for each platform's specific requirements.",
  },
];

const howItWorks = [
  {
    icon: Upload,
    title: "Upload Your Images",
    desc: "Drag and drop your stock photos or select them from your computer. Supports JPG, PNG, TIFF and all major formats. Process up to 1000+ images at once.",
  },
  {
    icon: Brain,
    title: "AI Generates Metadata",
    desc: "Our AI analyzes each image and generates optimized titles, descriptions, and 40–50 keywords — tailored to what buyers actually search on each platform.",
  },
  {
    icon: Layers,
    title: "Export to Any Platform",
    desc: "Download CSV files formatted specifically for Adobe Stock, Shutterstock, Freepik, and 12+ more platforms. One click — done.",
  },
];

const stats = [
  { value: "9+", label: "Platforms Supported" },
  { value: "50", label: "Keywords Per Asset" },
  { value: "1000+", label: "Bulk Processing" },
  { value: "99%", label: "Accuracy Rate" },
];

const HomePage = () => (
  <div>
    {/* Hero */}
    <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      {/* Ambient glows */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(174 100% 40% / 0.08), transparent 60%), radial-gradient(ellipse at 80% 80%, hsl(255 60% 64% / 0.06), transparent 50%)" }} />

      <div className="container relative mx-auto px-6 text-center">
        {/* Version badge */}
        <ScrollReveal>
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/5 px-5 py-2">
            <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary">eliteiq.tech PRO — V1.1.3 Now Available</span>
          </div>
        </ScrollReveal>

        {/* Headline */}
        <ScrollReveal delay={0.05}>
          <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
            <span className="text-foreground">Stop Wasting Hours</span>
            <br />
            <span className="text-foreground">on </span>
            <span className="text-secondary">Stock Metadata</span>
          </h1>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal delay={0.1}>
          <p className="mx-auto mb-3 max-w-2xl text-lg font-medium text-muted-foreground md:text-xl">
            AI-powered metadata generation for Adobe Stock, Shutterstock, Freepik & more.
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-muted-foreground/70 md:text-base">
            Generate, optimize, and embed titles, descriptions, and keywords directly into your
            images, videos, and vector files — in bulk, in seconds, ready for upload.
          </p>
        </ScrollReveal>

        {/* Feature pills */}
        <ScrollReveal delay={0.15}>
          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary/5 px-5 py-2.5">
              <Globe className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-muted-foreground">Cloud AI — Gemini, GPT-4o, Groq, Mistral...</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-glass-border bg-muted/10 px-5 py-2.5">
              <WifiOff className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">100% Offline via Ollama</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-glass-border bg-muted/10 px-5 py-2.5">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Auto-Fallback Mode</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Download CTA */}
        <ScrollReveal delay={0.2}>
          <div className="mb-6">
            <Link to="/download" className="inline-flex items-center gap-3 rounded-xl px-10 py-4 text-lg font-bold text-secondary-foreground transition-all hover:scale-105 hover:shadow-2xl hover:shadow-secondary/20 animate-glow" style={{ background: "var(--gradient-primary)" }}>
              <Download className="h-5 w-5" />
              Download Free — Windows
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground/60">
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5" /> No credit card needed</span>
            <span>·</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5" /> Works with free AI keys</span>
            <span>·</span>
            <span>Windows 10 / 11</span>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Stats bar */}
    <section className="border-y border-glass-border py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="mb-1 text-3xl font-extrabold gradient-text">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">How It Works</span>
            </div>
            <h2 className="mx-auto max-w-lg text-4xl font-bold leading-tight lg:text-5xl">
              <span className="text-foreground">Three Simple </span>
              <span className="gradient-text">Steps</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
          {howItWorks.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.1}>
              <div className="glass-card group relative h-full p-8 text-center transition-all hover:border-primary/30">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: "var(--gradient-subtle)" }}>
                  <s.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-foreground">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Platform Support */}
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Platform Support</span>
            </div>
            <h2 className="mx-auto max-w-lg text-4xl font-bold leading-tight lg:text-5xl">
              <span className="text-foreground">Works with </span>
              <span className="gradient-text">Every Platform</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Export metadata in the exact format required by each stock platform — no manual reformatting.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {platforms.map((p) => (
              <div key={p} className="glass-card px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground">
                {p}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Features */}
    <section id="features" className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Features</span>
            </div>
            <h2 className="mx-auto max-w-lg text-4xl font-bold leading-tight lg:text-5xl">
              <span className="text-foreground">Everything You Need</span>
              <br />
              <span className="text-muted-foreground">For Professional Metadata</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.05}>
              <div className="glass-card group h-full p-8 transition-all hover:border-primary/30">
                <div className="mb-5 inline-flex rounded-xl p-3" style={{ background: "var(--gradient-subtle)" }}>
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Supported File Types */}
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">File Support</span>
            </div>
            <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
              <span className="text-foreground">All Your </span>
              <span className="gradient-text">File Types</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              { icon: Image, title: "Images", types: "JPG, PNG, TIFF, BMP, WebP" },
              { icon: FileText, title: "Vectors", types: "SVG, EPS, AI, PSD" },
              { icon: Video, title: "Videos", types: "MP4, MOV, AVI, MKV" },
            ].map((t) => (
              <div key={t.title} className="glass-card p-8 text-center transition-all hover:border-primary/30">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "var(--gradient-subtle)" }}>
                  <t.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{t.title}</h3>
                <p className="text-sm text-muted-foreground">{t.types}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* CTA */}
    <ScrollReveal>
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="glass-card relative overflow-hidden p-16 text-center">
            <div className="absolute inset-0 opacity-10" style={{ background: "var(--gradient-primary)" }} />
            <h2 className="relative mb-4 text-4xl font-bold text-foreground lg:text-5xl">Ready to Automate Your Metadata?</h2>
            <p className="relative mb-8 text-lg text-muted-foreground">Start with a free 30-day trial. No credit card required.</p>
            <div className="relative flex flex-wrap items-center justify-center gap-4">
              <Link to="/download" className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-bold text-foreground transition-all hover:scale-105" style={{ background: "var(--gradient-primary)" }}>
                <Download className="h-5 w-5" /> Download Free
              </Link>
              <Link to="/pricing" className="inline-flex items-center gap-2 rounded-xl border border-glass-border px-8 py-4 text-lg font-semibold text-muted-foreground transition-all hover:text-foreground hover:border-foreground/20">
                View Pricing <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  </div>
);

export default HomePage;
