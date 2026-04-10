import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Elite IQ completely transformed my workflow. What used to take 3 hours now takes under 10 minutes for 200 images.",
    name: "Sarah M.",
    role: "Adobe Stock Contributor",
    stat: "+280%",
    statLabel: "downloads",
    color: "text-secondary",
    initial: "S",
    initialBg: "bg-secondary/20 text-secondary",
  },
  {
    quote: "The AI-generated keywords are incredibly accurate. My images started appearing in searches I never would have thought to target.",
    name: "David K.",
    role: "Shutterstock Freelancer",
    stat: "+5x",
    statLabel: "earnings",
    color: "text-amber-400",
    initial: "D",
    initialBg: "bg-amber-400/20 text-amber-400",
  },
  {
    quote: "Best investment for any serious stock contributor. Batch processing 500 images in minutes is a total game-changer.",
    name: "Maria L.",
    role: "Professional Photographer",
    stat: "90%",
    statLabel: "time saved",
    color: "text-success",
    initial: "M",
    initialBg: "bg-success/20 text-success",
  },
];

const TestimonialsSection = () => (
  <section className="relative py-24 overflow-hidden">
    <div className="container mx-auto px-6">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-6">
          ● Loved by Creators
        </span>
        <h2 className="text-4xl font-bold lg:text-5xl mb-4">
          Real People,{" "}
          <span className="gradient-text">Real Results</span>
        </h2>
        <p className="text-muted-foreground">
          Join 1,000+ stock contributors who already let AI handle their metadata.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-xl border border-glass-border bg-card/50 p-6 backdrop-blur-sm"
          >
            <div className="mb-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="mb-6 text-sm text-muted-foreground leading-relaxed">"{t.quote}"</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${t.initialBg}`}>
                  {t.initial}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
              <span className={`rounded-full border border-glass-border bg-card/80 px-3 py-1 text-xs font-semibold ${t.color}`}>
                {t.stat} {t.statLabel}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
