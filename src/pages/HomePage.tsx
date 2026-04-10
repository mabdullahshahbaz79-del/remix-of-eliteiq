import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layers, Zap, BarChart3, Upload, Brain, Edit3, CheckCircle, ArrowRight } from "lucide-react";
import VIPHero from "@/components/VIPHero";

const platforms = [
  "Vecteezy", "123RF", "Freepik", "Pond5", "Depositphotos", "Canva", "iStock", "Shutterstock", "Dreamstime"
];

const features = [
  { title: "AI Metadata Generation", desc: "Powered by Gemini, GPT & more. Auto-generate titles, descriptions, and keywords.", icon: Brain },
  { title: "Multi-Platform Export", desc: "Export CSV tailored for each of the 9 stock platforms instantly.", icon: Layers },
  { title: "Bulk Processing", desc: "Process hundreds of files at once with batch upload support.", icon: Zap },
  { title: "Confidence Scoring", desc: "See AI confidence levels for each keyword to ensure quality.", icon: BarChart3 },
];

const steps = [
  { step: "01", title: "Upload Files", desc: "Drag & drop your images, vectors, or videos.", icon: Upload },
  { step: "02", title: "AI Analyzes", desc: "Our AI generates metadata in seconds.", icon: Brain },
  { step: "03", title: "Edit Metadata", desc: "Review, tweak, and perfect your metadata.", icon: Edit3 },
  { step: "04", title: "Export & Done", desc: "Download CSV files ready for each platform.", icon: CheckCircle },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: "spring", stiffness: 100 } },
};

const HomePage = () => (
  <div>
    <VIPHero />

    {/* Platforms strip */}
    <motion.section
      className="border-y border-glass-border py-8 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Supported Platforms</span>
          <div className="hidden h-4 w-px bg-glass-border sm:block" />
          {platforms.map((p, i) => (
            <motion.span
              key={p}
              className="text-sm font-medium text-muted-foreground/60 transition-colors hover:text-foreground cursor-default"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.15, color: "hsl(var(--foreground))" }}
            >
              {p}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.section>

    {/* Features */}
    <motion.section
      className="py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <motion.div className="mb-4 flex items-center gap-3" variants={cardVariants}>
            <div className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Features</span>
          </motion.div>
          <motion.h2 className="text-4xl font-bold leading-tight lg:text-5xl" variants={cardVariants}>
            <span className="text-foreground">Everything You Need</span>
            <br />
            <span className="text-muted-foreground">For Professional Metadata</span>
          </motion.h2>
        </div>
        <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          {features.map((f) => (
            <motion.div
              key={f.title}
              className="glass-card group p-8 transition-all hover:border-primary/30 cursor-default"
              variants={cardVariants}
              whileHover={{ y: -8, boxShadow: "0 20px 60px hsl(var(--primary) / 0.15)" }}
            >
              <motion.div
                className="mb-6 inline-flex rounded-xl p-3"
                style={{ background: "var(--gradient-subtle)" }}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <f.icon className="h-6 w-6 text-primary" />
              </motion.div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>

    {/* How It Works */}
    <motion.section
      className="py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <motion.div className="mb-4 flex items-center gap-3" variants={cardVariants}>
            <div className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Process</span>
          </motion.div>
          <motion.h2 className="text-4xl font-bold leading-tight lg:text-5xl" variants={cardVariants}>
            <span className="text-foreground">How It</span>{" "}
            <span className="gradient-text">Works</span>
          </motion.h2>
        </div>
        <motion.div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
          {steps.map((s, i) => (
            <motion.div key={s.step} className="relative" variants={cardVariants}>
              {i < steps.length - 1 && (
                <motion.div
                  className="absolute right-0 top-10 hidden h-px w-full translate-x-1/2 lg:block"
                  style={{ background: "var(--gradient-primary)" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                />
              )}
              <motion.div
                className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{ background: "var(--gradient-subtle)" }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <s.icon className="h-7 w-7 text-primary" />
                <motion.span
                  className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-foreground"
                  style={{ background: "var(--gradient-primary)" }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                >
                  {s.step}
                </motion.span>
              </motion.div>
              <h3 className="mb-2 font-semibold text-foreground">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>

    {/* CTA */}
    <motion.section
      className="py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="glass-card relative overflow-hidden p-16 text-center"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{ background: "var(--gradient-primary)", opacity: 0.07 }}
            animate={{ opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute -top-20 -right-20 h-60 w-60 rounded-full blur-[100px]"
            style={{ background: "hsl(var(--primary) / 0.2)" }}
            animate={{ scale: [1, 1.4, 1], x: [0, 30, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <h2 className="relative mb-4 text-4xl font-bold text-foreground">Ready to Automate Your Metadata?</h2>
          <p className="relative mb-8 text-muted-foreground">Start with a free 30-day trial. No credit card required.</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link to="/pricing" className="gradient-btn relative inline-flex items-center gap-2 text-lg">
              Get Started Now <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  </div>
);

export default HomePage;
