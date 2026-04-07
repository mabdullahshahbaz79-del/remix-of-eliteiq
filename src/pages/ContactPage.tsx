import { useState } from "react";
import { MessageCircle, Mail, HelpCircle, Send } from "lucide-react";
import { toast } from "sonner";

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
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center animate-slide-up">
          <h1 className="mb-3 text-4xl font-bold">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">We're here to help you get started</p>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Contact Cards */}
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <a href="https://wa.me/923297090888" target="_blank" rel="noopener noreferrer" className="glass-card group p-6 text-center transition-all hover:scale-105 hover:border-primary/30">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "var(--gradient-subtle)" }}>
                <MessageCircle className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">WhatsApp</h3>
              <p className="mb-3 text-sm text-muted-foreground">Quick response on WhatsApp</p>
              <span className="text-sm text-primary">+92 329 7090888</span>
            </a>

            <a href="mailto:salmangraphics839@gmail.com" className="glass-card group p-6 text-center transition-all hover:scale-105 hover:border-primary/30">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "var(--gradient-subtle)" }}>
                <Mail className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Email</h3>
              <p className="mb-3 text-sm text-muted-foreground">Email us for detailed queries</p>
              <span className="text-sm text-primary">salmangraphics839@gmail.com</span>
            </a>

            <a href="/faq" className="glass-card group p-6 text-center transition-all hover:scale-105 hover:border-primary/30">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "var(--gradient-subtle)" }}>
                <HelpCircle className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">Help Center</h3>
              <p className="mb-3 text-sm text-muted-foreground">Need help with installation?</p>
              <span className="text-sm text-primary">Visit FAQ →</span>
            </a>
          </div>

          {/* Contact Form */}
          <div className="glass-card mx-auto max-w-xl p-8">
            <h2 className="mb-6 text-xl font-semibold">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <button type="submit" className="gradient-btn flex w-full items-center justify-center gap-2">
                <Send className="h-4 w-4" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
