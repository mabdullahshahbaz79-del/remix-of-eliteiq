import { motion } from "framer-motion";
import { Brain, Layers, Globe, Zap, Tag, Shield } from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Analysis", desc: "Our AI understands your images deeply — objects, scenes, emotions, and context — to generate metadata that actually ranks.", stat: "99.2% accuracy", color: "text-primary", bg: "bg-primary/15", statBorder: "border-primary/30 bg-primary/10 text-primary", glow: "hsl(var(--primary) / 0.15)" },
  { icon: Layers, title: "Batch Processing", desc: "Upload hundreds of images at once. Parallel processing handles massive volumes while you focus on creating.", stat: "1000+ images/batch", color: "text-secondary", bg: "bg-secondary/15", statBorder: "border-secondary/30 bg-secondary/10 text-secondary", glow: "hsl(var(--secondary) / 0.15)" },
  { icon: Globe, title: "Multi-Platform Export", desc: "One-click CSV export formatted perfectly for Adobe Stock, Shutterstock, Freepik, Getty, iStock, and 10+ more.", stat: "15+ platforms", color: "text-cyan-400", bg: "bg-cyan-400/15", statBorder: "border-cyan-400/30 bg-cyan-400/10 text-cyan-400", glow: "hsla(188, 80%, 50%, 0.15)" },
  { icon: Zap, title: "Lightning Performance", desc: "Complete metadata in under 3 seconds per image. What took hours now takes minutes.", stat: "< 3s per image", color: "text-pink-400", bg: "bg-pink-400/15", statBorder: "border-pink-400/30 bg-pink-400/10 text-pink-400", glow: "hsla(330, 80%, 60%, 0.15)" },
  { icon: Tag, title: "Smart Keywords", desc: "Trending, relevant keywords that boost discoverability — SEO-optimized and tailored to buyer search behavior.", stat: "40–50 keywords", color: "text-amber-400", bg: "bg-amber-400/15", statBorder: "border-amber-400/30 bg-amber-400/10 text-amber-400", glow: "hsla(38, 92%, 50%, 0.15)" },
  { icon: Shield, title: "Privacy First", desc: "Your images are processed on secure servers and never stored. Enterprise-grade encryption, zero retention.", stat: "Zero storage", color: "text-green-400", bg: "bg-green-400/15", statBorder: "border-green-400/30 bg-green-400/10 text-green-400", glow: "hsla(142, 70%, 50%, 0.15)" },
];

const FeaturesSection = () => (
  <section className="relative py-28 overflow-hidden">
    {/* Floating orbs */}
    <motion.div
      className="pointer-events-none absolute left-10 top-1/4 w-[300px] h-[300px] rounded-full blur-[120px]"
      style={{ background: "hsl(var(--primary) / 0.05)" }}
      animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
      transition={{ duration: 10, repeat: Infinity }}
    />
    <motion.div
      className="pointer-events-none absolute right-10 bottom-1/4 w-[250px] h-[250px] rounded-full blur-[100px]"
      style={{ background: "hsl(var(--secondary) / 0.05)" }}
      animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
      transition={{ duration: 12, repeat: Infinity }}
    />

    <div className="container relative mx-auto px-6">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <motion.span
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-primary mb-8"
          animate={{ boxShadow: ["0 0 0px hsl(var(--primary) / 0)", "0 0 20px hsl(var(--primary) / 0.2)", "0 0 0px hsl(var(--primary) / 0)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ● Why Elite IQ?
        </motion.span>
        <h2 className="text-4xl font-bold lg:text-6xl mb-5">
          Built for{" "}
          <span className="gradient-text">Professionals</span>
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground text-lg">
          Everything you need to create perfect metadata and maximize your stock earnings.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.6, type: "spring" }}
            whileHover={{
              scale: 1.04,
              y: -6,
              boxShadow: `0 20px 60px -15px ${f.glow}`,
            }}
            className="group rounded-2xl border border-glass-border bg-card/50 p-7 backdrop-blur-sm transition-colors cursor-default relative overflow-hidden"
          >
            {/* Radial glow on hover */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at 30% 30%, ${f.glow}, transparent 70%)` }}
            />
            <div className="relative">
              <motion.div
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.bg}`}
                whileHover={{ rotate: [0, -15, 15, 0], scale: 1.15 }}
                transition={{ duration: 0.5 }}
              >
                <f.icon className={`h-6 w-6 ${f.color}`} />
              </motion.div>
              <h3 className="mb-2 text-lg font-bold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground mb-5">{f.desc}</p>
              <motion.span
                className={`inline-block rounded-full border ${f.statBorder} px-3 py-1 text-xs font-medium`}
                whileHover={{ scale: 1.1 }}
              >
                ● {f.stat}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
