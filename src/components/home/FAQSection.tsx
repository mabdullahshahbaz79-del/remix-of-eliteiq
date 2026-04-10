import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const faqs = [
  { q: "What is Elite IQ?", a: "Elite IQ is an AI-powered metadata generator built specifically for stock photographers and contributors. It automatically generates optimized titles, descriptions, and keywords for your images — formatted perfectly for all major stock platforms." },
  { q: "Does it work with Adobe Stock and Shutterstock?", a: "Yes! Elite IQ supports 15+ platforms including Adobe Stock, Shutterstock, Freepik, iStock, Getty Images, Alamy, 123RF, Pond5, Vecteezy, Dreamstime, Depositphotos, and more." },
  { q: "Do I need my own API keys?", a: "No. Elite IQ comes with built-in AI — no external API keys required. Just upload your images and get instant metadata." },
  { q: "How many images can I process at once?", a: "You can process up to 1000+ images in a single batch. Our parallel processing engine handles massive volumes efficiently." },
  { q: "Can I edit the generated metadata?", a: "Absolutely. All generated metadata is fully editable. You can tweak titles, descriptions, and keywords before exporting." },
  { q: "Is my data private?", a: "Yes. Your images are processed on secure servers and never stored. We use enterprise-grade encryption with zero data retention." },
];

const FAQSection = () => (
  <section className="relative py-28 overflow-hidden">
    {/* Ambient glow */}
    <motion.div
      className="pointer-events-none absolute right-0 top-1/3 w-[400px] h-[400px] rounded-full blur-[150px]"
      style={{ background: "hsl(var(--primary) / 0.04)" }}
      animate={{ x: [0, -30, 0] }}
      transition={{ duration: 12, repeat: Infinity }}
    />

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
          <Sparkles className="h-3.5 w-3.5" />
          FAQ
        </motion.span>
        <h2 className="text-4xl font-bold lg:text-6xl mb-5">
          Got{" "}
          <span className="gradient-text">Questions?</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Everything you need to know. Can't find an answer?{" "}
          <Link to="/contact" className="text-primary hover:underline transition-colors">Contact support</Link>.
        </p>
      </motion.div>

      <motion.div
        className="mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <AccordionItem
                value={`faq-${i}`}
                className="rounded-xl border border-glass-border bg-card/50 px-6 backdrop-blur-sm transition-all hover:border-primary/20 data-[state=open]:border-primary/30 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5"
              >
                <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-5 hover:text-primary transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-5 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQSection;
