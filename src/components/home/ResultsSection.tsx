import { motion } from "framer-motion";
import { BarChart3, Search, DollarSign, Clock, ChevronRight } from "lucide-react";

const stats = [
  { icon: BarChart3, value: "2–3×", label: "more downloads", desc: "Contributors report 2–3x more downloads within weeks of fixing metadata.", color: "text-primary", bg: "bg-primary/15" },
  { icon: Search, value: "Top 10", label: "search ranking", desc: "Optimized titles and keywords push your images to the top of buyer searches.", color: "text-secondary", bg: "bg-secondary/15" },
  { icon: DollarSign, value: "+40%", label: "increased earnings", desc: "More visibility leads directly to more sales and higher monthly payouts.", color: "text-amber-400", bg: "bg-amber-400/15" },
  { icon: Clock, value: "90%", label: "time saved", desc: "What used to take hours per batch now takes seconds with AI automation.", color: "text-pink-400", bg: "bg-pink-400/15" },
];

const ResultsSection = () => (
  <section className="relative py-24 overflow-hidden">
    <div className="container mx-auto px-6">
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-6">
          ● Real Results
        </span>
        <h2 className="text-4xl font-bold lg:text-5xl mb-4">
          What Happens When You{" "}
          <span className="gradient-text">Fix Your Metadata</span>
        </h2>
        <p className="text-muted-foreground">
          Better metadata = more visibility = more money
        </p>
      </motion.div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-xl border border-glass-border bg-card/50 p-6 text-center backdrop-blur-sm"
          >
            <div className={`mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${s.bg}`}>
              <s.icon className={`h-6 w-6 ${s.color}`} />
            </div>
            <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm font-semibold text-foreground mt-1">{s.label}</div>
            <p className="mt-2 text-xs text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mx-auto mt-12 flex flex-wrap items-center justify-center gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        {["Better metadata", "More visibility", "More money"].map((text, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="rounded-full border border-glass-border bg-card/60 px-5 py-2 text-sm font-medium text-foreground">
              {text}
            </span>
            {i < 2 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ResultsSection;
