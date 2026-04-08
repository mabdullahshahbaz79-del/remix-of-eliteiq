import { useState } from "react";
import { MessageCircle, Mail, HelpCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { ScrollReveal } from "@/hooks/use-scroll-animation";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "general", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "general", message: "" });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 opacity-15" style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(174 100% 40% / 0.2), transparent 60%)" }} />
        <div className="container relative mx-auto px-6">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Contact</span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h1 className="mb-4 text-center text-4xl font-bold leading-tight lg:text-6xl">
            <span className="text-foreground">Get In</span>{" "}
            <span className="gradient-text">Touch</span>
          </h1>
          <p className="mx-auto max-w-md text-center text-muted-foreground">
            We're here to help you get started
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 grid gap-6 md:grid-cols-3">
              {[
                { href: "https://wa.me/923297090888", icon: MessageCircle, title: "WhatsApp", desc: "Quick response on WhatsApp", detail: "+92 329 7090888", external: true },
                { href: "mailto:salmangraphics839@gmail.com", icon: Mail, title: "Email", desc: "Email us for detailed queries", detail: "salmangraphics839@gmail.com", external: false },
                { href: "/faq", icon: HelpCircle, title: "Help Center", desc: "Need help with installation?", detail: "Visit FAQ →", external: false },
              ].map((card, i) => (
                <ScrollReveal key={card.title} delay={i * 0.1}>
                  <a
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    className="glass-card group block h-full p-8 text-center transition-all hover:border-primary/30"
                  >
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "var(--gradient-subtle)" }}>
                      <card.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">{card.title}</h3>
                    <p className="mb-3 text-sm text-muted-foreground">{card.desc}</p>
                    <span className="text-sm text-primary">{card.detail}</span>
                  </a>
                </ScrollReveal>
              ))}
            </div>

            {/* Contact Form */}
            <ScrollReveal delay={0.3}>
              <div className="glass-card mx-auto max-w-xl p-10">
                <div className="mb-8">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-px w-8 bg-primary" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">Message</span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Send a Message</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-1.5 block text-sm text-muted-foreground">Name *</label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-glass-border bg-muted/20 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm text-muted-foreground">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-glass-border bg-muted/20 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm text-muted-foreground">Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-xl border border-glass-border bg-muted/20 px-4 py-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing</option>
                      <option value="license">License Issue</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm text-muted-foreground">Message *</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className="w-full resize-none rounded-xl border border-glass-border bg-muted/20 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                      placeholder="How can we help?"
                    />
                  </div>
                  <button type="submit" className="gradient-btn flex w-full items-center justify-center gap-2 rounded-full">
                    <Send className="h-4 w-4" /> Send Message
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
