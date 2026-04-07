import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Key, Brain, Layers, Settings } from "lucide-react";

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
  <div className="py-20">
    <div className="container mx-auto px-6">
      <div className="mb-16 text-center animate-slide-up">
        <h1 className="mb-3 text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground">Everything you need to know about eliteiq.tech</p>
      </div>

      <div className="mx-auto max-w-3xl space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="glass-card p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl p-2.5" style={{ background: "var(--gradient-subtle)" }}>
                <section.icon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {section.items.map((item, i) => (
                <AccordionItem key={i} value={`${section.title}-${i}`} className="border-glass-border">
                  <AccordionTrigger className="text-sm hover:no-underline text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default FAQPage;
