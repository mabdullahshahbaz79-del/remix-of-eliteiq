import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-glass-border bg-card/50">
    <div className="container mx-auto px-6 py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-7 w-7 rounded-lg" style={{ background: "var(--gradient-primary)" }} />
            <span className="font-bold gradient-text">AdobeMeta AI Pro</span>
          </div>
          <p className="text-sm text-muted-foreground">AI-powered multi-platform stock metadata generator for professionals.</p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-foreground">Product</h4>
          <div className="flex flex-col gap-2">
            <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
            <Link to="/download" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Download</Link>
            <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-foreground">Support</h4>
          <div className="flex flex-col gap-2">
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            <Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Help Center</Link>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-foreground">Legal</h4>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">Privacy Policy</span>
            <span className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-glass-border pt-6 text-center text-sm text-muted-foreground">
        © 2026 AdobeMeta AI Pro · All rights reserved
      </div>
    </div>
  </footer>
);

export default Footer;
