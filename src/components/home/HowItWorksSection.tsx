import { motion } from "framer-motion";
import { Upload, Sparkles, Download } from "lucide-react";

const steps = [
  { icon: Upload, num: "01", title: "Upload Your Images", desc: "Drag and drop your stock photos or select them from your computer. Supports JPG, PNG, TIFF and all major formats. Process up to 1000+ images at once.", color: "text-primary", bg: "bg-primary/15", glow: "hsl(var(--primary) / 0.3)" },
  { icon: Sparkles, num: "02", title: "AI Generates Metadata", desc: "Our AI analyzes each image and generates optimized titles, descriptions, and 40–50 keywords — tailored to what buyers actually search on each platform.", color: "text-primary", bg: "bg-primary/15", glow: "hsl(var(--primary) / 0.3)" },
  { icon: Download, num: "03", title: "Export to Any Platform", desc: "Download CSV files formatted specifically for Adobe Stock, Shutterstock, Freepik, and 12+ more platforms. One click — done.", color: "text-secondary", bg: "bg-secondary/15", glow: "hsl(var(--secondary) / 0.3)" },
];

const HowItWorksSection = () => (
  <section className="relative py-28 overflow-hidden">
    <div className="container relative mx-auto px-6">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <motion.span
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-primary mb-8"
          animate={{ boxShadow: ["0 0 0px hsl(var(--primary) / 0)", "0 0 20px hsl(var(--primary) / 0.2)", "0 0 0px hsl(var(--primary) / 0)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ● How It Works
        </motion.span>
        <h2 className="text-4xl font-bold lg:text-6xl mb-5">
          Three Steps to{" "}
          <span className="gradient-text">Ranking Images</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Upload → Analyze → Export. It really is that simple.
        </p>
      </motion.div>

      <div className="mx-auto max-w-4xl grid gap-12 lg:grid-cols-3 relative">
        {/* Animated connector line */}
        <div className="hidden lg:block absolute top-[72px] left-[20%] right-[20%] h-0.5 overflow-hidden">
          <motion.div
            className="h-full w-full"
            style={{ background: "var(--gradient-primary)" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
          />
        </div>

        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.7, type: "spring", stiffness: 80 }}
            className="relative text-center group"
          >
            <div className="relative mx-auto mb-8">
              <motion.div
                className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl ${s.bg} relative`}
                whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  animate={{
                    boxShadow: [
                      `0 0 0px 0px ${s.glow}`,
                      `0 0 0px 12px transparent`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
                <s.icon className={`h-8 w-8 ${s.color}`} />
              </motion.div>
              <motion.span
                className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-primary-foreground shadow-lg"
                style={{ background: "var(--gradient-primary)" }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 300 }}
              >
                {s.num}
              </motion.span>
            </div>
            <h3 className="mb-3 text-xl font-bold text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
