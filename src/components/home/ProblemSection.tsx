import { motion } from "framer-motion";
import { X } from "lucide-react";

const problems = [
  "You upload consistently… but get zero results",
  "Your keywords are random guesses",
  "Your titles don't match search intent",
  "You waste hours writing metadata that doesn't work",
  "Others rank higher with worse images",
];

const ProblemSection = () => (
  <section className="relative py-24 overflow-hidden">
    <div className="container mx-auto px-6">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block rounded-full border border-destructive/30 bg-destructive/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-destructive mb-6">
          The Problem
        </span>
        <h2 className="text-4xl font-bold lg:text-5xl">
          Why Your Images{" "}
          <span className="text-destructive">Don't Get Downloads</span>
        </h2>
      </motion.div>

      <div className="mx-auto max-w-2xl space-y-4">
        {problems.map((problem, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex items-center gap-4 rounded-xl border border-glass-border bg-card/50 px-6 py-4 backdrop-blur-sm"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-destructive/20">
              <X className="h-3.5 w-3.5 text-destructive" />
            </div>
            <span className="text-sm text-muted-foreground">{problem}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mx-auto mt-16 max-w-xl rounded-2xl border border-glass-border p-8 text-center backdrop-blur-xl"
        style={{ background: "hsl(var(--card) / 0.6)" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <p className="text-xl font-semibold text-foreground">
          It's not your images.
        </p>
        <p className="text-xl font-bold gradient-text mt-1">
          It's your metadata.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          The difference between invisible and best-seller is a few well-crafted words.
        </p>
      </motion.div>
    </div>
  </section>
);

export default ProblemSection;
