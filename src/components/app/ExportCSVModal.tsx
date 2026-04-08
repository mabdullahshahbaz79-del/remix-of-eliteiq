import { X, Download, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAppContext } from './AppContext';
import { toast } from 'sonner';
import { useState } from 'react';

interface PlatformExport {
  name: string;
  description: string;
  badge: string;
  badgeColor: string;
  extraBadge?: string;
  toggle?: { label: string; key: string };
  licenseToggle?: boolean;
}

const platforms: PlatformExport[] = [
  { name: 'Adobe Stock', description: 'Full title · comma-stripped · keywords', badge: 'CSV', badgeColor: 'bg-red-500/80' },
  { name: 'Shutterstock', description: 'Column order enforced · dual categories · editorial flag', badge: 'CSV', badgeColor: 'bg-red-500/80' },
  { name: 'Dreamstime', description: 'Image Name · full description · category', badge: 'CSV', badgeColor: 'bg-purple-500/80' },
  { name: '123RF', description: 'Numeric categories · editorial flag', badge: 'CSV', badgeColor: 'bg-blue-500/80' },
  { name: 'Vecteezy', description: 'Filename · title · description · keywords · license', badge: 'CSV', badgeColor: 'bg-orange-500/80', extraBadge: 'Free', licenseToggle: true },
  { name: 'Freepik', description: 'Title · description · tags · recreation prompt · category', badge: 'CSV', badgeColor: 'bg-cyan-500/80', toggle: { label: 'AI-generated content', key: 'freepik-ai' } },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

const ExportCSVModal = ({ open, onClose }: Props) => {
  const { assets } = useAppContext();
  const [toggles, setToggles] = useState<Record<string, boolean>>({});
  const [licenses, setLicenses] = useState<Record<string, 'Free' | 'Pro'>>({});

  if (!open) return null;

  const withMeta = assets.filter(a => a.metadata);

  const handleExport = (platformName: string) => {
    if (!withMeta.length) {
      toast.error('No metadata to export');
      return;
    }

    const header = 'Filename,Title,Description,Keywords\n';
    const csv = header + withMeta.map(a => {
      const m = a.metadata!;
      return `"${a.name}","${m.title}","${m.description}","${m.keywords.join(', ')}"`;
    }).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${platformName.toLowerCase().replace(/\s+/g, '-')}-metadata.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success(`${platformName} CSV exported`);
  };

  const handleExportAll = () => {
    platforms.forEach(p => handleExport(p.name));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-[#0F172A] border border-white/10 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-cyan-400" />
            <div>
              <h2 className="text-base font-semibold text-white">Export CSV</h2>
              <p className="text-xs text-white/40">Export metadata for {withMeta.length} asset{withMeta.length !== 1 ? 's' : ''} to stock platforms.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Platform list */}
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {platforms.map(p => (
            <div key={p.name} className="rounded-xl bg-white/[0.03] border border-white/10 p-4 hover:border-white/20 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-white">{p.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${p.badgeColor} text-white font-bold`}>CSV</span>
                    {p.extraBadge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/80 text-white font-bold">{p.extraBadge}</span>
                    )}
                  </div>
                  <p className="text-[11px] text-white/40">{p.description}</p>
                </div>
                <button
                  onClick={() => handleExport(p.name)}
                  className="p-2 rounded-lg text-white/30 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>

              {/* License toggle for Vecteezy */}
              {p.licenseToggle && (
                <div className="flex items-center gap-3 mt-3 pt-2 border-t border-white/5">
                  <span className="text-[11px] text-white/40">License:</span>
                  <div className="flex rounded-lg overflow-hidden border border-white/10">
                    <button
                      className={`text-[11px] px-3 py-1 ${(licenses[p.name] || 'Free') === 'Free' ? 'bg-emerald-500/80 text-white' : 'text-white/40'}`}
                      onClick={() => setLicenses(prev => ({ ...prev, [p.name]: 'Free' }))}
                    >Free</button>
                    <button
                      className={`text-[11px] px-3 py-1 ${licenses[p.name] === 'Pro' ? 'bg-purple-500/80 text-white' : 'text-white/40'}`}
                      onClick={() => setLicenses(prev => ({ ...prev, [p.name]: 'Pro' }))}
                    >Pro</button>
                  </div>
                  <span className="text-[10px] text-white/30 ml-auto">Toggle then click download</span>
                </div>
              )}

              {/* Toggle for Freepik */}
              {p.toggle && (
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                  <span className="text-[11px] text-white/50">{p.toggle.label}</span>
                  <Switch
                    checked={!!toggles[p.toggle.key]}
                    onCheckedChange={v => setToggles(prev => ({ ...prev, [p.toggle!.key]: v }))}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Export All */}
        <div className="p-4 border-t border-white/10">
          <Button
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white gap-2"
            onClick={handleExportAll}
          >
            <Download className="h-4 w-4" />
            Export All Platforms
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportCSVModal;
