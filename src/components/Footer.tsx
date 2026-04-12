import { Link } from "react-router-dom";
import { useState } from "react";
import { Mail, Github, Twitter, Linkedin, Youtube, Send, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <footer className="relative border-t border-glass-border">
      {/* Gradient glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 opacity-10" style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(var(--primary)), transparent 70%)" }} />

      <div className="container relative mx-auto px-6">
        {/* Newsletter */}
        <div className="py-12 border-b border-glass-border">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-bold text-foreground mb-1">Stay in the loop</h3>
              <p className="text-sm text-muted-foreground">Get product updates, tips, and exclusive deals straight to your inbox.</p>
            </div>
            <form onSubmit={handleNewsletter} className="flex w-full max-w-md gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-glass-border bg-muted/30 py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
              <button type="submit" className="gradient-btn flex items-center gap-2 !rounded-xl !px-6">
                Subscribe <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-xl" style={{ background: "var(--gradient-primary)" }} />
              <span className="text-lg font-bold gradient-text">eliteiq.tech</span>
            </div>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              AI-powered multi-platform stock metadata generator. Automate your workflow and dominate every platform.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
                { icon: Youtube, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg border border-glass-border bg-muted/20 text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:scale-110">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-foreground">Product</h4>
            <div className="flex flex-col gap-3">
              {[
                { to: "/pricing", label: "Pricing" },
                { to: "/download", label: "Download" },
                { to: "/faq", label: "FAQ" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-foreground">Support</h4>
            <div className="flex flex-col gap-3">
              {[
                { to: "/contact", label: "Contact Us" },
                { to: "/faq", label: "Help Center" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-foreground">Legal</h4>
            <div className="flex flex-col gap-3">
              {[
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms & Conditions" },
                { to: "/refund-policy", label: "Refund Policy" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-glass-border py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">© 2026 eliteiq.tech · All rights reserved</p>
          <p className="text-xs text-muted-foreground">Crafted with precision for stock content creators.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
