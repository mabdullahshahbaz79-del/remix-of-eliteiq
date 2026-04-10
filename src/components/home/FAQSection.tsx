import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const faqs = [
  { q: "What is Elite IQ?", a: "Elite IQ is an AI-powered metadata generator built specifically for stock photographers and contributors. It automatically generates optimized titles, descriptions, and keywords for your images — formatted perfectly for all major stock platforms." },
  { q: "Does it work with Adobe Stock and Shutterstock?", a: "Yes! Elite IQ supports 15+ platforms including Adobe Stock, Shutterstock, Freepik, iStock, Getty Images, Alamy, 123RF, Pond5, Vecteezy, Dreamstime, Depositphotos, and more." },
  { q: "Do I need my own API keys?", a: "No. Elite IQ comes with built-in AI — no external API keys required. Just upload your images and get instant metadata." },
  { q: "How many images can I process at once?", a: "You can process up to 1000+ images in a single batch. Our parallel processing engine handles massive volumes efficiently." },
  { q: "Can I edit the generated metadata?", a: "Absolutely. All generated metadata is fully editable. You can tweak titles, descriptions, and keywords before exporting." },
  { q: "Is my data private?", a: "Yes. Your images are processed on secure servers and never stored. We use enterprise-grade encryption with zero data retention." },
];

const FAQSection = () => (
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
          FAQ
        </span>
        <h2 className="text-4xl font-bold lg:text-5xl mb-4">
          Got{" "}
          <span className="gradient-text">Questions?</span>
        </h2>
        <p className="text-muted-foreground">
          Everything you need to know. Can't find an answer?{" "}
          <Link to="/contact" className="text-primary hover:underline">Contact support</Link>.
        </p>
      </motion.div>

      <motion.div
        className="mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border border-glass-border bg-card/50 px-6 backdrop-blur-sm"
            >
              <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQSection;
