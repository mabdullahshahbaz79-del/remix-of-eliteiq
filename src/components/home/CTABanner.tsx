import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTABanner = () => (
  <section className="relative py-28 overflow-hidden">
    <div className="container mx-auto px-6">
      <motion.div
        className="mx-auto max-w-3xl rounded-3xl p-12 text-center relative overflow-hidden"
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

export default CTABanner;
