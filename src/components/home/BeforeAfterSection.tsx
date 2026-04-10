import { motion } from "framer-motion";
import { ArrowRight, X, Check, Sparkles } from "lucide-react";

const BeforeAfterSection = () => (
  <section className="relative py-28 overflow-hidden">
    {/* Background pulse */}
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px]"
      style={{ background: "hsl(var(--primary) / 0.04)" }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.03, 0.08, 0.03] }}
      transition={{ duration: 8, repeat: Infinity }}
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
          animate={{ boxShadow: ["0 0 0px hsl(var(--secondary) / 0)", "0 0 20px hsl(var(--secondary) / 0.2)", "0 0 0px hsl(var(--secondary) / 0)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          See What Changes
        </motion.span>
        <h2 className="text-4xl font-bold lg:text-6xl">
          Before vs. After
        </h2>
      </motion.div>

      <div className="mx-auto max-w-4xl grid gap-8 lg:grid-cols-[1fr_auto_1fr] items-center">
        {/* Before */}
        <motion.div
          initial={{ opacity: 0, x: -80, rotateY: 15 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, type: "spring", stiffness: 60 }}
          whileHover={{ scale: 1.02, boxShadow: "0 0 40px hsl(var(--destructive) / 0.15)" }}
          className="rounded-2xl border border-destructive/20 bg-destructive/5 p-7 relative overflow-hidden"
        >
          {/* Subtle red pulse glow */}
          <motion.div
            className="pointer-events-none absolute -inset-1 rounded-2xl"
            animate={{ boxShadow: ["inset 0 0 30px hsl(var(--destructive) / 0.05)", "inset 0 0 50px hsl(var(--destructive) / 0.1)", "inset 0 0 30px hsl(var(--destructive) / 0.05)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative">
            <div className="mb-5 flex items-center gap-2">
              <motion.div
                className="h-3 w-3 rounded-full bg-destructive"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs font-bold uppercase tracking-wider text-destructive">Before</span>
            </div>
            <div className="mb-5">
              <span className="text-xs text-muted-foreground">Title</span>
              <motion.div
                className="mt-1.5 rounded-lg border border-glass-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground line-through decoration-destructive/40"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Nature tree green
              </motion.div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Keywords</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Nature", "tree", "green"].map((k, i) => (
                  <motion.span
                    key={k}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                    className="rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-xs text-destructive"
                  >
                    {k}
                  </motion.span>
                ))}
                <span className="rounded-full border border-glass-border px-3 py-1 text-xs text-muted-foreground">+0 more</span>
              </div>
            </div>
            <motion.div
              className="mt-5 flex items-center gap-1.5 text-xs text-destructive"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <X className="h-3.5 w-3.5" /> Zero relevant search matches
            </motion.div>
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 150 }}
          className="hidden lg:flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-primary/30"
          style={{ background: "var(--gradient-primary)" }}
        >
          <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
            <ArrowRight className="h-6 w-6 text-primary-foreground" />
          </motion.div>
        </motion.div>

        {/* After */}
        <motion.div
          initial={{ opacity: 0, x: 80, rotateY: -15 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, type: "spring", stiffness: 60 }}
          whileHover={{ scale: 1.02, boxShadow: "0 0 40px hsl(var(--secondary) / 0.15)" }}
          className="rounded-2xl border border-secondary/20 bg-secondary/5 p-7 relative overflow-hidden"
        >
          {/* Green glow */}
          <motion.div
            className="pointer-events-none absolute -inset-1 rounded-2xl"
            animate={{ boxShadow: ["inset 0 0 30px hsl(var(--secondary) / 0.05)", "inset 0 0 50px hsl(var(--secondary) / 0.1)", "inset 0 0 30px hsl(var(--secondary) / 0.05)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative">
            <div className="mb-5 flex items-center gap-2">
              <motion.div
                className="h-3 w-3 rounded-full bg-secondary"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">After — Elite IQ</span>
              <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Sparkles className="h-3.5 w-3.5 text-secondary" />
              </motion.div>
            </div>
            <div className="mb-5">
              <span className="text-xs text-muted-foreground">Title</span>
              <motion.div
                className="mt-1.5 rounded-lg border border-secondary/20 bg-secondary/5 px-4 py-3 text-sm text-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                Lush Green Forest Landscape with Sunlight Rays – Nature Background
              </motion.div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Keywords</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {["forest", "greenery", "sunlight", "nature background", "eco", "scenic", "outdoor", "environment", "foliage", "serene"].map((k, i) => (
                  <motion.span
                    key={k}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.05, type: "spring" }}
                    className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs text-secondary"
                  >
                    {k}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.1, type: "spring" }}
                  className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs text-secondary font-semibold"
                >
                  +40 more
                </motion.span>
              </div>
            </div>
            <motion.div
              className="mt-5 flex items-center gap-1.5 text-xs text-success"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 }}
            >
              <Check className="h-3.5 w-3.5" /> Matches real search queries
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mx-auto mt-12 flex justify-center"
        initial={{ opacity: 0, y: 30, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, type: "spring" }}
      >
        <motion.span
          className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-card/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm"
          animate={{ boxShadow: ["0 0 0px hsl(var(--secondary) / 0)", "0 0 25px hsl(var(--secondary) / 0.15)", "0 0 0px hsl(var(--secondary) / 0)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="h-4 w-4 text-secondary" />
          This is what gets ranked.
        </motion.span>
      </motion.div>
    </div>
  </section>
);

export default BeforeAfterSection;
