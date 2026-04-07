import { useState } from "react";
import { Copy, Plus } from "lucide-react";
import { toast } from "sonner";

const generateKey = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const seg = (len: number) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `AM-PRO-${seg(4)}-${seg(4)}`;
};

const dummyLicenses = [
  { key: "AM-PRO-X7K2-M9P1", duration: "1 Year", created: "2026-01-15", expiry: "2027-01-15", status: "Active" },
  { key: "AM-PRO-B3N8-Q5R2", duration: "6 Months", created: "2025-12-01", expiry: "2026-06-01", status: "Active" },
  { key: "AM-PRO-F1D4-T8W6", duration: "3 Months", created: "2025-10-10", expiry: "2026-01-10", status: "Expired" },
  { key: "AM-PRO-H9J3-L2V5", duration: "1 Month", created: "2026-03-01", expiry: "2026-04-01", status: "Expired" },
];

const LicenseTab = () => {
  const [showGen, setShowGen] = useState(false);
  const [genKey, setGenKey] = useState("");
  const [duration, setDuration] = useState("1 Month");
  const [search, setSearch] = useState("");

  const handleGenerate = () => {
    const key = generateKey();
    setGenKey(key);
    toast.success("License key generated!");
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("Copied to clipboard!");
  };

  const filtered = dummyLicenses.filter((l) =>
    l.key.toLowerCase().includes(search.toLowerCase()) || l.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold">License Management</h2>
        <button onClick={() => setShowGen(!showGen)} className="gradient-btn-sm flex items-center gap-1.5">
          <Plus className="h-4 w-4" /> Generate New Key
        </button>
      </div>

      {showGen && (
        <div className="glass-card p-6">
          <h3 className="mb-4 font-semibold">Generate License Key</h3>
          <div className="flex flex-wrap gap-4">
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="rounded-xl border border-glass-border bg-muted/20 px-4 py-2.5 text-sm text-foreground focus:outline-none"
            >
              <option value="1 Month">1 Month</option>
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="1 Year">1 Year</option>
            </select>
            <button onClick={handleGenerate} className="gradient-btn-sm">Generate Key</button>
          </div>
          {genKey && (
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-muted/30 p-4">
              <code className="text-lg font-bold gradient-text">{genKey}</code>
              <button onClick={() => copyKey(genKey)} className="text-muted-foreground hover:text-foreground">
                <Copy className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}

      <div className="glass-card p-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-full max-w-xs rounded-xl border border-glass-border bg-muted/20 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          placeholder="Search licenses..."
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-glass-border text-left text-muted-foreground">
                <th className="pb-3 font-medium">License Key</th>
                <th className="pb-3 font-medium">Duration</th>
                <th className="pb-3 font-medium">Created</th>
                <th className="pb-3 font-medium">Expiry</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.key} className="border-b border-glass-border/50">
                  <td className="py-3 font-mono text-xs">{l.key}</td>
                  <td className="py-3 text-muted-foreground">{l.duration}</td>
                  <td className="py-3 text-muted-foreground">{l.created}</td>
                  <td className="py-3 text-muted-foreground">{l.expiry}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${l.status === "Active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <button onClick={() => copyKey(l.key)} className="text-xs text-primary hover:underline">Copy</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LicenseTab;
