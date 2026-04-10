import { motion } from "framer-motion";
import { Check } from "lucide-react";

import adobeStockLogo from "@/assets/platforms/adobe-stock.png";
import shutterstockLogo from "@/assets/platforms/shutterstock.png";
import freepikLogo from "@/assets/platforms/freepik.png";
import istockLogo from "@/assets/platforms/istock.png";
import gettyLogo from "@/assets/platforms/getty.png";
import dreamstimeLogo from "@/assets/platforms/dreamstime.png";
import depositphotosLogo from "@/assets/platforms/depositphotos.png";
import rf123Logo from "@/assets/platforms/123rf.png";
import alamyLogo from "@/assets/platforms/alamy.png";
import pond5Logo from "@/assets/platforms/pond5.png";
import vecteezyLogo from "@/assets/platforms/vecteezy.png";
import canvaLogo from "@/assets/platforms/canva.png";

const platforms = [
  { name: "Adobe Stock", logo: adobeStockLogo },
  { name: "Shutterstock", logo: shutterstockLogo },
  { name: "Freepik", logo: freepikLogo },
  { name: "iStock", logo: istockLogo },
  { name: "Getty Images", logo: gettyLogo },
  { name: "Dreamstime", logo: dreamstimeLogo },
  { name: "Depositphotos", logo: depositphotosLogo },
  { name: "123RF", logo: rf123Logo },
  { name: "Alamy", logo: alamyLogo },
  { name: "Pond5", logo: pond5Logo },
  { name: "Vecteezy", logo: vecteezyLogo },
  { name: "Canva", logo: canvaLogo },
];

const badges = [
  "Platform-specific CSV format",
  "Correct column headers per platform",
  "Category & editorial flags",
  "Batch upload ready",
];

const PlatformsSection = () => (
  <section className="relative py-28 overflow-hidden">
    {/* VIP Background Effects */}
    <div className="pointer-events-none absolute inset-0">
      {/* Radial gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
        }}
      />
      {/* Floating orbs */}
      <motion.div
        className="absolute rounded-full blur-[100px]"
        style={{ width: 400, height: 400, left: "5%", top: "10%", background: "hsl(var(--primary) / 0.12)" }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full blur-[120px]"
        style={{ width: 350, height: 350, right: "5%", bottom: "10%", background: "hsl(var(--secondary) / 0.1)" }}
        animate={{ x: [0, -30, 20, 0], y: [0, 40, -20, 0], scale: [1, 0.85, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
    </div>

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
          ● Platform Support
        </motion.span>
        <h2 className="text-4xl font-bold lg:text-6xl mb-5">
          Works with{" "}
          <span className="gradient-text">Every Platform</span>
        </h2>
        <p className="mx-auto max-w-xl text-muted-foreground text-lg">
          Export metadata in the exact format required by each stock platform — no manual reformatting.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {platforms.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, rotateY: 90 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5, type: "spring", stiffness: 120 }}
            whileHover={{
              scale: 1.1,
              y: -6,
              boxShadow: "0 15px 40px -10px hsl(var(--primary) / 0.2)",
              borderColor: "hsl(var(--primary) / 0.3)",
            }}
            className="flex flex-col items-center gap-3 rounded-xl border border-glass-border bg-card/50 p-5 backdrop-blur-sm cursor-default"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted/30 overflow-hidden">
              <img
                src={p.logo}
                alt={p.name}
                loading="lazy"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </div>
            <span className="text-xs text-muted-foreground text-center font-medium">{p.name}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mx-auto mt-12 flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {badges.map((b, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 + i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-5 py-2.5 text-xs text-secondary cursor-default"
          >
            <Check className="h-3.5 w-3.5" /> {b}
          </motion.span>
        ))}
      </motion.div>
    </div>
  </section>
);

export default PlatformsSection;
