import { Users, Key, UserCheck, DollarSign, AlertTriangle } from "lucide-react";

const stats = [
  { label: "Total Users", value: "247", icon: Users, color: "text-primary" },
  { label: "Active Licenses", value: "189", icon: Key, color: "text-success" },
  { label: "Trial Users", value: "58", icon: UserCheck, color: "text-secondary" },
  { label: "Total Revenue (PKR)", value: "₨384,500", icon: DollarSign, color: "text-primary" },
  { label: "Expiring Soon", value: "12", icon: AlertTriangle, color: "text-destructive" },
];

const recentActivity = [
  { email: "user1@gmail.com", action: "License Activated", date: "2026-04-07", status: "Success" },
  { email: "designer42@mail.com", action: "Trial Started", date: "2026-04-06", status: "Active" },
  { email: "stock.pro@yahoo.com", action: "License Expired", date: "2026-04-05", status: "Expired" },
  { email: "creator@outlook.com", action: "Payment Received", date: "2026-04-05", status: "Success" },
  { email: "photo.artist@gmail.com", action: "License Renewed", date: "2026-04-04", status: "Success" },
];

const DashboardTab = () => (
  <div className="space-y-8 animate-fade-in">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((s) => (
        <div key={s.label} className="glass-card p-5">
          <div className="flex items-center justify-between">
            <s.icon className={`h-5 w-5 ${s.color}`} />
          </div>
          <div className="mt-3 text-2xl font-bold">{s.value}</div>
          <div className="text-xs text-muted-foreground">{s.label}</div>
        </div>
      ))}
    </div>

    <div className="glass-card p-6">
      <h3 className="mb-4 font-semibold">Recent Activity</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-glass-border text-left text-muted-foreground">
              <th className="pb-3 font-medium">Email</th>
              <th className="pb-3 font-medium">Action</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentActivity.map((a, i) => (
              <tr key={i} className="border-b border-glass-border/50">
                <td className="py-3">{a.email}</td>
                <td className="py-3 text-muted-foreground">{a.action}</td>
                <td className="py-3 text-muted-foreground">{a.date}</td>
                <td className="py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    a.status === "Success" ? "bg-success/10 text-success" :
                    a.status === "Active" ? "bg-primary/10 text-primary" :
                    "bg-destructive/10 text-destructive"
                  }`}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default DashboardTab;
