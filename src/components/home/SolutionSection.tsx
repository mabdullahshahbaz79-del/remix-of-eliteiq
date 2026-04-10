import { motion } from "framer-motion";
import { Search, Type, TrendingUp, Zap, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: Search, title: "Keywords people actually search", desc: "Trained on real buyer behavior across Adobe Stock, Shutterstock, and Freepik.", color: "text-primary", bg: "bg-primary/15", glow: "hsl(var(--primary) / 0.15)" },
  { icon: Type, title: "Titles optimized for ranking", desc: "Structured titles that match search queries and platform ranking factors.", color: "text-secondary", bg: "bg-secondary/15", glow: "hsl(var(--secondary) / 0.15)" },
  { icon: TrendingUp, title: "More visibility → more downloads", desc: "Better-ranked metadata directly translates to more impressions and sales.", color: "text-success", bg: "bg-success/15", glow: "hsl(var(--success) / 0.15)" },
  { icon: Zap, title: "Done in seconds", desc: "Upload, analyze, export. Speed through a batch that used to take hours.", color: "text-amber-400", bg: "bg-amber-400/15", glow: "hsla(38, 92%, 50%, 0.15)" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { delay: i * 0.15, duration: 0.7, type: "spring", stiffness: 80 },
  }),
};

const SolutionSection = () => (
  <section className="relative py-28 overflow-hidden">
    {/* Gradient orbs */}
    <motion.div
      className="pointer-events-none absolute -right-40 top-20 w-[500px] h-[500px] rounded-full blur-[140px]"
      style={{ background: "hsl(var(--secondary) / 0.06)" }}
      animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="pointer-events-none absolute -left-40 bottom-20 w-[400px] h-[400px] rounded-full blur-[120px]"
      style={{ background: "hsl(var(--primary) / 0.06)" }}
      animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
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
          className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-secondary mb-8"
          animate={{ boxShadow: ["0 0 0px hsl(var(--secondary) / 0)", "0 0 25px hsl(var(--secondary) / 0.2)", "0 0 0px hsl(var(--secondary) / 0)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          The Solution
        </motion.span>
        <h2 className="text-4xl font-bold lg:text-6xl mb-5">
          Turn Every Image Into a{" "}
          <span className="gradient-text">Search-Optimized Asset</span>
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground text-lg">
          Elite IQ analyzes your image and generates metadata designed to rank — based on{" "}
          <span className="text-foreground font-medium">real search behavior</span>, not generic AI.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 perspective-[1200px]">
        {features.map((f, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{
              scale: 1.04,
              rotateY: 3,
              rotateX: -2,
              boxShadow: `0 20px 60px -15px ${f.glow}`,
              borderColor: `${f.glow}`,
            }}
            className="group rounded-2xl border border-glass-border bg-card/50 p-7 backdrop-blur-sm transition-colors cursor-default relative overflow-hidden"
          >
            {/* Hover glow */}
            <motion.div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at 50% 50%, ${f.glow}, transparent 70%)` }}
            />
            <div className="relative">
              <motion.div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.bg}`}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <f.icon className={`h-5 w-5 ${f.color}`} />
              </motion.div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Banner */}
      <motion.div
        className="mx-auto mt-24 max-w-3xl rounded-3xl p-12 text-center relative overflow-hidden"
        style={{ background: "var(--gradient-subtle)" }}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
      >
        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-30"
          style={{ background: "var(--gradient-primary)", padding: "1px" }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        {/* Shine */}
        <motion.div
          className="absolute inset-0"
          style={{ background: "linear-gradient(105deg, transparent 40%, hsl(var(--foreground) / 0.03) 45%, transparent 50%)" }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 4, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
        />

        <div className="relative">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 block">
            Ready to Rank?
          </span>
          <h3 className="text-3xl font-bold text-foreground mb-3 lg:text-4xl">
            Stop leaving money on the table
          </h3>
          <p className="text-muted-foreground mb-8">
            Join 1,000+ stock contributors who already let AI do the heavy lifting.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/download"
              className="inline-flex items-center gap-2 rounded-full px-10 py-4 text-sm font-semibold text-primary-foreground transition-all shadow-lg shadow-primary/25"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Sparkles className="h-4 w-4" />
              Try It Free Now
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Link>
          </motion.div>
          <p className="mt-5 text-xs text-muted-foreground">
            No credit card required · Works in your browser
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default SolutionSection;
