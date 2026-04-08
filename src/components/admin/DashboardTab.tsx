import { useState, useEffect } from "react";
import { Users, Key, DollarSign, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { useAdmin } from "@/hooks/use-admin";
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";

const COLORS = ["hsl(255,60%,64%)", "hsl(174,100%,40%)", "hsl(155,70%,41%)", "hsl(45,100%,60%)"];

const DashboardTab = () => {
  const { adminFetch } = useAdmin();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch("stats").then(setStats).catch(console.error).finally(() => setLoading(false));
  }, [adminFetch]);

  if (loading) return <div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;

  const s = stats || {};
  const breakdown = s.licenseBreakdown || {};

  const statCards = [
    { label: "Total Users", value: s.totalUsers || 0, icon: Users, color: "text-primary", change: "+12%" },
    { label: "Active Licenses", value: s.activeLicenses || 0, icon: Key, color: "text-success", sub: `${s.expiringSoon || 0} expiring soon` },
    { label: "Revenue (PKR)", value: `₨${(s.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, color: "text-primary", change: "+8%" },
    { label: "Expiring Soon", value: s.expiringSoon || 0, icon: AlertTriangle, color: "text-destructive" },
  ];

  const pieData = Object.entries(breakdown).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));
  const revenueData = [
    { month: "Nov", amount: 42000 }, { month: "Dec", amount: 58000 }, { month: "Jan", amount: 67000 },
    { month: "Feb", amount: 74000 }, { month: "Mar", amount: 85000 }, { month: "Apr", amount: s.totalRevenue || 0 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div key={card.label} className="glass-card p-5 hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <card.icon className={`h-5 w-5 ${card.color}`} />
              {card.change && (
                <span className="flex items-center gap-1 text-xs text-success">
                  <TrendingUp className="h-3 w-3" /> {card.change}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold">{card.value}</div>
            <div className="text-xs text-muted-foreground">{card.label}</div>
            {card.sub && <div className="text-xs text-destructive mt-1">{card.sub}</div>}
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">Revenue Trend (PKR)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueData}>
              <XAxis dataKey="month" stroke="hsl(215,20%,50%)" fontSize={12} />
              <YAxis stroke="hsl(215,20%,50%)" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(222,47%,13%)", border: "1px solid hsl(0,0%,100%,0.1)", borderRadius: 12, color: "#fff" }} />
              <Line type="monotone" dataKey="amount" stroke="url(#gradient)" strokeWidth={2.5} dot={{ fill: "hsl(255,60%,64%)", r: 4 }} />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(255,60%,64%)" />
                  <stop offset="100%" stopColor="hsl(174,100%,40%)" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* License Distribution */}
        <div className="glass-card p-6">
          <h3 className="font-semibold mb-4">License Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(222,47%,13%)", border: "1px solid hsl(0,0%,100%,0.1)", borderRadius: 12, color: "#fff" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        {(s.recentActivity || []).length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">No recent activity</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-glass-border text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Action</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {(s.recentActivity || []).slice(0, 8).map((a: any, i: number) => (
                  <tr key={i} className="border-b border-glass-border/50">
                    <td className="py-3">{a.action}</td>
                    <td className="py-3 text-muted-foreground text-xs">{new Date(a.created_at).toLocaleDateString()}</td>
                    <td className="py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        a.status === "success" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                      }`}>{a.status || "info"}</span>
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

export default DashboardTab;
