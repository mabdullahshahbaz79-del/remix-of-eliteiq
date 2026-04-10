import { motion } from "framer-motion";
import { Brain, Layers, Globe, Zap, Tag, Shield } from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Analysis", desc: "Our AI understands your images deeply — objects, scenes, emotions, and context — to generate metadata that actually ranks.", stat: "99.2% accuracy", color: "text-primary", bg: "bg-primary/15" },
  { icon: Layers, title: "Batch Processing", desc: "Upload hundreds of images at once. Parallel processing handles massive volumes while you focus on creating.", stat: "1000+ images/batch", color: "text-secondary", bg: "bg-secondary/15" },
  { icon: Globe, title: "Multi-Platform Export", desc: "One-click CSV export formatted perfectly for Adobe Stock, Shutterstock, Freepik, Getty, iStock, and 10+ more.", stat: "15+ platforms", color: "text-cyan-400", bg: "bg-cyan-400/15" },
  { icon: Zap, title: "Lightning Performance", desc: "Complete metadata in under 3 seconds per image. What took hours now takes minutes.", stat: "< 3s per image", color: "text-pink-400", bg: "bg-pink-400/15" },
  { icon: Tag, title: "Smart Keywords", desc: "Trending, relevant keywords that boost discoverability — SEO-optimized and tailored to buyer search behavior.", stat: "40–50 keywords", color: "text-amber-400", bg: "bg-amber-400/15" },
  { icon: Shield, title: "Privacy First", desc: "Your images are processed on secure servers and never stored. Enterprise-grade encryption, zero retention.", stat: "Zero storage", color: "text-green-400", bg: "bg-green-400/15" },
];

const FeaturesSection = () => (
  <section className="relative py-24 overflow-hidden">
    <div className="container mx-auto px-6">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-6">
          ● Why Elite IQ?
        </span>
        <h2 className="text-4xl font-bold lg:text-5xl mb-4">
          Built for{" "}
          <span className="gradient-text">Professionals</span>
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground">
          Everything you need to create perfect metadata and maximize your stock earnings.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="group rounded-xl border border-glass-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30"
          >
            <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${f.bg}`}>
              <f.icon className={`h-5 w-5 ${f.color}`} />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">{f.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{f.desc}</p>
            <span className={`inline-block rounded-full border ${f.color === "text-primary" ? "border-primary/30 bg-primary/10 text-primary" : f.color === "text-secondary" ? "border-secondary/30 bg-secondary/10 text-secondary" : "border-glass-border bg-muted/30 text-muted-foreground"} px-3 py-1 text-xs font-medium`}>
              ● {f.stat}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
