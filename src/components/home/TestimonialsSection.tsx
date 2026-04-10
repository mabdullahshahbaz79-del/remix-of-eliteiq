import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Elite IQ completely transformed my workflow. What used to take 3 hours now takes under 10 minutes for 200 images.",
    name: "Sarah M.",
    role: "Adobe Stock Contributor",
    stat: "+280%",
    statLabel: "downloads",
    color: "text-secondary",
    initialChar: "S",
    initialBg: "bg-secondary/20 text-secondary",
    glow: "hsl(var(--secondary) / 0.15)",
  },
  {
    quote: "The AI-generated keywords are incredibly accurate. My images started appearing in searches I never would have thought to target.",
    name: "David K.",
    role: "Shutterstock Freelancer",
    stat: "+5x",
    statLabel: "earnings",
    color: "text-amber-400",
    initialChar: "D",
    initialBg: "bg-amber-400/20 text-amber-400",
    glow: "hsla(38, 92%, 50%, 0.15)",
  },
  {
    quote: "Best investment for any serious stock contributor. Batch processing 500 images in minutes is a total game-changer.",
    name: "Maria L.",
    role: "Professional Photographer",
    stat: "90%",
    statLabel: "time saved",
    color: "text-success",
    initialChar: "M",
    initialBg: "bg-success/20 text-success",
    glow: "hsl(var(--success) / 0.15)",
  },
];

const TestimonialsSection = () => (
  <section className="relative py-28 overflow-hidden">
    {/* Floating ambient glow */}
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px]"
      style={{ background: "hsl(var(--primary) / 0.04)" }}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 10, repeat: Infinity }}
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
          className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-8"
          animate={{ boxShadow: ["0 0 0px hsla(38, 92%, 50%, 0)", "0 0 20px hsla(38, 92%, 50%, 0.2)", "0 0 0px hsla(38, 92%, 50%, 0)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ● Loved by Creators
        </motion.span>
        <h2 className="text-4xl font-bold lg:text-6xl mb-5">
          Real People,{" "}
          <span className="gradient-text">Real Results</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Join 1,000+ stock contributors who already let AI handle their metadata.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.7, type: "spring" }}
            whileHover={{
              scale: 1.04,
              y: -8,
              boxShadow: `0 25px 50px -12px ${t.glow}`,
            }}
            className="rounded-2xl border border-glass-border bg-card/50 p-7 backdrop-blur-sm relative overflow-hidden group cursor-default"
          >
            {/* Hover glow */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at 50% 100%, ${t.glow}, transparent 70%)` }}
            />

            <div className="relative">
              {/* Quote icon */}
              <motion.div
                className="absolute -top-1 -right-1 opacity-10"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Quote className="h-10 w-10 text-foreground" />
              </motion.div>

              {/* Stars */}
              <div className="mb-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 + j * 0.05, type: "spring", stiffness: 200 }}
                  >
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  </motion.div>
                ))}
              </div>

              <p className="mb-7 text-sm text-muted-foreground leading-relaxed">"{t.quote}"</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${t.initialBg}`}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {t.initialChar}
                  </motion.div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
                <motion.span
                  className={`rounded-full border border-glass-border bg-card/80 px-3 py-1.5 text-xs font-bold ${t.color}`}
                  whileHover={{ scale: 1.1 }}
                >
                  {t.stat} {t.statLabel}
                </motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
