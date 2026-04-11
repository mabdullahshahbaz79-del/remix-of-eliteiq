import { motion } from "framer-motion";

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 1,
  duration: Math.random() * 10 + 8,
  delay: Math.random() * 6,
}));

const GlobalBackground = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    {/* Subtle grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />

    {/* Floating gradient orbs */}
    <motion.div
      className="absolute rounded-full blur-[140px]"
      style={{ width: 500, height: 500, left: "10%", top: "15%", background: "hsl(var(--primary) / 0.07)" }}
      animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.3, 0.9, 1] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute rounded-full blur-[120px]"
      style={{ width: 400, height: 400, right: "5%", top: "40%", background: "hsl(var(--secondary) / 0.05)" }}
      animate={{ x: [0, -50, 30, 0], y: [0, 60, -50, 0], scale: [1, 0.8, 1.2, 1] }}
      transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute rounded-full blur-[100px]"
      style={{ width: 300, height: 300, left: "50%", bottom: "10%", background: "hsl(var(--primary) / 0.04)" }}
      animate={{ x: [0, 40, -30, 0], y: [0, -40, 20, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Particle field */}
    {particles.map((p) => (
      <motion.div
        key={p.id}
        className="absolute rounded-full"
        style={{
          width: p.size,
          height: p.size,
          left: `${p.x}%`,
          top: `${p.y}%`,
          background:
            p.id % 3 === 0
              ? "hsl(var(--primary))"
              : p.id % 3 === 1
              ? "hsl(var(--secondary))"
              : "hsl(var(--foreground) / 0.3)",
        }}
        animate={{
          y: [0, -60, 0],
          x: [0, Math.random() * 30 - 15, 0],
          opacity: [0, 0.6, 0],
          scale: [0, 1.2, 0],
        }}
        transition={{
          duration: p.duration,
          delay: p.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}

    {/* Radial vignette */}
    <div
      className="absolute inset-0"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 30%, transparent 0%, hsl(var(--background) / 0.4) 100%)",
      }}
    />
  </div>
);

export default GlobalBackground;
