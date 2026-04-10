import { motion } from "framer-motion";
import { Search, Type, TrendingUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Keywords people actually search",
    desc: "Trained on real buyer behavior across Adobe Stock, Shutterstock, and Freepik.",
    color: "text-primary",
    bg: "bg-primary/15",
  },
  {
    icon: Type,
    title: "Titles optimized for ranking",
    desc: "Structured titles that match search queries and platform ranking factors.",
    color: "text-secondary",
    bg: "bg-secondary/15",
  },
  {
    icon: TrendingUp,
    title: "More visibility → more downloads",
    desc: "Better-ranked metadata directly translates to more impressions and sales.",
    color: "text-success",
    bg: "bg-success/15",
  },
  {
    icon: Zap,
    title: "Done in seconds",
    desc: "Upload, analyze, export. Speed through a batch that used to take hours.",
    color: "text-amber-400",
    bg: "bg-amber-400/15",
  },
];

const SolutionSection = () => (
  <section className="relative py-24 overflow-hidden">
    <div className="container mx-auto px-6">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary mb-6">
          The Solution
        </span>
        <h2 className="text-4xl font-bold lg:text-5xl mb-4">
          Turn Every Image Into a{" "}
          <span className="gradient-text">Search-Optimized Asset</span>
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground">
          Elite IQ analyzes your image and generates metadata designed to rank — based on{" "}
          <span className="text-foreground font-medium">real search behavior</span>, not generic AI.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group rounded-xl border border-glass-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30"
          >
            <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${f.bg}`}>
              <f.icon className={`h-5 w-5 ${f.color}`} />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA Banner */}
      <motion.div
        className="mx-auto mt-20 max-w-3xl rounded-2xl p-10 text-center"
        style={{ background: "var(--gradient-subtle)" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">
          Ready to Rank?
        </span>
        <h3 className="text-2xl font-bold text-foreground mb-2 lg:text-3xl">
          Stop leaving money on the table
        </h3>
        <p className="text-muted-foreground mb-6 text-sm">
          Join 1,000+ stock contributors who already let AI do the heavy lifting.
        </p>
        <Link
          to="/download"
          className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-105"
          style={{ background: "var(--gradient-primary)" }}
        >
          <Sparkles className="h-4 w-4" />
          Try It Free Now
        </Link>
        <p className="mt-4 text-xs text-muted-foreground">
          No credit card required · Works in your browser
        </p>
      </motion.div>
    </div>
  </section>
);

export default SolutionSection;
