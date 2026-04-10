import { motion, useMotionValue, useTransform } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { useRef } from "react";

const problems = [
  "You upload consistently… but get zero results",
  "Your keywords are random guesses",
  "Your titles don't match search intent",
  "You waste hours writing metadata that doesn't work",
  "Others rank higher with worse images",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -60, filter: "blur(8px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.7, type: "spring", stiffness: 80 } },
};

const ProblemSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden">
      {/* Animated red glow blob */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
        style={{ background: "hsl(var(--destructive) / 0.08)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-destructive mb-8"
            animate={{ boxShadow: ["0 0 0px hsl(var(--destructive) / 0)", "0 0 20px hsl(var(--destructive) / 0.3)", "0 0 0px hsl(var(--destructive) / 0)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            The Problem
          </motion.span>
          <h2 className="text-4xl font-bold lg:text-6xl">
            Why Your Images{" "}
            <motion.span
              className="text-destructive inline-block"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Don't Get Downloads
            </motion.span>
          </h2>
        </motion.div>

        <motion.div
          className="mx-auto max-w-2xl space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 8, borderColor: "hsl(var(--destructive) / 0.4)" }}
              className="group flex items-center gap-4 rounded-xl border border-glass-border bg-card/50 px-6 py-5 backdrop-blur-sm cursor-default transition-colors"
            >
              <motion.div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-destructive/20"
                whileHover={{ rotate: 90, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <X className="h-4 w-4 text-destructive" />
              </motion.div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{problem}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mx-auto mt-16 max-w-xl rounded-2xl border border-glass-border p-10 text-center backdrop-blur-xl relative overflow-hidden"
          style={{ background: "hsl(var(--card) / 0.6)" }}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
        >
          {/* Shine sweep */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "linear-gradient(105deg, transparent 40%, hsl(var(--foreground) / 0.04) 45%, transparent 50%)" }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
          />
          <motion.p
            className="text-2xl font-semibold text-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            It's not your images.
          </motion.p>
          <motion.p
            className="text-2xl font-bold gradient-text mt-1"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
          >
            It's your metadata.
          </motion.p>
          <motion.p
            className="mt-4 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
          >
            The difference between invisible and best-seller is a few well-crafted words.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
