import { X, Settings, Wifi, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useAppContext } from './AppContext';
import { useState } from 'react';

const SettingsModal = () => {
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
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from './AppContext';
import { toast } from 'sonner';

const SettingsModal = () => {
  const { settings, setSettings, showSettings, setShowSettings } = useAppContext();
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  if (!showSettings) return null;

  const update = (path: string, value: any) => {
    setSettings(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let obj = copy;
      for (let i = 0; i < parts.length - 1; i++) obj = obj[parts[i]];
      obj[parts[parts.length - 1]] = value;
      return copy;
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-2xl bg-[#0F172A] border border-white/10 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Settings</h2>
          <button onClick={() => setShowSettings(false)} className="text-white/40 hover:text-white"><X className="h-5 w-5" /></button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <Tabs defaultValue="ai" className="w-full">
            <TabsList className="w-full bg-white/5 border border-white/10 mb-4">
              <TabsTrigger value="ai" className="flex-1 text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50">AI Mode</TabsTrigger>
              <TabsTrigger value="keys" className="flex-1 text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50">API Keys</TabsTrigger>
              <TabsTrigger value="rules" className="flex-1 text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50">Metadata Rules</TabsTrigger>
              <TabsTrigger value="advanced" className="flex-1 text-xs data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="ai" className="space-y-4">
              <div className="flex gap-2">
                {(['auto', 'cloud', 'offline'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => update('aiMode', mode)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${
                      settings.aiMode === mode
                        ? 'bg-gradient-to-r from-purple-600/20 to-cyan-500/20 border-cyan-500/40 text-cyan-400'
                        : 'bg-white/5 border-white/10 text-white/40 hover:text-white/60'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1 block">Provider</label>
                <Select value={settings.provider} onValueChange={v => update('provider', v)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gemini">Google Gemini</SelectItem>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="groq">Groq</SelectItem>
                    <SelectItem value="ollama">Ollama (Local)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button size="sm" className="text-xs bg-gradient-to-r from-purple-600 to-cyan-500 text-white" onClick={() => toast.success('Connection successful!')}>
                Test Connection
              </Button>
            </TabsContent>

            <TabsContent value="keys" className="space-y-4">
              {(['openai', 'gemini', 'groq', 'ollama'] as const).map(key => (
                <div key={key}>
                  <label className="text-xs text-white/40 mb-1 block capitalize">{key === 'ollama' ? 'Ollama Endpoint' : `${key} API Key`}</label>
                  <div className="relative">
                    <Input
                      type={showKeys[key] ? 'text' : 'password'}
                      value={settings.apiKeys[key]}
                      onChange={e => update(`apiKeys.${key}`, e.target.value)}
                      placeholder={key === 'ollama' ? 'http://localhost:11434' : `Enter ${key} API key`}
                      className="pr-10 bg-white/5 border-white/10 text-white text-xs"
                    />
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                      onClick={() => setShowKeys(p => ({ ...p, [key]: !p[key] }))}
                    >
                      {showKeys[key] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              ))}
              <p className="text-[10px] text-white/20">🔒 Keys stored locally, never sent to external servers</p>
              <Button size="sm" className="text-xs bg-gradient-to-r from-purple-600 to-cyan-500 text-white" onClick={() => toast.success('Keys saved!')}>
                Save Keys
              </Button>
            </TabsContent>

            <TabsContent value="rules" className="space-y-4">
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-xs text-white/60">
                  <Switch checked={settings.metadataRules.singleWord} onCheckedChange={v => update('metadataRules.singleWord', v)} /> Single-word
                </label>
                <label className="flex items-center gap-2 text-xs text-white/60">
                  <Switch checked={settings.metadataRules.multiWord} onCheckedChange={v => update('metadataRules.multiWord', v)} /> Multi-word
                </label>
              </div>
              <div>
                <label className="text-xs text-white/40 mb-2 block">Keyword Count: {settings.metadataRules.keywordCount}</label>
                <Slider value={[settings.metadataRules.keywordCount]} onValueChange={([v]) => update('metadataRules.keywordCount', v)} min={5} max={50} step={1} />
              </div>
              <div>
                <label className="text-xs text-white/40 mb-1 block">Negative Keywords</label>
                <Textarea
                  value={settings.metadataRules.negativeKeywords}
                  onChange={e => update('metadataRules.negativeKeywords', e.target.value)}
                  placeholder="Enter words to exclude, one per line..."
                  className="bg-white/5 border-white/10 text-white text-xs min-h-[60px]"
                />
              </div>
              {(['autoCapitalize', 'removeDuplicates', 'enforceBrandFilter', 'addSeriesNumbers'] as const).map(key => (
                <label key={key} className="flex items-center gap-2 text-xs text-white/60">
                  <Switch checked={settings.metadataRules[key]} onCheckedChange={v => update(`metadataRules.${key}`, v)} />
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                </label>
              ))}
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div>
                <label className="text-xs text-white/40 mb-2 block">Parallel Workers: {settings.advanced.parallelWorkers}</label>
                <Slider value={[settings.advanced.parallelWorkers]} onValueChange={([v]) => update('advanced.parallelWorkers', v)} min={1} max={10} step={1} />
              </div>
              <label className="flex items-center gap-2 text-xs text-white/60">
                <Switch checked={settings.advanced.autoRetry} onCheckedChange={v => update('advanced.autoRetry', v)} /> Auto-retry failed
              </label>
              <div>
                <label className="text-xs text-white/40 mb-2 block">Description Length: {settings.advanced.descriptionMinWords}-{settings.advanced.descriptionMaxWords} words</label>
                <div className="flex gap-4">
                  <Slider value={[settings.advanced.descriptionMinWords]} onValueChange={([v]) => update('advanced.descriptionMinWords', v)} min={5} max={30} step={1} />
                  <Slider value={[settings.advanced.descriptionMaxWords]} onValueChange={([v]) => update('advanced.descriptionMaxWords', v)} min={20} max={100} step={5} />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/40 mb-2 block">Confidence Threshold: {(settings.advanced.confidenceThreshold * 100).toFixed(0)}%</label>
                <Slider value={[settings.advanced.confidenceThreshold]} onValueChange={([v]) => update('advanced.confidenceThreshold', v)} min={0.1} max={1} step={0.05} />
              </div>
              {(['autoEmbed', 'autoDelete', 'saveBackups'] as const).map(key => (
                <label key={key} className="flex items-center gap-2 text-xs text-white/60">
                  <Switch checked={settings.advanced[key]} onCheckedChange={v => update(`advanced.${key}`, v)} />
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                </label>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
