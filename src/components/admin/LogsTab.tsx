import { useState } from "react";

const dummyLogs = [
  { time: "2026-04-07 14:30", email: "user1@gmail.com", action: "License Activated", status: "Success", details: "Key AM-PRO-X7K2-M9P1" },
  { time: "2026-04-07 12:15", email: "designer42@mail.com", action: "Login", status: "Success", details: "Windows 11" },
  { time: "2026-04-06 18:00", email: "stock.pro@yahoo.com", action: "License Check Failed", status: "Error", details: "Key expired" },
  { time: "2026-04-06 09:45", email: "creator@outlook.com", action: "Payment Received", status: "Success", details: "₨4,790 - Studio Plan" },
  { time: "2026-04-05 16:20", email: "photo.artist@gmail.com", action: "Trial Started", status: "Info", details: "30-day trial" },
  { time: "2026-04-05 11:00", email: "admin", action: "Admin Login", status: "Success", details: "Dashboard access" },
];

const LogsTab = () => {
  const [search, setSearch] = useState("");

  const filtered = dummyLogs.filter((l) =>
    l.email.toLowerCase().includes(search.toLowerCase()) ||
    l.action.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold">Activity Logs</h2>

      <div className="glass-card p-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-full max-w-xs rounded-xl border border-glass-border bg-muted/20 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          placeholder="Search logs..."
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-glass-border text-left text-muted-foreground">
                <th className="pb-3 font-medium">Timestamp</th>
                <th className="pb-3 font-medium">User</th>
                <th className="pb-3 font-medium">Action</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l, i) => (
                <tr key={i} className="border-b border-glass-border/50">
                  <td className="py-3 font-mono text-xs text-muted-foreground">{l.time}</td>
                  <td className="py-3">{l.email}</td>
                  <td className="py-3 text-muted-foreground">{l.action}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      l.status === "Success" ? "bg-success/10 text-success" :
                      l.status === "Error" ? "bg-destructive/10 text-destructive" :
                      "bg-primary/10 text-primary"
                    }`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="py-3 text-xs text-muted-foreground">{l.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LogsTab;
