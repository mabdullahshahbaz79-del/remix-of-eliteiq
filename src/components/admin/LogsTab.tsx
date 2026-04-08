import { useState, useEffect } from "react";
import { Search, Download, Loader2, Filter } from "lucide-react";
import { useAdmin } from "@/hooks/use-admin";

const LogsTab = () => {
  const { adminFetch } = useAdmin();
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    adminFetch("logs").then(setLogs).catch(console.error).finally(() => setLoading(false));
  }, []);

  const filtered = logs.filter(l => {
    if (filterType !== "all" && l.action_type !== filterType) return false;
    if (search && !(l.action || "").toLowerCase().includes(search.toLowerCase()) &&
        !(l.admin_email || "").toLowerCase().includes(search.toLowerCase()) &&
        !(l.target_email || "").toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const actionTypes = [...new Set(logs.map(l => l.action_type).filter(Boolean))];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card p-6">
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search logs..."
              className="w-full rounded-xl border border-glass-border bg-muted/20 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
          </div>
          {actionTypes.length > 0 && (
            <select value={filterType} onChange={e => setFilterType(e.target.value)}
              className="rounded-xl border border-glass-border bg-muted/20 px-3 py-2.5 text-sm text-foreground">
              <option value="all">All Types</option>
              {actionTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          )}
          <button onClick={() => {
            const csv = ["Timestamp,Admin,Action,Target,Status,IP\n", ...logs.map(l =>
              `${l.created_at},${l.admin_email || ""},${l.action},${l.target_email || ""},${l.status || ""},${l.ip_address || ""}\n`
            )].join("");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a"); a.href = url; a.download = "activity_logs.csv"; a.click();
          }} className="glass-card px-4 py-2 text-sm flex items-center gap-1.5 hover:bg-muted/30">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-glass-border text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Timestamp</th>
                  <th className="pb-3 font-medium">Admin</th>
                  <th className="pb-3 font-medium">Action</th>
                  <th className="pb-3 font-medium">Target</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">IP</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} className="py-12 text-center text-muted-foreground">No logs found</td></tr>
                ) : filtered.map((l, i) => (
                  <tr key={l.id || i} className="border-b border-glass-border/50 hover:bg-muted/10">
                    <td className="py-3 font-mono text-xs text-muted-foreground">{new Date(l.created_at).toLocaleString()}</td>
                    <td className="py-3 text-xs">{l.admin_email || "system"}</td>
                    <td className="py-3 text-xs">{l.action}</td>
                    <td className="py-3 text-xs text-muted-foreground">{l.target_email || l.target_license || "—"}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        l.status === "success" ? "bg-success/10 text-success" :
                        l.status === "failed" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                      }`}>{l.status || "info"}</span>
                    </td>
                    <td className="py-3 font-mono text-xs text-muted-foreground">{l.ip_address || "—"}</td>
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

export default LogsTab;
