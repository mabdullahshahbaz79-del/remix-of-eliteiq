import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Download } from "lucide-react";

const navItems = [
  { label: "Features", path: "/#features" },
  { label: "Pricing", path: "/pricing" },
  { label: "Download", path: "/download" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-glass-border backdrop-blur-xl" style={{ background: "hsl(222 47% 11% / 0.85)" }}>
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <span className="text-xl font-bold text-foreground">
            elite<span className="text-secondary">iq</span>
          </span>
          <span className="rounded-md border border-secondary/40 bg-secondary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary">PRO</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link to="/download" className="hidden md:inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-secondary/20" style={{ background: "var(--gradient-primary)" }}>
          <Download className="h-4 w-4" /> Download
        </Link>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-foreground md:hidden">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-glass-border px-6 pb-6 pt-4 md:hidden" style={{ background: "hsl(222 47% 11% / 0.98)" }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link to="/download" onClick={() => setIsOpen(false)} className="mt-3 flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-foreground" style={{ background: "var(--gradient-primary)" }}>
            <Download className="h-4 w-4" /> Download
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
