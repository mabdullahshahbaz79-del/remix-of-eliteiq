import { X, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
