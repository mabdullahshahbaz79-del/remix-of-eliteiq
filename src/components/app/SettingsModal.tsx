import { X, Settings, Wifi, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useAppContext } from './AppContext';
import { useState } from 'react';
import KeyboardShortcutsPanel from './KeyboardShortcutsPanel';
import { ShortcutBinding } from '@/hooks/use-keyboard-shortcuts';

interface Props {
  shortcuts: ShortcutBinding[];
  onUpdateShortcut: (id: string, newKeys: string) => void;
  onResetShortcuts: () => void;
}

const SettingsModal = ({ shortcuts, onUpdateShortcut, onResetShortcuts }: Props) => {
  const { settings, setSettings, showSettings, setShowSettings } = useAppContext();
  const [negKeyword, setNegKeyword] = useState('');

  if (!showSettings) return null;

  const update = (path: string, value: any) => {
    setSettings(prev => {
      const next = { ...prev };
      const parts = path.split('.');
      let obj: any = next;
      for (let i = 0; i < parts.length - 1; i++) {
        obj[parts[i]] = { ...obj[parts[i]] };
        obj = obj[parts[i]];
      }
      obj[parts[parts.length - 1]] = value;
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl max-h-[85vh] rounded-2xl bg-[#0F172A] border border-white/10 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-cyan-400" />
            <h2 className="text-base font-semibold text-white">Settings & Configuration</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-cyan-400">⚡ General</span>
              <span className="text-[11px] text-white/30">🤖 Ollama (Offline)</span>
            </div>
            <button onClick={() => setShowSettings(false)} className="text-white/40 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-5 space-y-6">
          <section>
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">AI Mode</h3>
            <div className="grid grid-cols-3 gap-2">
              {(['auto', 'cloud', 'offline'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => update('aiMode', mode)}
                  className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                    settings.aiMode === mode
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white'
                      : 'bg-white/5 text-white/50 hover:bg-white/10'
                  }`}
                >
                  {mode === 'auto' ? '⚡ Auto' : mode === 'cloud' ? '☁️ API Only' : '🤖 Offline'}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-white/30 mt-2">Uses cloud API keys only. Will error if all keys are exhausted → no Ollama fallback.</p>
          </section>

          <section>
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">API Keys</h3>
            <div className="flex items-center gap-2 mb-3">
              <select className="h-9 rounded-lg bg-white/5 border border-white/10 text-white/70 text-xs px-3 flex-1">
                <option>✦ Auto (recommended)</option>
              </select>
              <Input placeholder="Paste API key (provider auto-detected)..." className="h-9 text-xs bg-white/5 border-white/10 text-white flex-1" />
              <Button size="sm" className="h-9 bg-emerald-600 hover:bg-emerald-500 text-white text-xs gap-1">
                <Plus className="h-3 w-3" /> Add
              </Button>
              <Button size="sm" variant="ghost" className="h-9 text-xs text-white/50">📄 Import .txt</Button>
            </div>
            <p className="text-[10px] text-white/30 mb-3">Provider is auto-detected from key format.</p>

            <div className="flex items-center gap-2 mb-2">
              <select className="h-8 rounded-lg bg-white/5 border border-white/10 text-white/50 text-[11px] px-2">
                <option>✦ Mistral model...</option>
              </select>
              <Input placeholder="Mistral API key (from platform.mistral)" className="h-8 text-[11px] bg-white/5 border-white/10 text-white flex-1" />
              <Button size="sm" className="h-8 bg-red-600 hover:bg-red-500 text-white text-[11px] gap-1">
                <Plus className="h-3 w-3" /> Add Mistral
              </Button>
              <Button size="sm" variant="ghost" className="h-8 text-[11px] text-white/50">📄 Import.txt</Button>
            </div>

            {settings.apiKeys.gemini && (
              <div className="space-y-2 mt-3">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/80 text-white font-bold">gemini</span>
                  <span className="text-xs text-white/50 flex-1 font-mono">AI.z.a...PtQ</span>
                  <Wifi className="h-3 w-3 text-emerald-400" />
                  <span className="text-[10px] text-emerald-400">Active</span>
                </div>
              </div>
            )}
            <button className="text-[11px] text-white/30 mt-2 hover:text-white/50">▾ Show all 42 keys</button>
            <div className="mt-2">
              <Button variant="ghost" className="w-full text-xs text-red-400/60 hover:text-red-400">🗑 Clear All Keys</Button>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Metadata Rules</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/50">Keyword Strategy</span>
                  <div className="flex items-center gap-1.5">
                    <Switch checked={true} />
                    <span className="text-[10px] text-white/30">Max 3 words per keyword</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {['Single-Word', 'Multi-Word', 'Mixed'].map(s => (
                    <button key={s} className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      s === 'Mixed' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10'
                    }`}>{s}</button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/50">Keyword Count</span>
                  <span className="text-xs text-white/70">{settings.metadataRules.keywordCount} tags</span>
                </div>
                <Slider value={[settings.metadataRules.keywordCount]} onValueChange={v => update('metadataRules.keywordCount', v[0])} max={50} min={5} step={1} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/50">Title Length (words)</span>
                  <span className="text-xs text-white/70">10 - 15</span>
                </div>
                <Slider value={[10]} max={30} min={3} step={1} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/50">Description Length (words)</span>
                  <span className="text-xs text-white/70">{settings.advanced.descriptionMinWords} - {settings.advanced.descriptionMaxWords}</span>
                </div>
                <Slider value={[settings.advanced.descriptionMinWords]} max={100} min={5} step={5} />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Event / Series Context</h3>
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-white/30 flex-1">Tell the AI about event/series related to file.</p>
              <Switch />
            </div>
          </section>

          <section>
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Negative Keywords (AI will avoid these)</h3>
            <div className="flex gap-2 mb-2">
              <Input
                value={negKeyword}
                onChange={e => setNegKeyword(e.target.value)}
                placeholder="Add prohibited word..."
                className="h-9 text-xs bg-white/5 border-white/10 text-white flex-1"
              />
              <Button size="sm" className="h-9 bg-white/10 text-white/60 hover:bg-white/20" onClick={() => {
                if (negKeyword.trim()) {
                  update('metadataRules.negativeKeywords', settings.metadataRules.negativeKeywords ? settings.metadataRules.negativeKeywords + ', ' + negKeyword.trim() : negKeyword.trim());
                  setNegKeyword('');
                }
              }}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[10px] text-white/30">AI will not include these words in title, description, or keywords.</p>
          </section>

          <section>
            <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Additional Options</h3>
            <div className="space-y-3">
              {[
                { label: 'Auto-Embed on Download', desc: 'Automatically embed metadata when downloading', key: 'advanced.autoEmbed' },
                { label: 'Auto-Retry Failed Assets', desc: 'Automatically retry auto-limited or timed-out AI generations', key: 'advanced.autoRetry' },
                { label: 'Batch Mode', desc: 'Parallel batch processing. Uses all API keys simultaneously via round-robin.', key: 'advanced.saveBackups' },
                { label: 'Transparent Background Mode', desc: 'Add PNG, transparent, alpha channel keywords for transparent images.', key: 'advanced.autoDelete' },
              ].map(opt => (
                <div key={opt.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/70">{opt.label}</p>
                    <p className="text-[10px] text-white/30">{opt.desc}</p>
                  </div>
                  <Switch
                    checked={opt.key === 'advanced.autoRetry' ? settings.advanced.autoRetry : false}
                    onCheckedChange={v => update(opt.key, v)}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Keyboard Shortcuts Section */}
          <KeyboardShortcutsPanel
            shortcuts={shortcuts}
            onUpdate={onUpdateShortcut}
            onReset={onResetShortcuts}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
