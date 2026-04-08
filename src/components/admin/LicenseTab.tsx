import { useState, useEffect } from "react";
import { Copy, Plus, Trash2, Ban, RefreshCw, Download, Filter, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdmin } from "@/hooks/use-admin";

const PLANS = [
  { id: "free", label: "Free", prefix: "ELITE-FREE", price: 0, duration: "30 days" },
  { id: "plus", label: "Plus", prefix: "ELITE-PLUS", price: 499, duration: "1 month" },
  { id: "pro", label: "Pro", prefix: "ELITE-PRO", price: 1347, duration: "3 months" },
  { id: "max", label: "Max", prefix: "ELITE-MAX", price: 4790, duration: "1 year" },
];

const LicenseTab = () => {
  const { adminFetch } = useAdmin();
  const [licenses, setLicenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [showGen, setShowGen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPlan, setFilterPlan] = useState("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Generate form
  const [plan, setPlan] = useState("plus");
  const [quantity, setQuantity] = useState(1);
  const [maxDevices, setMaxDevices] = useState(1);

  const fetchLicenses = async () => {
    setLoading(true);
    try {
      const data = await adminFetch("licenses");
      setLicenses(data);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchLicenses(); }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const planInfo = PLANS.find(p => p.id === plan)!;
      const expiresAt = new Date();
      if (plan === "free") expiresAt.setDate(expiresAt.getDate() + 30);
      else if (plan === "plus") expiresAt.setMonth(expiresAt.getMonth() + 1);
      else if (plan === "pro") expiresAt.setMonth(expiresAt.getMonth() + 3);
      else expiresAt.setFullYear(expiresAt.getFullYear() + 1);

      const data = await adminFetch("licenses", "POST", {
        plan, quantity, max_activations: maxDevices,
        price_pkr: planInfo.price, duration: planInfo.duration,
        expires_at: expiresAt.toISOString(),
      });
      toast.success(`${data.length} license key(s) generated!`);
      await fetchLicenses();
    } catch (e: any) { toast.error(e.message); }
    setGenerating(false);
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("Copied to clipboard!");
  };

  const revokeKeys = async (ids: string[]) => {
    for (const id of ids) {
      await adminFetch("licenses", "PATCH", { id, status: "revoked" });
    }
    toast.success("License(s) revoked");
    setSelected(new Set());
    fetchLicenses();
  };

  const deleteKeys = async (ids: string[]) => {
    await adminFetch("licenses", "DELETE", { ids });
    toast.success("License(s) deleted");
    setSelected(new Set());
    fetchLicenses();
  };

  const filtered = licenses.filter(l => {
    if (filterStatus !== "all" && l.status !== filterStatus) return false;
    if (filterPlan !== "all" && l.plan !== filterPlan) return false;
    if (search && !l.license_key.toLowerCase().includes(search.toLowerCase()) &&
        !(l.used_by_email || "").toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    const s = new Set(selected);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelected(s);
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(l => l.id)));
  };

  const stats = {
    total: licenses.length,
    active: licenses.filter(l => l.status === "active").length,
    expired: licenses.filter(l => l.status === "expired").length,
    used: licenses.filter(l => l.used_by_email).length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Keys", value: stats.total, color: "text-primary" },
          { label: "Active", value: stats.active, color: "text-success" },
          { label: "Expired", value: stats.expired, color: "text-destructive" },
          { label: "Used", value: stats.used, color: "text-secondary" },
        ].map(s => (
          <div key={s.label} className="glass-card p-4">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button onClick={() => setShowGen(!showGen)} className="gradient-btn-sm flex items-center gap-1.5">
          <Plus className="h-4 w-4" /> Generate Keys
        </button>
        <button onClick={fetchLicenses} className="glass-card px-4 py-2 text-sm flex items-center gap-1.5 hover:bg-muted/30">
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </button>
        {selected.size > 0 && (
          <>
            <button onClick={() => revokeKeys(Array.from(selected))} className="px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-xl flex items-center gap-1.5">
              <Ban className="h-3.5 w-3.5" /> Revoke ({selected.size})
            </button>
            <button onClick={() => deleteKeys(Array.from(selected))} className="px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-xl flex items-center gap-1.5">
              <Trash2 className="h-3.5 w-3.5" /> Delete ({selected.size})
            </button>
          </>
        )}
      </div>

      {/* Generate Form */}
      {showGen && (
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-semibold">Generate License Keys</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Plan</label>
              <select value={plan} onChange={e => setPlan(e.target.value)}
                className="w-full rounded-xl border border-glass-border bg-muted/20 px-3 py-2.5 text-sm text-foreground">
                {PLANS.map(p => <option key={p.id} value={p.id}>{p.label} - ₨{p.price}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Quantity (1-100)</label>
              <input type="number" min={1} max={100} value={quantity} onChange={e => setQuantity(Number(e.target.value))}
                className="w-full rounded-xl border border-glass-border bg-muted/20 px-3 py-2.5 text-sm text-foreground" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Max Devices</label>
              <select value={maxDevices} onChange={e => setMaxDevices(Number(e.target.value))}
                className="w-full rounded-xl border border-glass-border bg-muted/20 px-3 py-2.5 text-sm text-foreground">
                <option value={1}>1 Device</option>
                <option value={2}>2 Devices</option>
                <option value={99}>Unlimited</option>
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={handleGenerate} disabled={generating} className="gradient-btn-sm w-full flex items-center justify-center gap-1.5 disabled:opacity-50">
                {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                {generating ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters & Table */}
      <div className="glass-card p-6">
        <div className="flex flex-wrap gap-3 mb-4">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search keys or emails..."
            className="flex-1 min-w-[200px] rounded-xl border border-glass-border bg-muted/20 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="rounded-xl border border-glass-border bg-muted/20 px-3 py-2.5 text-sm text-foreground">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="revoked">Revoked</option>
          </select>
          <select value={filterPlan} onChange={e => setFilterPlan(e.target.value)}
            className="rounded-xl border border-glass-border bg-muted/20 px-3 py-2.5 text-sm text-foreground">
            <option value="all">All Plans</option>
            {PLANS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-glass-border text-left text-muted-foreground">
                  <th className="pb-3 font-medium"><input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll} /></th>
                  <th className="pb-3 font-medium">License Key</th>
                  <th className="pb-3 font-medium">Plan</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Duration</th>
                  <th className="pb-3 font-medium">Expiry</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Used By</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={9} className="py-12 text-center text-muted-foreground">No licenses found</td></tr>
                ) : filtered.map(l => (
                  <tr key={l.id} className="border-b border-glass-border/50 hover:bg-muted/10">
                    <td className="py-3"><input type="checkbox" checked={selected.has(l.id)} onChange={() => toggleSelect(l.id)} /></td>
                    <td className="py-3 font-mono text-xs">{l.license_key}</td>
                    <td className="py-3"><span className="rounded-full px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary capitalize">{l.plan}</span></td>
                    <td className="py-3 text-muted-foreground">₨{l.price_pkr || 0}</td>
                    <td className="py-3 text-muted-foreground text-xs">{l.duration || "-"}</td>
                    <td className="py-3 text-muted-foreground text-xs">{l.expires_at ? new Date(l.expires_at).toLocaleDateString() : "-"}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        l.status === "active" ? "bg-success/10 text-success" :
                        l.status === "revoked" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
                      }`}>{l.status}</span>
                    </td>
                    <td className="py-3 text-xs text-muted-foreground">{l.used_by_email || "Unused"}</td>
                    <td className="py-3 flex gap-2">
                      <button onClick={() => copyKey(l.license_key)} className="text-primary hover:text-primary/80"><Copy className="h-3.5 w-3.5" /></button>
                      <button onClick={() => revokeKeys([l.id])} className="text-destructive hover:text-destructive/80"><Ban className="h-3.5 w-3.5" /></button>
                      <button onClick={() => deleteKeys([l.id])} className="text-destructive hover:text-destructive/80"><Trash2 className="h-3.5 w-3.5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LicenseTab;
