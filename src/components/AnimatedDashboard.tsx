import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  FileImage,
  Sparkles,
  CheckCircle2,
  Download,
  Eye,
} from "lucide-react";

const platforms = ["Adobe Stock", "Shutterstock", "Freepik", "Getty", "iStock"];
const keywords = [
  "sunset", "landscape", "golden hour", "nature photography", "scenic view",
  "mountains", "sky gradient", "outdoor", "travel", "serene", "calm water",
  "reflection", "horizon", "dramatic sky", "silhouette",
];

const AnimatedCounter = ({ target, duration = 2000, prefix = "", suffix = "" }: { target: number; duration?: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const TypingText = ({ text, speed = 40 }: { text: string; speed?: number }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return (
    <span>
      {displayed}
      <motion.span
        className="inline-block w-0.5 h-4 bg-secondary ml-0.5 align-middle"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </span>
  );
};

const AnimatedDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [processedCount, setProcessedCount] = useState(0);
  const [keywordIdx, setKeywordIdx] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setActiveTab((p) => (p + 1) % platforms.length), 3000);
    const t2 = setInterval(() => setProcessedCount((p) => Math.min(p + 1, 12)), 800);
    const t3 = setInterval(() => setKeywordIdx((p) => (p + 1) % keywords.length), 1500);
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3); };
  }, []);

  const barData = [65, 82, 45, 93, 71, 58, 88, 76];

  return (
    <div className="relative w-full rounded-2xl border border-glass-border overflow-hidden" style={{ background: "hsl(var(--card) / 0.95)" }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-glass-border px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-success/60" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-[10px] text-muted-foreground font-medium">eliteiq.tech — Metadata Generator</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: FileImage, label: "Processed", value: processedCount, suffix: "/12", color: "text-primary" },
            { icon: Sparkles, label: "Keywords", value: 487, color: "text-secondary" },
            { icon: TrendingUp, label: "Score", value: 96, suffix: "%", color: "text-success" },
            { icon: Eye, label: "Platforms", value: 9, color: "text-amber-400" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="rounded-lg border border-glass-border p-2 text-center"
              style={{ background: "hsl(var(--muted) / 0.3)" }}
            >
              <s.icon className={`h-3 w-3 mx-auto mb-1 ${s.color}`} />
              <div className={`text-sm font-bold ${s.color}`}>
                <AnimatedCounter target={s.value} duration={1500} suffix={s.suffix || ""} />
              </div>
              <div className="text-[8px] text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main area */}
        <div className="grid grid-cols-5 gap-3">
          {/* Left: Image thumbnails */}
          <div className="col-span-2 space-y-2">
            <div className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider">Assets</div>
            <div className="grid grid-cols-2 gap-1.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.15, type: "spring" }}
                  className="relative aspect-square rounded-lg overflow-hidden border border-glass-border"
                  style={{ background: `linear-gradient(${135 + i * 45}deg, hsl(var(--primary) / ${0.15 + i * 0.05}), hsl(var(--secondary) / ${0.1 + i * 0.05}))` }}
                >
                  <FileImage className="absolute inset-0 m-auto h-4 w-4 text-muted-foreground/40" />
                  {i < processedCount && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-0.5 right-0.5"
                    >
                      <CheckCircle2 className="h-3 w-3 text-success" />
                    </motion.div>
                  )}
                  {i === Math.min(processedCount, 3) && processedCount < 4 && (
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      style={{ background: "var(--gradient-primary)" }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Metadata output */}
          <div className="col-span-3 space-y-2">
            <div className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wider">Generated Metadata</div>

            {/* Title */}
            <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-2">
              <div className="text-[8px] text-muted-foreground mb-1">Title</div>
              <div className="text-[10px] text-foreground font-medium leading-tight">
                <TypingText text="Golden Hour Mountain Landscape with Dramatic Sunset Sky" speed={35} />
              </div>
            </div>

            {/* Keywords */}
            <div className="rounded-lg border border-glass-border p-2" style={{ background: "hsl(var(--muted) / 0.2)" }}>
              <div className="text-[8px] text-muted-foreground mb-1.5">Keywords</div>
              <div className="flex flex-wrap gap-1">
                <AnimatePresence mode="popLayout">
                  {keywords.slice(0, 8).map((kw, i) => (
                    <motion.span
                      key={`${kw}-${keywordIdx}`}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ delay: i * 0.03 }}
                      className="rounded-full bg-secondary/10 border border-secondary/20 px-1.5 py-0.5 text-[8px] text-secondary"
                    >
                      {keywords[(i + keywordIdx) % keywords.length]}
                    </motion.span>
                  ))}
                </AnimatePresence>
                <span className="rounded-full bg-primary/10 border border-primary/20 px-1.5 py-0.5 text-[8px] text-primary font-semibold">
                  +42 more
                </span>
              </div>
            </div>

            {/* Chart */}
            <div className="rounded-lg border border-glass-border p-2" style={{ background: "hsl(var(--muted) / 0.2)" }}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-[8px] text-muted-foreground">Relevance Score</div>
                <div className="text-[8px] font-bold text-success">96.4%</div>
              </div>
              <div className="flex items-end gap-0.5 h-8">
                {barData.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 1 + i * 0.08, duration: 0.5, type: "spring" }}
                    className="flex-1 rounded-sm"
                    style={{
                      background: h > 70
                        ? "hsl(var(--secondary))"
                        : h > 50
                        ? "hsl(var(--primary))"
                        : "hsl(var(--muted-foreground) / 0.3)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Platform tabs */}
        <div className="rounded-lg border border-glass-border p-2" style={{ background: "hsl(var(--muted) / 0.2)" }}>
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[8px] text-muted-foreground">Export Platform</div>
            <motion.div
              className="flex items-center gap-1 text-[8px] text-success"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle2 className="h-2.5 w-2.5" /> Ready
            </motion.div>
          </div>
          <div className="flex gap-1">
            {platforms.map((p, i) => (
              <motion.button
                key={p}
                className={`rounded-md px-2 py-1 text-[8px] font-medium transition-all ${
                  activeTab === i
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-muted-foreground border border-transparent hover:bg-muted/30"
                }`}
                animate={activeTab === i ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {p}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bottom export button */}
        <motion.div
          className="flex items-center justify-center gap-2 rounded-lg py-2 text-[10px] font-semibold text-primary-foreground"
          style={{ background: "var(--gradient-primary)" }}
          animate={{ boxShadow: ["0 0 0px hsl(var(--primary) / 0)", "0 0 20px hsl(var(--primary) / 0.3)", "0 0 0px hsl(var(--primary) / 0)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Download className="h-3 w-3" />
          Export CSV — 12 images ready
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedDashboard;
