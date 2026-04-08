import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Key, Users, FileText, Settings, LogOut } from "lucide-react";
import DashboardTab from "@/components/admin/DashboardTab";
import LicenseTab from "@/components/admin/LicenseTab";
import UserTab from "@/components/admin/UserTab";
import LogsTab from "@/components/admin/LogsTab";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "licenses", label: "Licenses", icon: Key },
  { id: "users", label: "Users", icon: Users },
  { id: "logs", label: "Logs", icon: FileText },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("admin_session");
    navigate("/abdullah-admin");
  };

  // Simple session check
  if (!sessionStorage.getItem("admin_session")) {
    navigate("/abdullah-admin");
    return null;
  }

  return (
    <div className="min-h-[80vh]">
      {/* Admin Nav */}
      <div className="border-b border-glass-border bg-card/50">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" /> {tab.label}
              </button>
            ))}
          </div>
          <button onClick={handleLogout} className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "licenses" && <LicenseTab />}
        {activeTab === "users" && <UserTab />}
        {activeTab === "logs" && <LogsTab />}
      </div>
    </div>
  );
};

export default AdminDashboard;
