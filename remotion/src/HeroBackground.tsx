import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

const Orb = ({ x, y, size, hue, speed, phase }: { x: number; y: number; size: number; hue: string; speed: number; phase: number }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = (frame + phase) / durationInFrames;
  
  const ox = x + Math.sin(t * Math.PI * 2 * speed) * 80;
  const oy = y + Math.cos(t * Math.PI * 2 * speed * 0.7) * 60;
  const s = size + Math.sin(t * Math.PI * 2 * speed * 1.3) * size * 0.25;
  const opacity = interpolate(
    Math.sin(t * Math.PI * 2 * speed * 0.5),
    [-1, 1],
    [0.08, 0.2]
  );

  return (
    <div
      style={{
        position: "absolute",
        left: ox,
        top: oy,
        width: s,
        height: s,
        borderRadius: "50%",
        background: hue,
        filter: `blur(${size * 0.5}px)`,
        opacity,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

const GridLines = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;
  const offset = t * 60;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.03,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        backgroundPosition: `${offset}px ${offset * 0.5}px`,
      }}
    />
  );
};

const Particles = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    startX: (i * 67 + 13) % 1920,
    startY: (i * 43 + 7) % 1080,
    speed: 0.5 + (i % 5) * 0.3,
    size: 2 + (i % 4),
    hue: i % 3 === 0 ? "rgba(139, 92, 246, 0.6)" : i % 3 === 1 ? "rgba(0, 204, 153, 0.6)" : "rgba(255, 255, 255, 0.3)",
  }));

  return (
    <>
      {particles.map((p) => {
        const t = (frame / durationInFrames) * p.speed;
        const loopT = t % 1;
        const y = p.startY - loopT * 400;
        const x = p.startX + Math.sin(loopT * Math.PI * 2) * 30;
        const opacity = interpolate(loopT, [0, 0.1, 0.8, 1], [0, 0.8, 0.8, 0]);

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: x,
              top: ((y % 1080) + 1080) % 1080,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: p.hue,
              opacity,
            }}
          />
        );
      })}
    </>
  );
};

export const HeroBackground = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;

  // Subtle camera movement
  const camX = Math.sin(t * Math.PI * 2) * 15;
  const camY = Math.cos(t * Math.PI * 2 * 0.7) * 10;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0a0e1a 0%, #0f172a 40%, #0d1321 100%)",
        overflow: "hidden",
        transform: `translate(${camX}px, ${camY}px) scale(1.05)`,
      }}
    >
      <GridLines />

      {/* Gradient orbs */}
      <Orb x={300} y={300} size={500} hue="radial-gradient(circle, rgba(139, 92, 246, 0.25), transparent)" speed={1} phase={0} />
      <Orb x={1400} y={600} size={400} hue="radial-gradient(circle, rgba(0, 204, 153, 0.2), transparent)" speed={0.8} phase={100} />
      <Orb x={900} y={200} size={350} hue="radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent)" speed={1.2} phase={200} />
      <Orb x={600} y={800} size={300} hue="radial-gradient(circle, rgba(0, 204, 153, 0.15), transparent)" speed={0.6} phase={50} />
      <Orb x={1600} y={200} size={250} hue="radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent)" speed={1.1} phase={150} />

      <Particles />

      {/* Center glow pulse */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 800,
          height: 800,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.08), transparent 70%)",
          opacity: interpolate(Math.sin(t * Math.PI * 4), [-1, 1], [0.3, 0.7]),
          filter: "blur(60px)",
        }}
      />

      {/* Scan line effect */}
      <div
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          height: 2,
          top: `${((t * 1080 * 2) % 1080)}px`,
          background: "linear-gradient(90deg, transparent, rgba(0, 204, 153, 0.1), transparent)",
          filter: "blur(1px)",
        }}
      />
    </AbsoluteFill>
  );
};
