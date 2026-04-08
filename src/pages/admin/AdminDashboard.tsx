import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Key, Users, FileText, Bell, Settings, LogOut, Menu, X, Clock } from "lucide-react";
import { useAdmin } from "@/hooks/use-admin";
import DashboardTab from "@/components/admin/DashboardTab";
import LicenseTab from "@/components/admin/LicenseTab";
import UserTab from "@/components/admin/UserTab";
import LogsTab from "@/components/admin/LogsTab";
import NotificationsTab from "@/components/admin/NotificationsTab";
import SettingsTab from "@/components/admin/SettingsTab";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "licenses", label: "Licenses", icon: Key },
  { id: "users", label: "Users", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "logs", label: "Logs", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();
  const { isAdmin, loading, logout } = useAdmin();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading && !isAdmin) navigate("/abdullah-admin");
  }, [loading, isAdmin, navigate]);

  if (loading) return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );

  if (!isAdmin) return null;

  const handleLogout = async () => {
    await logout();
    navigate("/abdullah-admin");
  };

  return (
    <div className="flex min-h-[80vh]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-16"} transition-all duration-300 border-r border-glass-border bg-card/30 backdrop-blur-xl flex flex-col shrink-0`}>
        <div className="p-4 flex items-center justify-between border-b border-glass-border">
          {sidebarOpen && <span className="font-bold text-sm gradient-text">Elite IQ Admin</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-foreground p-1">
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.id ? "bg-primary/15 text-primary shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}>
              <tab.icon className="h-4 w-4 shrink-0" />
              {sidebarOpen && <span>{tab.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-2 border-t border-glass-border">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="border-b border-glass-border bg-card/30 backdrop-blur-xl px-6 py-3 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-lg font-bold">{tabs.find(t => t.id === activeTab)?.label}</h1>
            <p className="text-xs text-muted-foreground">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {time.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} · {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === "dashboard" && <DashboardTab />}
          {activeTab === "licenses" && <LicenseTab />}
          {activeTab === "users" && <UserTab />}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "logs" && <LogsTab />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
