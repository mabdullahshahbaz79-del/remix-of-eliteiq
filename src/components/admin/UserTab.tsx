import { useState, useEffect } from "react";
import { Search, Loader2, Eye, Ban, Shield, Trash2, Download } from "lucide-react";
import { toast } from "sonner";
import { useAdmin } from "@/hooks/use-admin";

const UserTab = () => {
  const { adminFetch } = useAdmin();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try { setUsers(await adminFetch("users")); } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const updateUser = async (id: string, updates: any) => {
    try {
      await adminFetch("users", "PATCH", { id, ...updates });
      toast.success("User updated");
      fetchUsers();
      setSelectedUser(null);
    } catch (e: any) { toast.error(e.message); }
  };

  const filtered = users.filter(u => {
    if (filterStatus !== "all" && u.status !== filterStatus) return false;
    if (search && !(u.email || "").toLowerCase().includes(search.toLowerCase()) &&
        !(u.full_name || "").toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === "active").length,
    blocked: users.filter(u => u.status === "blocked").length,
    trial: users.filter(u => u.status === "trial").length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Users", value: stats.total, color: "text-primary" },
          { label: "Active", value: stats.active, color: "text-success" },
          { label: "Blocked", value: stats.blocked, color: "text-destructive" },
          { label: "Trial", value: stats.trial, color: "text-secondary" },
        ].map(s => (
          <div key={s.label} className="glass-card p-4">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card p-6">
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by email or name..."
              className="w-full rounded-xl border border-glass-border bg-muted/20 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            className="rounded-xl border border-glass-border bg-muted/20 px-3 py-2.5 text-sm text-foreground">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
            <option value="trial">Trial</option>
          </select>
          <button onClick={() => {
            const csv = ["Email,Name,Status,Created\n", ...users.map(u => `${u.email},${u.full_name || ""},${u.status},${u.created_at}\n`)].join("");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a"); a.href = url; a.download = "users.csv"; a.click();
          }} className="glass-card px-4 py-2 text-sm flex items-center gap-1.5 hover:bg-muted/30">
            <Download className="h-3.5 w-3.5" /> Export CSV
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-glass-border text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Email</th>
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Files</th>
                  <th className="pb-3 font-medium">Joined</th>
                  <th className="pb-3 font-medium">Last Active</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="py-12 text-center text-muted-foreground">No users found</td></tr>
                ) : filtered.map(u => (
                  <tr key={u.id} className="border-b border-glass-border/50 hover:bg-muted/10">
                    <td className="py-3 text-xs">{u.email || "—"}</td>
                    <td className="py-3 text-muted-foreground text-xs">{u.full_name || "—"}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        u.status === "active" ? "bg-success/10 text-success" :
                        u.status === "blocked" ? "bg-destructive/10 text-destructive" :
                        u.status === "trial" ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"
                      }`}>{u.status || "active"}</span>
                    </td>
                    <td className="py-3 text-muted-foreground text-xs">{u.files_processed || 0}</td>
                    <td className="py-3 text-muted-foreground text-xs">{new Date(u.created_at).toLocaleDateString()}</td>
                    <td className="py-3 text-muted-foreground text-xs">{u.last_activity ? new Date(u.last_activity).toLocaleDateString() : "—"}</td>
                    <td className="py-3 flex gap-2">
                      <button onClick={() => setSelectedUser(u)} className="text-primary hover:text-primary/80"><Eye className="h-3.5 w-3.5" /></button>
                      <button onClick={() => updateUser(u.id, { status: u.status === "blocked" ? "active" : "blocked" })}
                        className={u.status === "blocked" ? "text-success" : "text-destructive"}>
                        {u.status === "blocked" ? <Shield className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => setSelectedUser(null)}>
          <div className="glass-card w-full max-w-lg p-6 m-4 space-y-4 animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">User Details</h3>
              <button onClick={() => setSelectedUser(null)} className="text-muted-foreground hover:text-foreground text-lg">×</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                ["Email", selectedUser.email],
                ["Name", selectedUser.full_name || "—"],
                ["Status", selectedUser.status || "active"],
                ["Device", selectedUser.device_info || "—"],
                ["IP Address", selectedUser.ip_address || "—"],
                ["Files Processed", selectedUser.files_processed || 0],
                ["Joined", new Date(selectedUser.created_at).toLocaleDateString()],
                ["Last Active", selectedUser.last_activity ? new Date(selectedUser.last_activity).toLocaleDateString() : "—"],
              ].map(([label, value]) => (
                <div key={label as string}>
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className="font-medium">{value as any}</div>
                </div>
              ))}
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Admin Notes</label>
              <textarea defaultValue={selectedUser.admin_notes || ""} rows={3}
                onBlur={e => updateUser(selectedUser.id, { admin_notes: e.target.value })}
                className="w-full rounded-xl border border-glass-border bg-muted/20 px-3 py-2 text-sm text-foreground" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTab;
