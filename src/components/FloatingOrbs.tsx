const orbs = [
  { size: 320, x: "10%", y: "20%", delay: "0s", dur: "18s", color: "hsl(var(--primary) / 0.15)" },
  { size: 240, x: "75%", y: "60%", delay: "3s", dur: "22s", color: "hsl(var(--secondary) / 0.12)" },
  { size: 180, x: "50%", y: "10%", delay: "6s", dur: "20s", color: "hsl(var(--primary) / 0.10)" },
  { size: 260, x: "85%", y: "15%", delay: "1s", dur: "25s", color: "hsl(var(--secondary) / 0.08)" },
  { size: 140, x: "25%", y: "70%", delay: "4s", dur: "16s", color: "hsl(var(--primary) / 0.12)" },
];

const FloatingOrbs = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {orbs.map((orb, i) => (
      <div
        key={i}
        className="absolute rounded-full blur-3xl"
        style={{
          width: orb.size,
          height: orb.size,
          left: orb.x,
          top: orb.y,
          background: orb.color,
          animation: `floatOrb${i} ${orb.dur} ease-in-out ${orb.delay} infinite alternate`,
        }}
      />
    ))}
    <style>{`
      @keyframes floatOrb0 { from { transform: translate(0,0) scale(1); } to { transform: translate(40px,-60px) scale(1.15); } }
      @keyframes floatOrb1 { from { transform: translate(0,0) scale(1); } to { transform: translate(-50px,30px) scale(1.1); } }
      @keyframes floatOrb2 { from { transform: translate(0,0) scale(1); } to { transform: translate(30px,50px) scale(1.2); } }
      @keyframes floatOrb3 { from { transform: translate(0,0) scale(1); } to { transform: translate(-40px,-40px) scale(1.08); } }
      @keyframes floatOrb4 { from { transform: translate(0,0) scale(1); } to { transform: translate(60px,-30px) scale(1.12); } }
    `}</style>
  </div>
);

export default FloatingOrbs;
