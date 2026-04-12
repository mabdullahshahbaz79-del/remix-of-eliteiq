import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";

const COOKIE_KEY = "eliteiq_cookie_consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          className="fixed bottom-6 left-6 right-6 z-50 mx-auto max-w-lg rounded-2xl border border-glass-border bg-card/90 p-5 shadow-2xl backdrop-blur-xl"
        >
          <button onClick={decline} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15">
              <Cookie className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">We use cookies 🍪</h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                We use essential cookies to keep things running and analytics cookies to improve your experience.{" "}
                <Link to="/privacy" className="text-primary hover:underline">Learn more</Link>
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={accept}
                  className="rounded-lg px-4 py-2 text-xs font-semibold text-primary-foreground transition-all hover:opacity-90"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  Accept All
                </button>
                <button
                  onClick={decline}
                  className="rounded-lg border border-glass-border px-4 py-2 text-xs font-semibold text-muted-foreground transition-all hover:text-foreground hover:border-foreground/20"
                >
                  Essential Only
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
