import { Key, Brain, Layers, Settings } from "lucide-react";
import { ScrollReveal } from "@/hooks/use-scroll-animation";
import SEOHead from "@/components/SEOHead";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const sections = [
  {
    title: "Licensing",
    icon: Key,
    items: [
      { q: "What happens after the 30-day trial?", a: "After the trial, you'll need to purchase a license to continue using the app. All your data and settings are preserved." },
      { q: "How do I activate a license key?", a: "Go to Settings > License in the app, paste your license key and click Activate. It takes effect immediately." },
      { q: "Can I extend my license?", a: "Yes! Purchase a new plan before your current one expires. The remaining days will be added to your new subscription." },
      { q: "What is the refund policy?", a: "We offer refunds within 7 days of purchase if the software doesn't work on your system. Contact us via WhatsApp." },
    ],
  },
  {
    title: "AI & Metadata",
    icon: Brain,
    items: [
      { q: "Which AI providers are supported?", a: "Google Gemini, OpenAI GPT, Claude, and more. The app works with free-tier API keys." },
      { q: "How many keywords are generated?", a: "Up to 50 relevant keywords per asset, optimized for each platform's requirements." },
      { q: "What is a confidence score?", a: "A percentage indicating how relevant the AI thinks each keyword is to your asset. Higher scores mean better matches." },
      { q: "Can I edit generated metadata?", a: "Absolutely! You can edit titles, descriptions, keywords, and categories before exporting." },
    ],
  },
  {
    title: "Platforms",
    icon: Layers,
    items: [
      { q: "Which 9 platforms are supported?", a: "Vecteezy, 123RF, Freepik, Pond5, Depositphotos, Canva, iStock, Shutterstock, and Dreamstime." },
      { q: "Can I export for multiple platforms at once?", a: "Yes! Select multiple platforms and export separate CSV files for each in one click." },
      { q: "Is the metadata different per platform?", a: "Yes, each platform has unique requirements. Our AI tailors metadata format, keyword count, and categories per platform." },
    ],
  },
  {
    title: "Technical",
    icon: Settings,
    items: [
      { q: "What file formats are supported?", a: "JPEG, PNG, SVG, EPS, AI, PSD, MP4, MOV, and more. Most common stock file formats are supported." },
      { q: "Can I use offline mode?", a: "Offline mode via Ollama is a planned feature. Currently, cloud AI providers require internet." },
      { q: "Is my data secure?", a: "Yes. Files are processed locally. Only minimal data is sent to AI providers for analysis. No files are stored on external servers." },
    ],
  },
];

const FAQPage = () => (
  <div>
    <SEOHead
      title="FAQ — Frequently Asked Questions"
      description="Find answers about licensing, AI metadata generation, supported platforms, file formats, and technical requirements for eliteiq.tech."
      canonical="/faq"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": sections.flatMap(s => s.items.map(item => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": { "@type": "Answer", "text": item.a },
        }))),
      }}
    />
    {/* Hero */}
    <section className="relative pt-32 pb-16">
      <div className="absolute inset-0 opacity-15" style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(255 60% 64% / 0.2), transparent 60%)" }} />
      <div className="container relative mx-auto px-6">
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Support</span>
          <div className="h-px w-8 bg-primary" />
        </div>
        <h1 className="mb-4 text-center text-4xl font-bold leading-tight lg:text-6xl">
          <span className="text-foreground">Frequently Asked</span>
          <br />
          <span className="gradient-text">Questions</span>
        </h1>
        <p className="mx-auto max-w-md text-center text-muted-foreground">
          Everything you need to know about eliteiq.tech
        </p>
      </div>
    </section>

    {/* FAQ Sections */}
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          {sections.map((section, i) => (
            <ScrollReveal key={section.title} delay={i * 0.1}>
              <div className="glass-card p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-xl p-3" style={{ background: "var(--gradient-subtle)" }}>
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {section.items.map((item, j) => (
                    <AccordionItem key={j} value={`${section.title}-${j}`} className="border-glass-border">
                      <AccordionTrigger className="text-sm hover:no-underline text-left">{item.q}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default FAQPage;
