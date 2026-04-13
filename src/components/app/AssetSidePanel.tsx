import { useState } from 'react';
import { X, RefreshCw, Download, Copy, Check, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAppContext } from './AppContext';
import { SUPPORTED_PLATFORMS } from './types';
import { toast } from 'sonner';

const AssetSidePanel = () => {
  const { selectedAsset, setSelectedAsset, generateMetadata } = useAppContext();
  const [activeTab, setActiveTab] = useState<'general' | 'platforms'>('general');
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null);

  if (!selectedAsset) return null;
  const a = selectedAsset;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  const handleRegenerate = async () => {
    await generateMetadata(a.id);
  };

  return (
    <motion.div
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 320, opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="fixed top-14 right-0 bottom-0 w-80 bg-[#0B1120]/95 backdrop-blur-xl border-l border-white/10 z-30 overflow-y-auto"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Asset Details</h3>
          <button onClick={() => setSelectedAsset(null)} className="text-white/40 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Preview */}
        <div className="rounded-xl overflow-hidden bg-black/30 mb-4 aspect-square">
          {a.type.startsWith('image') ? (
            <img src={a.thumbnail} className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/20">{a.type}</div>
          )}
        </div>

        {/* File info */}
        <div className="space-y-2 mb-4">
          {[
            ['Name', a.name],
            ['Size', `${(a.size / 1048576).toFixed(2)} MB`],
            ['Type', a.type],
            ['Status', a.status],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between text-xs">
              <span className="text-white/40">{label}</span>
              <span className={`truncate ml-2 max-w-[60%] text-right ${
                label === 'Status' ? (a.status === 'done' ? 'text-cyan-400' : a.status === 'error' ? 'text-red-400' : 'text-emerald-400') : 'text-white/70'
              }`}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        {a.metadata && (
          <>
            <div className="flex border-b border-white/10 mb-4">
              {(['general', 'platforms'] as const).map(tab => (
                <button
                  key={tab}
                  className={`flex-1 text-xs py-2 transition-colors border-b-2 ${
                    activeTab === tab
                      ? 'text-cyan-400 border-cyan-400'
                      : 'text-white/40 border-transparent hover:text-white/60'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'general' ? 'General' : 'Platforms'}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'general' ? (
                <motion.div key="general" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3 mb-4">
                  <CopyField label="Title" value={a.metadata.title} onCopy={copyToClipboard} />
                  <CopyField label="Description" value={a.metadata.description} onCopy={copyToClipboard} />
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-white/40 uppercase tracking-wider">Keywords ({a.metadata.keywords.length})</span>
                      <button onClick={() => copyToClipboard(a.metadata!.keywords.join(', '), 'Keywords')} className="text-white/20 hover:text-white/60">
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {a.metadata.keywords.map((kw, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/20">{kw}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/40 uppercase tracking-wider">Confidence</span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" style={{ width: `${a.metadata.confidence * 100}%` }} />
                      </div>
                      <span className="text-[10px] text-white/50">{Math.round(a.metadata.confidence * 100)}%</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="platforms" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-1 mb-4">
                  {SUPPORTED_PLATFORMS.map(platform => {
                    const pm = a.metadata?.platforms?.[platform];
                    const isExpanded = expandedPlatform === platform;
                    return (
                      <div key={platform} className="border border-white/5 rounded-lg overflow-hidden">
                        <button
                          className="w-full flex items-center gap-2 p-2 text-xs hover:bg-white/5 transition-colors"
                          onClick={() => setExpandedPlatform(isExpanded ? null : platform)}
                        >
                          {pm?.ready ? (
                            <Check className="h-3 w-3 text-emerald-400 shrink-0" />
                          ) : (
                            <div className="h-3 w-3 rounded-full border border-white/20 shrink-0" />
                          )}
                          <span className="text-white/70 flex-1 text-left">{platform}</span>
                          <ChevronRight className={`h-3 w-3 text-white/30 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {isExpanded && pm && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-white/5 px-2 py-2 space-y-2"
                            >
                              <CopyField label="Title" value={pm.title} onCopy={copyToClipboard} small />
                              <CopyField label="Description" value={pm.description} onCopy={copyToClipboard} small />
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] text-white/40">Keywords ({pm.keywords.length})</span>
                                <button onClick={() => copyToClipboard(pm.keywords.join(', '), `${platform} Keywords`)} className="text-white/20 hover:text-white/60">
                                  <Copy className="h-3 w-3" />
                                </button>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {pm.keywords.slice(0, 5).map((kw, i) => (
                                  <span key={i} className="text-[9px] px-1 py-0.5 rounded bg-white/5 text-white/40">{kw}</span>
                                ))}
                                {pm.keywords.length > 5 && <span className="text-[9px] text-white/30">+{pm.keywords.length - 5}</span>}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-xs text-white/60 hover:text-white hover:bg-white/5"
            onClick={handleRegenerate}
            disabled={a.status === 'processing'}
          >
            <RefreshCw className={`h-3 w-3 mr-2 ${a.status === 'processing' ? 'animate-spin' : ''}`} />
            {a.status === 'processing' ? 'Generating...' : 'Regenerate'}
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs text-white/60 hover:text-white hover:bg-white/5">
            <Download className="h-3 w-3 mr-2" /> Download File
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const CopyField = ({ label, value, onCopy, small }: { label: string; value: string; onCopy: (t: string, l: string) => void; small?: boolean }) => (
  <div>
    <div className="flex items-center justify-between">
      <span className={`text-white/40 uppercase tracking-wider ${small ? 'text-[9px]' : 'text-[10px]'}`}>{label}</span>
      <button onClick={() => onCopy(value, label)} className="text-white/20 hover:text-white/60">
        <Copy className="h-3 w-3" />
      </button>
    </div>
    <p className={`text-white/70 leading-snug ${small ? 'text-[11px] line-clamp-2' : 'text-xs'}`}>{value}</p>
  </div>
);

export default AssetSidePanel;
