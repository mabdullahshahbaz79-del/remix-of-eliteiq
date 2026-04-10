import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import AnimatedDashboard from "@/components/AnimatedDashboard";

const words = ["Metadata", "Rankings", "Revenue", "Growth"];

const GlitchText = ({ text }: { text: string }) => (
  <span className="relative inline-block">
    <span className="relative z-10">{text}</span>
    <motion.span
      className="absolute inset-0 gradient-text opacity-80"
      animate={{ x: [0, -2, 3, -1, 0], y: [0, 1, -1, 2, 0] }}
      transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 4 }}
    >
      {text}
    </motion.span>
  </span>
);

const ParticleField = () => {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.id % 3 === 0
              ? "hsl(var(--primary))"
              : p.id % 3 === 1
              ? "hsl(var(--secondary))"
              : "hsl(var(--foreground) / 0.4)",
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const GridLines = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04]">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
    <motion.div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 600px 600px at var(--mx, 50%) var(--my, 50%), hsl(var(--primary) / 0.15), transparent)",
      }}
    />
  </div>
);

const MagneticButton = ({ children, className, to }: { children: React.ReactNode; className?: string; to: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div style={{ x: springX, y: springY }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <Link ref={ref} to={to} className={className}>{children}</Link>
    </motion.div>
  );
};

const VIPHero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setWordIndex((i) => (i + 1) % words.length), 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.6 }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Overlay gradient to blend video with content */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(var(--background) / 0.4) 0%, hsl(var(--background) / 0.7) 50%, hsl(var(--background) / 0.95) 100%)" }} />
      </div>

      <ParticleField />
      <GridLines />

      {/* Animated gradient blobs */}
      <motion.div
        className="pointer-events-none absolute rounded-full blur-[120px]"
        style={{ width: 500, height: 500, left: "15%", top: "20%", background: "hsl(var(--primary) / 0.2)" }}
        animate={{ x: [0, 60, -40, 0], y: [0, -80, 40, 0], scale: [1, 1.3, 0.9, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute rounded-full blur-[100px]"
        style={{ width: 400, height: 400, right: "10%", bottom: "20%", background: "hsl(var(--secondary) / 0.15)" }}
        animate={{ x: [0, -50, 30, 0], y: [0, 60, -50, 0], scale: [1, 0.8, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative mx-auto px-6 pt-24 pb-16 z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-1.5"
              style={{ background: "hsl(var(--primary) / 0.08)" }}
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </motion.div>
              <span className="text-xs font-semibold tracking-wider text-primary uppercase">AI-Powered Platform</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="mb-8 text-5xl font-bold leading-[1.08] tracking-tight lg:text-7xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <motion.span
                className="block text-muted-foreground"
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
              >
                Automate Stock
              </motion.span>
              <motion.span
                className="block text-muted-foreground"
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.45, type: "spring" }}
              >
                <GlitchText text="Metadata" />
              </motion.span>
              <motion.span
                className="block text-foreground"
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6, type: "spring" }}
              >
                & Dominate
              </motion.span>
              <motion.span
                className="block overflow-hidden h-[1.15em]"
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.75, type: "spring" }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    className="gradient-text inline-block"
                    initial={{ y: 60, opacity: 0, rotateX: -45 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -60, opacity: 0, rotateX: 45 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                  >
                    {words[wordIndex]}.
                  </motion.span>
                </AnimatePresence>
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mb-10 max-w-md text-base leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              AI-powered multi-platform metadata generator. Process bulk assets, export to 9 platforms, and scale your stock content business effortlessly.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.6 }}
            >
              <MagneticButton
                to="/download"
                className="group relative overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all"
              >
                <span className="absolute inset-0 rounded-full" style={{ background: "var(--gradient-primary)" }} />
                <motion.span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "var(--gradient-secondary)" }}
                />
                <span className="relative flex items-center gap-2">
                  Get Started Free
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </span>
              </MagneticButton>
              <MagneticButton
                to="/pricing"
                className="rounded-full border border-glass-border px-8 py-3.5 text-sm font-semibold text-muted-foreground transition-all hover:text-foreground hover:border-foreground/20 hover:bg-muted/30"
              >
                View Pricing
              </MagneticButton>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="mt-16 hidden items-center gap-3 lg:flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Features</span>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
              </motion.div>
            </motion.div>
          </div>

          {/* Right - Animated Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateY: -8 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 60 }}
            className="perspective-[1200px]"
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02, rotateY: 2, rotateX: -1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {/* Glow */}
              <motion.div
                className="absolute -inset-3 rounded-2xl opacity-40 blur-2xl"
                style={{ background: "var(--gradient-primary)" }}
                animate={{ opacity: [0.2, 0.45, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Shine sweep */}
              <div className="relative overflow-hidden rounded-2xl">
                <AnimatedDashboard />
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, hsl(var(--foreground) / 0.06) 45%, transparent 50%)",
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                />
              </div>
              {/* Floating badges */}
              <motion.div
                className="absolute -left-4 top-1/4 rounded-xl border border-glass-border p-3 backdrop-blur-xl"
                style={{ background: "hsl(var(--card) / 0.9)" }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">AI Ready</div>
                    <div className="text-[10px] text-muted-foreground">Gemini & GPT</div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="absolute -right-4 bottom-1/4 rounded-xl border border-glass-border p-3 backdrop-blur-xl"
                style={{ background: "hsl(var(--card) / 0.9)" }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-success/20">
                    <span className="text-success text-sm font-bold">9+</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">Platforms</div>
                    <div className="text-[10px] text-muted-foreground">Export CSV</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VIPHero;
