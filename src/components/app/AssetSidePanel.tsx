import { X, RefreshCw, Download, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from './AppContext';

const AssetSidePanel = () => {
  const { selectedAsset, setSelectedAsset } = useAppContext();
  if (!selectedAsset) return null;

  const a = selectedAsset;

  return (
    <div className="fixed top-16 right-0 bottom-0 w-80 bg-[#0B1120]/95 backdrop-blur-xl border-l border-white/10 z-30 overflow-y-auto animate-in slide-in-from-right-10">
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
          <div className="flex justify-between text-xs">
            <span className="text-white/40">Name</span>
            <span className="text-white/70 truncate ml-2 max-w-[60%] text-right">{a.name}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-white/40">Size</span>
            <span className="text-white/70">{(a.size / 1048576).toFixed(2)} MB</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-white/40">Type</span>
            <span className="text-white/70">{a.type}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-white/40">Status</span>
            <span className={a.status === 'done' ? 'text-cyan-400' : 'text-emerald-400'}>{a.status}</span>
          </div>
        </div>

        {/* Metadata */}
        {a.metadata && (
          <div className="space-y-3 mb-4">
            <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider">Metadata</h4>
            <div>
              <span className="text-[10px] text-white/40">Title</span>
              <p className="text-xs text-white/80">{a.metadata.title}</p>
            </div>
            <div>
              <span className="text-[10px] text-white/40">Description</span>
              <p className="text-xs text-white/60">{a.metadata.description}</p>
            </div>
            <div>
              <span className="text-[10px] text-white/40">Keywords</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {a.metadata.keywords.map((kw, i) => (
                  <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/20">{kw}</span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[10px] text-white/40">Confidence</span>
              <div className="w-full h-2 rounded-full bg-white/10 mt-1">
                <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" style={{ width: `${a.metadata.confidence * 100}%` }} />
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs text-white/60 hover:text-white">
            <RefreshCw className="h-3 w-3 mr-2" /> Regenerate
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs text-white/60 hover:text-white">
            <Edit3 className="h-3 w-3 mr-2" /> Edit Metadata
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs text-white/60 hover:text-white">
            <Download className="h-3 w-3 mr-2" /> Download File
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssetSidePanel;
