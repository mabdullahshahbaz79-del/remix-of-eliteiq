import { motion } from "framer-motion";
import { ArrowRight, X, Check, Sparkles } from "lucide-react";

const BeforeAfterSection = () => (
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
          <Sparkles className="inline h-3 w-3 mr-1" />
          See What Changes
        </span>
        <h2 className="text-4xl font-bold lg:text-5xl">
          Before vs. After
        </h2>
      </motion.div>

      <div className="mx-auto max-w-4xl grid gap-8 lg:grid-cols-[1fr_auto_1fr] items-center">
        {/* Before */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-xl border border-destructive/20 bg-destructive/5 p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-destructive" />
            <span className="text-xs font-bold uppercase tracking-wider text-destructive">Before</span>
          </div>
          <div className="mb-4">
            <span className="text-xs text-muted-foreground">Title</span>
            <div className="mt-1 rounded-lg border border-glass-border bg-muted/30 px-4 py-2.5 text-sm text-muted-foreground">
              Nature tree green
            </div>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Keywords</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Nature", "tree", "green"].map((k) => (
                <span key={k} className="rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-xs text-destructive">
                  {k}
                </span>
              ))}
              <span className="rounded-full border border-glass-border px-3 py-1 text-xs text-muted-foreground">+0 more</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-destructive">
            <X className="h-3.5 w-3.5" /> Zero relevant search matches
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="hidden lg:flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: "var(--gradient-primary)" }}
        >
          <ArrowRight className="h-5 w-5 text-primary-foreground" />
        </motion.div>

        {/* After */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-xl border border-secondary/20 bg-secondary/5 p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-secondary" />
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">After — Elite IQ</span>
            <Sparkles className="h-3 w-3 text-secondary" />
          </div>
          <div className="mb-4">
            <span className="text-xs text-muted-foreground">Title</span>
            <div className="mt-1 rounded-lg border border-secondary/20 bg-secondary/5 px-4 py-2.5 text-sm text-foreground">
              Lush Green Forest Landscape with Sunlight Rays – Nature Background
            </div>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Keywords</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {["forest", "greenery", "sunlight", "nature background", "eco", "scenic", "outdoor", "environment", "foliage", "serene"].map((k) => (
                <span key={k} className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs text-secondary">
                  {k}
                </span>
              ))}
              <span className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs text-secondary">+40 more</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-success">
            <Check className="h-3.5 w-3.5" /> Matches real search queries
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mx-auto mt-10 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-secondary" />
          This is what gets ranked.
        </span>
      </motion.div>
    </div>
  </section>
);

export default BeforeAfterSection;
