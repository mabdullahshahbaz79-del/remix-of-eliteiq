import { useState } from "react";
import { toast } from "sonner";

const dummyUsers = [
  { email: "user1@gmail.com", license: "AM-PRO-X7K2-M9P1", status: "Active", created: "2026-01-15" },
  { email: "designer42@mail.com", license: "AM-PRO-B3N8-Q5R2", status: "Active", created: "2025-12-01" },
  { email: "stock.pro@yahoo.com", license: "AM-PRO-F1D4-T8W6", status: "Blocked", created: "2025-10-10" },
  { email: "creator@outlook.com", license: "AM-PRO-H9J3-L2V5", status: "Active", created: "2026-03-01" },
];

const UserTab = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [search, setSearch] = useState("");

  const toggleBlock = (email: string) => {
    setUsers(users.map((u) =>
      u.email === email ? { ...u, status: u.status === "Blocked" ? "Active" : "Blocked" } : u
    ));
    toast.success("User status updated");
  };

  const filtered = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase()) || u.license.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold">User Management</h2>

      <div className="glass-card p-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-full max-w-xs rounded-xl border border-glass-border bg-muted/20 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          placeholder="Search users..."
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-glass-border text-left text-muted-foreground">
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">License Key</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Created</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.email} className="border-b border-glass-border/50">
                  <td className="py-3">{u.email}</td>
                  <td className="py-3 font-mono text-xs text-muted-foreground">{u.license}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${u.status === "Active" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 text-muted-foreground">{u.created}</td>
                  <td className="py-3">
                    <button onClick={() => toggleBlock(u.email)} className={`text-xs font-medium ${u.status === "Blocked" ? "text-success hover:underline" : "text-destructive hover:underline"}`}>
                      {u.status === "Blocked" ? "Unblock" : "Block"}
                    </button>
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

export default UserTab;
