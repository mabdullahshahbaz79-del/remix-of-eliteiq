import { motion, useInView } from "framer-motion";
import { BarChart3, Search, DollarSign, Clock, ChevronRight, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

const stats = [
  { icon: BarChart3, value: "2–3×", label: "more downloads", desc: "Contributors report 2–3x more downloads within weeks of fixing metadata.", color: "text-primary", bg: "bg-primary/15", glow: "hsl(var(--primary) / 0.2)" },
  { icon: Search, value: "Top 10", label: "search ranking", desc: "Optimized titles and keywords push your images to the top of buyer searches.", color: "text-secondary", bg: "bg-secondary/15", glow: "hsl(var(--secondary) / 0.2)" },
  { icon: DollarSign, value: "+40%", label: "increased earnings", desc: "More visibility leads directly to more sales and higher monthly payouts.", color: "text-amber-400", bg: "bg-amber-400/15", glow: "hsla(38, 92%, 50%, 0.2)" },
  { icon: Clock, value: "90%", label: "time saved", desc: "What used to take hours per batch now takes seconds with AI automation.", color: "text-pink-400", bg: "bg-pink-400/15", glow: "hsla(330, 80%, 60%, 0.2)" },
];

const CountUpValue = ({ value, inView }: { value: string; inView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5, y: 20 }}
    animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
    transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
  >
    {value}
  </motion.div>
);

const ResultsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Floating gradient */}
      <motion.div
        className="pointer-events-none absolute right-0 top-1/3 w-[500px] h-[500px] rounded-full blur-[160px]"
        style={{ background: "hsl(var(--primary) / 0.05)" }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      <div className="container relative mx-auto px-6">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-8"
            animate={{ boxShadow: ["0 0 0px hsla(38, 92%, 50%, 0)", "0 0 20px hsla(38, 92%, 50%, 0.2)", "0 0 0px hsla(38, 92%, 50%, 0)"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ● Real Results
          </motion.span>
          <h2 className="text-4xl font-bold lg:text-6xl mb-4">
            What Happens When You{" "}
            <span className="gradient-text">Fix Your Metadata</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Better metadata = more visibility = more money
          </p>
        </motion.div>

        <div ref={ref} className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7, type: "spring" }}
              whileHover={{
                scale: 1.06,
                y: -8,
                boxShadow: `0 25px 50px -12px ${s.glow}`,
              }}
              className="rounded-2xl border border-glass-border bg-card/50 p-7 text-center backdrop-blur-sm cursor-default relative overflow-hidden group"
            >
              {/* Hover glow */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 80%, ${s.glow}, transparent 70%)` }}
              />
              <div className="relative">
                <motion.div
                  className={`mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${s.bg}`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <s.icon className={`h-7 w-7 ${s.color}`} />
                </motion.div>
                <div className={`text-4xl font-bold ${s.color}`}>
                  <CountUpValue value={s.value} inView={isInView} />
                </div>
                <div className="text-sm font-semibold text-foreground mt-2">{s.label}</div>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mx-auto mt-14 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {["Better metadata", "More visibility", "More money"].map((text, i) => (
            <motion.span
              key={i}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + i * 0.15 }}
            >
              <span className="rounded-full border border-glass-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm">
                {text}
              </span>
              {i < 2 && (
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              )}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/download"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20"
              style={{ background: "var(--gradient-primary)" }}
            >
              Start getting results
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
