import { Link } from "react-router-dom";
import { Download, Monitor, HardDrive, MemoryStick, Check, ExternalLink } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const requirements = [
  { icon: Monitor, label: "OS", value: "Windows 10 / 11 (64-bit)" },
  { icon: HardDrive, label: "Storage", value: "~200 MB disk space" },
  { icon: MemoryStick, label: "RAM", value: "4 GB minimum" },
];

const features = [
  "Works with free AI keys",
  "All features included",
  "No credit card needed",
  "30-day trial included",
];

const installSteps = [
  "Download the installer",
  "Run setup.exe",
  "Follow the installation wizard",
  "Launch the app",
  "Enter trial key (auto-generated)",
];

const faqs = [
  { q: "Do I need an internet connection?", a: "Cloud mode requires internet. Offline mode via Ollama works without internet (future feature)." },
  { q: "Can I use free AI keys?", a: "Yes, the app works with free Gemini and other free tier keys." },
  { q: "How many devices can I use one license on?", a: "One license = one device. Additional devices need separate licenses." },
];

const DownloadPage = () => (
  <div className="py-20">
    <div className="container mx-auto px-6">
      <div className="mb-16 text-center animate-slide-up">
        <h1 className="mb-3 text-4xl font-bold">Download <span className="gradient-text">AdobeMeta AI Pro</span></h1>
        <p className="text-lg text-muted-foreground">Windows 10/11 — Free Trial Included</p>
      </div>

      <div className="mx-auto max-w-3xl space-y-8">
        {/* System Requirements */}
        <div className="glass-card p-6">
          <h2 className="mb-4 text-lg font-semibold">System Requirements</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {requirements.map((r) => (
              <div key={r.label} className="flex items-center gap-3 rounded-xl bg-muted/20 p-4">
                <r.icon className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">{r.label}</div>
                  <div className="text-sm font-medium">{r.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download Section */}
        <div className="glass-card p-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl" style={{ background: "var(--gradient-subtle)" }}>
            <Download className="h-10 w-10 text-primary" />
          </div>
          <button className="gradient-btn mb-3 text-lg animate-glow">
            Download Now (v1.1.3)
          </button>
          <p className="text-sm text-muted-foreground">File size: ~180 MB</p>
          <a href="#" className="mt-3 inline-flex items-center gap-1 text-sm text-primary hover:underline">
            Get from Website <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Features */}
        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-3 rounded-xl border border-glass-border bg-muted/10 p-4">
              <Check className="h-5 w-5 shrink-0 text-success" />
              <span className="text-sm">{f}</span>
            </div>
          ))}
        </div>

        {/* Installation Steps */}
        <div className="glass-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Installation Steps</h2>
          <div className="space-y-3">
            {installSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ background: "var(--gradient-primary)" }}>
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="glass-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-glass-border">
                <AccordionTrigger className="text-sm hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  </div>
);

export default DownloadPage;
