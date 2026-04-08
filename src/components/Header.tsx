import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Pricing", path: "/pricing" },
  { label: "Download", path: "/download" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <nav className="flex items-center gap-1 rounded-full border border-glass-border px-2 py-2 backdrop-blur-2xl" style={{ background: "hsl(222 47% 13% / 0.8)" }}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 pl-3 pr-4">
          <div className="h-7 w-7 rounded-lg font-bold text-sm flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
            E.
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link to="/download" className="hidden md:inline-flex ml-2 rounded-full px-5 py-2 text-sm font-semibold transition-all hover:scale-105 border border-foreground/20 text-foreground hover:bg-foreground/10">
          Download Now
        </Link>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="text-foreground md:hidden px-3">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 left-4 right-4 rounded-2xl border border-glass-border p-4 backdrop-blur-2xl md:hidden" style={{ background: "hsl(222 47% 13% / 0.95)" }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link to="/download" onClick={() => setIsOpen(false)} className="mt-2 block rounded-full border border-foreground/20 px-5 py-2.5 text-center text-sm font-semibold text-foreground">
            Download Now
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
