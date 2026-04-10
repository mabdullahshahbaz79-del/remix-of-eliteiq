import { motion } from "framer-motion";
import { Upload, Sparkles, Download } from "lucide-react";

const steps = [
  { icon: Upload, num: "01", title: "Upload Your Images", desc: "Drag and drop your stock photos or select them from your computer. Supports JPG, PNG, TIFF and all major formats. Process up to 1000+ images at once.", color: "text-primary", bg: "bg-primary/15" },
  { icon: Sparkles, num: "02", title: "AI Generates Metadata", desc: "Our AI analyzes each image and generates optimized titles, descriptions, and 40–50 keywords — tailored to what buyers actually search on each platform.", color: "text-primary", bg: "bg-primary/15" },
  { icon: Download, num: "03", title: "Export to Any Platform", desc: "Download CSV files formatted specifically for Adobe Stock, Shutterstock, Freepik, and 12+ more platforms. One click — done.", color: "text-secondary", bg: "bg-secondary/15" },
];

const HowItWorksSection = () => (
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
          ● How It Works
        </span>
        <h2 className="text-4xl font-bold lg:text-5xl mb-4">
          Three Steps to{" "}
          <span className="gradient-text">Ranking Images</span>
        </h2>
        <p className="text-muted-foreground">
          Upload → Analyze → Export. It really is that simple.
        </p>
      </motion.div>

      <div className="mx-auto max-w-4xl grid gap-10 lg:grid-cols-3 relative">
        {/* Connector line */}
        <div className="hidden lg:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary/40 via-primary/20 to-secondary/40" />

        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="relative text-center"
          >
            <div className="relative mx-auto mb-6">
              <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${s.bg}`}>
                <s.icon className={`h-7 w-7 ${s.color}`} />
              </div>
              <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                {s.num}
              </span>
            </div>
            <h3 className="mb-3 text-lg font-bold text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
