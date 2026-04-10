import { motion } from "framer-motion";
import { Check } from "lucide-react";

const platforms = [
  "Adobe Stock", "Shutterstock", "Freepik", "iStock", "Getty Images", "Dreamstime",
  "Depositphotos", "123RF", "Alamy", "Pond5", "Vecteezy", "Canva",
];

const badges = [
  "Platform-specific CSV format",
  "Correct column headers per platform",
  "Category & editorial flags",
  "Batch upload ready",
];

const PlatformsSection = () => (
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
          ● Platform Support
        </span>
        <h2 className="text-4xl font-bold lg:text-5xl mb-4">
          Works with{" "}
          <span className="gradient-text">Every Platform</span>
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground">
          Export metadata in the exact format required by each stock platform — no manual reformatting.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {platforms.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className="flex flex-col items-center gap-2 rounded-xl border border-glass-border bg-card/50 p-4 backdrop-blur-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 text-lg font-bold text-foreground">
              {p.charAt(0)}
            </div>
            <span className="text-xs text-muted-foreground text-center">{p}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mx-auto mt-10 flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        {badges.map((b, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-2 text-xs text-secondary">
            <Check className="h-3 w-3" /> {b}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
);

export default PlatformsSection;
