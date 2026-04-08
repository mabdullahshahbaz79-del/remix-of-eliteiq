import { useState, useEffect } from "react";
import { Bell, Plus, Send, Trash2, Eye, Loader2, Info, AlertTriangle, CheckCircle, AlertOctagon, Sparkles, Wrench } from "lucide-react";
import { toast } from "sonner";
import { useAdmin } from "@/hooks/use-admin";

const ICON_MAP: Record<string, any> = {
  info: Info, warning: AlertTriangle, success: CheckCircle, error: AlertOctagon, feature: Sparkles, maintenance: Wrench,
};

const TEMPLATES = [
  { title: "Scheduled Maintenance", message: "Elite IQ will be down for maintenance. We apologize for the inconvenience.", icon_type: "maintenance", priority: "medium" },
  { title: "New Feature Available", message: "A new feature has been added to Elite IQ. Check it out!", icon_type: "feature", priority: "low" },
  { title: "License Expiring Soon", message: "Your license expires soon. Renew now to avoid interruption.", icon_type: "warning", priority: "high" },
  { title: "Security Alert", message: "We detected unusual activity on your account. Please review.", icon_type: "error", priority: "urgent" },
  { title: "Update Available", message: "A new version of Elite IQ is available. Update now for the latest features.", icon_type: "info", priority: "low" },
];

const NotificationsTab = () => {
  const { adminFetch } = useAdmin();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showComposer, setShowComposer] = useState(false);
  const [sending, setSending] = useState(false);

  const [form, setForm] = useState({
    title: "", message: "", icon_type: "info", priority: "low",
    target_type: "all", target_value: "", notification_type: "popup",
    button_text: "", button_url: "", is_draft: false,
  });

  const fetchNotifications = async () => {
    setLoading(true);
    try { setNotifications(await adminFetch("notifications")); } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchNotifications(); }, []);

  const handleSend = async (draft = false) => {
    if (!form.title || !form.message) { toast.error("Title and message are required"); return; }
    setSending(true);
    try {
      await adminFetch("notifications", "POST", { ...form, is_draft: draft, is_active: !draft });
      toast.success(draft ? "Saved as draft" : "Notification sent!");
      setShowComposer(false);
      setForm({ title: "", message: "", icon_type: "info", priority: "low", target_type: "all", target_value: "", notification_type: "popup", button_text: "", button_url: "", is_draft: false });
      fetchNotifications();
    } catch (e: any) { toast.error(e.message); }
    setSending(false);
  };

  const deleteNotification = async (id: string) => {
    try {
      await adminFetch("notifications", "DELETE", { ids: [id] });
      toast.success("Deleted");
      fetchNotifications();
    } catch (e: any) { toast.error(e.message); }
  };

  const applyTemplate = (t: any) => setForm({ ...form, ...t });

  const stats = {
    total: notifications.length,
    active: notifications.filter(n => n.is_active && !n.is_draft).length,
    drafts: notifications.filter(n => n.is_draft).length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Sent", value: stats.total, color: "text-primary" },
          { label: "Active", value: stats.active, color: "text-success" },
          { label: "Drafts", value: stats.drafts, color: "text-secondary" },
        ].map(s => (
          <div key={s.label} className="glass-card p-4">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={() => setShowComposer(!showComposer)} className="gradient-btn-sm flex items-center gap-1.5">
          <Plus className="h-4 w-4" /> Create Notification
        </button>
      </div>

      {/* Composer */}
      {showComposer && (
        <div className="glass-card p-6 space-y-4">
          <h3 className="font-semibold">Compose Notification</h3>

          {/* Templates */}
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Quick Templates</label>
            <div className="flex flex-wrap gap-2">
              {TEMPLATES.map((t, i) => (
                <button key={i} onClick={() => applyTemplate(t)}
                  className="rounded-lg border border-glass-border px-3 py-1.5 text-xs hover:bg-muted/30 transition-colors">
                  {t.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Title</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-xl border border-glass-border bg-muted/20 px-3 py-2.5 text-sm text-foreground" placeholder="Notification title" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Icon</label>
                <select value={form.icon_type} onChange={e => setForm({ ...form, icon_type: e.target.value })}
                  className="w-full rounded-xl border border-glass-border bg-muted/20 px-2 py-2.5 text-sm text-foreground">
                  {Object.keys(ICON_MAP).map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Priority</label>
                <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}
                  className="w-full rounded-xl border border-glass-border bg-muted/20 px-2 py-2.5 text-sm text-foreground">
                  <option value="low">Low</option><option value="medium">Medium</option>
                  <option value="high">High</option><option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Type</label>
                <select value={form.notification_type} onChange={e => setForm({ ...form, notification_type: e.target.value })}
                  className="w-full rounded-xl border border-glass-border bg-muted/20 px-2 py-2.5 text-sm text-foreground">
                  <option value="popup">Popup</option><option value="toast">Toast</option><option value="banner">Banner</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Message</label>
            <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={3}
              className="w-full rounded-xl border border-glass-border bg-muted/20 px-3 py-2 text-sm text-foreground" placeholder="Notification message..." />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Target Users</label>
              <select value={form.target_type} onChange={e => setForm({ ...form, target_type: e.target.value })}
                className="w-full rounded-xl border border-glass-border bg-muted/20 px-3 py-2.5 text-sm text-foreground">
                <option value="all">All Users</option>
                <option value="plan">Specific Plan</option>
                <option value="user">Specific User</option>
                <option value="blocked">Blocked Users</option>
              </select>
            </div>
            {(form.target_type === "plan" || form.target_type === "user") && (
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">
                  {form.target_type === "plan" ? "Plan Name" : "User Email"}
                </label>
                <input value={form.target_value} onChange={e => setForm({ ...form, target_value: e.target.value })}
                  className="w-full rounded-xl border border-glass-border bg-muted/20 px-3 py-2.5 text-sm text-foreground"
                  placeholder={form.target_type === "plan" ? "plus, pro, max" : "user@email.com"} />
              </div>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Button Text (optional)</label>
              <input value={form.button_text} onChange={e => setForm({ ...form, button_text: e.target.value })}
                className="w-full rounded-xl border border-glass-border bg-muted/20 px-3 py-2.5 text-sm text-foreground" placeholder="Learn More" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Button URL (optional)</label>
              <input value={form.button_url} onChange={e => setForm({ ...form, button_url: e.target.value })}
                className="w-full rounded-xl border border-glass-border bg-muted/20 px-3 py-2.5 text-sm text-foreground" placeholder="https://..." />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => handleSend(false)} disabled={sending} className="gradient-btn-sm flex items-center gap-1.5 disabled:opacity-50">
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Send Now
            </button>
            <button onClick={() => handleSend(true)} disabled={sending} className="glass-card px-4 py-2 text-sm hover:bg-muted/30">
              Save as Draft
            </button>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="glass-card p-6">
        <h3 className="font-semibold mb-4">Notification History</h3>
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
        ) : notifications.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">No notifications yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-glass-border text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Priority</th>
                  <th className="pb-3 font-medium">Target</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map(n => {
                  const IconComp = ICON_MAP[n.icon_type] || Info;
                  return (
                    <tr key={n.id} className="border-b border-glass-border/50 hover:bg-muted/10">
                      <td className="py-3 flex items-center gap-2">
                        <IconComp className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-xs">{n.title}</span>
                      </td>
                      <td className="py-3 text-xs text-muted-foreground capitalize">{n.notification_type}</td>
                      <td className="py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          n.priority === "urgent" ? "bg-destructive/10 text-destructive" :
                          n.priority === "high" ? "bg-destructive/10 text-destructive" :
                          n.priority === "medium" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
                        }`}>{n.priority}</span>
                      </td>
                      <td className="py-3 text-xs text-muted-foreground capitalize">{n.target_type}{n.target_value ? `: ${n.target_value}` : ""}</td>
                      <td className="py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          n.is_draft ? "bg-muted text-muted-foreground" : n.is_active ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                        }`}>{n.is_draft ? "Draft" : n.is_active ? "Active" : "Inactive"}</span>
                      </td>
                      <td className="py-3 text-xs text-muted-foreground">{new Date(n.created_at).toLocaleDateString()}</td>
                      <td className="py-3">
                        <button onClick={() => deleteNotification(n.id)} className="text-destructive hover:text-destructive/80">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsTab;
