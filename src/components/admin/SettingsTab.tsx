import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

const SettingsTab = () => {
  const [settings, setSettings] = useState({
    supportEmail: "support@eliteiq.tech",
    supportWhatsApp: "+92 329 7409088",
    jazzcashAccount: "0329 7409088",
    meezanBank: "50010112691566",
    skrill: "salmangraphics839@gmail.com",
    autoRenewal: true,
    trialDays: 30,
    maxDevicesDefault: 1,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 500));
    toast.success("Settings saved");
    setSaving(false);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="glass-card p-6 space-y-4">
        <h3 className="font-semibold">Support Settings</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Support Email</label>
            <input value={settings.supportEmail} onChange={e => setSettings({ ...settings, supportEmail: e.target.value })}
              className="w-full rounded-xl border border-glass-border bg-muted/20 px-3 py-2.5 text-sm text-foreground" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">WhatsApp Number</label>
            <input value={settings.supportWhatsApp} onChange={e => setSettings({ ...settings, supportWhatsApp: e.target.value })}
              className="w-full rounded-xl border border-glass-border bg-muted/20 px-3 py-2.5 text-sm text-foreground" />
          </div>
        </div>
      </div>

      <div className="glass-card p-6 space-y-4">
        <h3 className="font-semibold">Payment Accounts</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">JazzCash Account</label>
            <input value={settings.jazzcashAccount} onChange={e => setSettings({ ...settings, jazzcashAccount: e.target.value })}
              className="w-full rounded-xl border border-glass-border bg-muted/20 px-3 py-2.5 text-sm text-foreground" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Meezan Bank Account</label>
            <input value={settings.meezanBank} onChange={e => setSettings({ ...settings, meezanBank: e.target.value })}
              className="w-full rounded-xl border border-glass-border bg-muted/20 px-3 py-2.5 text-sm text-foreground" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Skrill Email</label>
            <input value={settings.skrill} onChange={e => setSettings({ ...settings, skrill: e.target.value })}
              className="w-full rounded-xl border border-glass-border bg-muted/20 px-3 py-2.5 text-sm text-foreground" />
          </div>
        </div>
      </div>

      <div className="glass-card p-6 space-y-4">
        <h3 className="font-semibold">License Defaults</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Trial Duration (days)</label>
            <input type="number" value={settings.trialDays} onChange={e => setSettings({ ...settings, trialDays: Number(e.target.value) })}
              className="w-full rounded-xl border border-glass-border bg-muted/20 px-3 py-2.5 text-sm text-foreground" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Default Max Devices</label>
            <select value={settings.maxDevicesDefault} onChange={e => setSettings({ ...settings, maxDevicesDefault: Number(e.target.value) })}
              className="w-full rounded-xl border border-glass-border bg-muted/20 px-3 py-2.5 text-sm text-foreground">
              <option value={1}>1 Device</option>
              <option value={2}>2 Devices</option>
              <option value={99}>Unlimited</option>
            </select>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={settings.autoRenewal} onChange={e => setSettings({ ...settings, autoRenewal: e.target.checked })}
            className="rounded border-glass-border" />
          Enable auto-renewal by default
        </label>
      </div>

      <button onClick={handleSave} disabled={saving} className="gradient-btn-sm flex items-center gap-1.5 disabled:opacity-50">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
};

export default SettingsTab;
