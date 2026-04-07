import { useState } from "react";
import { Shield, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // NOTE: This is a demo. In production, use proper server-side auth via Lovable Cloud.
    setTimeout(() => {
      if (email === "mabdullahwork0@gmail.com" && password === "flower\\182!@#$") {
        sessionStorage.setItem("admin_session", "true");
        toast.success("Welcome back, Admin!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="glass-card w-full max-w-md p-8 animate-slide-up">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: "var(--gradient-subtle)" }}>
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">Access the admin dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-muted-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-glass-border bg-muted/20 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
              placeholder="mabdullahwork0@gmail.com"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-muted-foreground">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-glass-border bg-muted/20 px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                placeholder="•••••"
                required
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="gradient-btn w-full disabled:opacity-50">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
