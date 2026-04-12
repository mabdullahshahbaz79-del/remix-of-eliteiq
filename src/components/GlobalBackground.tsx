import { motion } from "framer-motion";

const particles = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 10 + 8,
  delay: Math.random() * 6,
}));

const GlobalBackground = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    {/* Subtle grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />

    {/* Primary orb - top left */}
    <motion.div
      className="absolute rounded-full blur-[160px]"
      style={{ width: 600, height: 600, left: "5%", top: "10%", background: "hsl(var(--primary) / 0.10)" }}
      animate={{ x: [0, 100, -50, 0], y: [0, -80, 50, 0], scale: [1, 1.4, 0.85, 1] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Secondary orb - right */}
    <motion.div
      className="absolute rounded-full blur-[140px]"
      style={{ width: 500, height: 500, right: "0%", top: "35%", background: "hsl(var(--secondary) / 0.08)" }}
      animate={{ x: [0, -70, 40, 0], y: [0, 80, -60, 0], scale: [1, 0.8, 1.3, 1] }}
      transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Accent orb - bottom center */}
    <motion.div
      className="absolute rounded-full blur-[120px]"
      style={{ width: 450, height: 450, left: "40%", bottom: "5%", background: "hsl(var(--primary) / 0.06)" }}
      animate={{ x: [0, 60, -40, 0], y: [0, -50, 30, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Warm accent orb - mid left */}
    <motion.div
      className="absolute rounded-full blur-[130px]"
      style={{ width: 350, height: 350, left: "25%", top: "55%", background: "hsl(280 80% 55% / 0.05)" }}
      animate={{ x: [0, -40, 50, 0], y: [0, 40, -30, 0], scale: [1, 1.2, 0.9, 1] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
    />
    {/* Cool accent orb - top right */}
    <motion.div
      className="absolute rounded-full blur-[110px]"
      style={{ width: 300, height: 300, right: "15%", top: "8%", background: "hsl(190 90% 50% / 0.05)" }}
      animate={{ x: [0, 30, -20, 0], y: [0, -30, 40, 0], scale: [1, 0.9, 1.15, 1] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }}
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
            p.id % 4 === 0
              ? "hsl(var(--primary))"
              : p.id % 4 === 1
              ? "hsl(var(--secondary))"
              : p.id % 4 === 2
              ? "hsl(280 80% 60%)"
              : "hsl(var(--foreground) / 0.3)",
        }}
        animate={{
          y: [0, -80, 0],
          x: [0, Math.random() * 40 - 20, 0],
          opacity: [0, 0.7, 0],
          scale: [0, 1.5, 0],
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
        background: "radial-gradient(ellipse 80% 60% at 50% 30%, transparent 0%, hsl(var(--background) / 0.5) 100%)",
      }}
    />
  </div>
);

export default GlobalBackground;
