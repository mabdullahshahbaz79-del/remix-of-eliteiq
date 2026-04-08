import { Trash2, Sparkles, Copy, Edit3, RefreshCw, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Asset } from './types';
import { useAppContext } from './AppContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const formatSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
};

const statusColors: Record<string, string> = {
  ready: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  processing: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  done: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  error: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const statusLabels: Record<string, string> = {
  ready: 'Ready for AI',
  processing: 'Processing...',
  done: 'Done',
  error: 'Error',
};

interface Props {
  asset: Asset;
}

const AssetCard = ({ asset }: Props) => {
  const { removeAsset, updateAsset, selectedIds, toggleSelect, setSelectedAsset } = useAppContext();

  const isSelected = selectedIds.has(asset.id);

  const handleGenerate = async () => {
    updateAsset(asset.id, { status: 'processing' });
    try {
      const res = await fetch(asset.thumbnail);
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const { data, error } = await supabase.functions.invoke('generate-metadata', {
          body: { image: base64, filename: asset.name },
        });
        if (error) throw error;
        updateAsset(asset.id, { status: 'done', metadata: data });
        toast.success(`Metadata generated for ${asset.name}`);
      };
      reader.readAsDataURL(blob);
    } catch (e) {
      updateAsset(asset.id, { status: 'error' });
      toast.error('Failed to generate metadata');
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  const a = asset;

  return (
    <div
      className={`group relative rounded-xl overflow-hidden bg-white/[0.03] border transition-all duration-300 ${
        isSelected ? 'border-cyan-500/60 shadow-[0_0_20px_rgba(0,206,201,0.1)]' : 'border-white/10 hover:border-white/20'
      }`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black/30 cursor-pointer" onClick={() => setSelectedAsset(asset)}>
        {asset.type.startsWith('image') ? (
          <img src={asset.thumbnail} alt={asset.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">{asset.type.split('/')[1]?.toUpperCase()}</div>
        )}

        {/* Size badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/70 text-white/90 backdrop-blur-sm font-medium">
            {formatSize(asset.size)}
          </span>
          {asset.compressedSize && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-600/80 text-white backdrop-blur-sm font-medium">
              → {formatSize(asset.compressedSize)}
            </span>
          )}
        </div>

        {/* Status badge */}
        <span className={`absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded border backdrop-blur-sm ${statusColors[asset.status]}`}>
          {statusLabels[asset.status]}
        </span>

        {/* Delete button */}
        <button
          className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/50 text-white/40 hover:text-red-400 hover:bg-black/70 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          onClick={e => { e.stopPropagation(); removeAsset(asset.id); }}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Content below thumbnail */}
      <div className="p-3 space-y-2">
        {/* Filename */}
        <p className="text-xs text-white/60 truncate">{asset.name}</p>

        {/* If metadata is generated, show inline */}
        {a.metadata ? (
          <div className="space-y-2">
            {/* Title */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/40 uppercase tracking-wider">Title</span>
                <button onClick={() => copyToClipboard(a.metadata!.title, 'Title')} className="text-white/20 hover:text-white/60">
                  <Copy className="h-3 w-3" />
                </button>
              </div>
              <p className="text-xs text-white/80 leading-snug line-clamp-2">{a.metadata.title}</p>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/40 uppercase tracking-wider">Description</span>
                <button onClick={() => copyToClipboard(a.metadata!.description, 'Description')} className="text-white/20 hover:text-white/60">
                  <Copy className="h-3 w-3" />
                </button>
              </div>
              <p className="text-xs text-white/50 leading-snug line-clamp-2">{a.metadata.description}</p>
            </div>

            {/* Keywords */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/40 uppercase tracking-wider">Keywords ({a.metadata.keywords.length})</span>
                <button onClick={() => copyToClipboard(a.metadata!.keywords.join(', '), 'Keywords')} className="text-white/20 hover:text-white/60">
                  <Copy className="h-3 w-3" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {a.metadata.keywords.slice(0, 3).map((kw, i) => (
                  <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">{kw}</span>
                ))}
                {a.metadata.keywords.length > 3 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/30">+{a.metadata.keywords.length - 3}</span>
                )}
              </div>
            </div>

            {/* Action buttons row */}
            <div className="flex items-center gap-1 pt-1 border-t border-white/5">
              <button className="p-1.5 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all" title="Edit">
                <Edit3 className="h-3.5 w-3.5" />
              </button>
              <button className="p-1.5 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all" title="Regenerate" onClick={handleGenerate}>
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
              <button className="p-1.5 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all" title="History">
                <Clock className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Generate button for assets without metadata */
          <div>
            {asset.status === 'ready' && (
              <Button size="sm" className="w-full h-8 text-xs bg-gradient-to-r from-purple-600 to-cyan-500 text-white" onClick={handleGenerate}>
                <Sparkles className="h-3 w-3 mr-1.5" /> Generate Metadata
              </Button>
            )}
            {asset.status === 'processing' && (
              <div className="flex items-center justify-center gap-2 h-8">
                <div className="h-4 w-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-white/40">Generating...</span>
              </div>
            )}
            {asset.status === 'error' && (
              <Button size="sm" variant="ghost" className="w-full h-8 text-xs text-red-400" onClick={handleGenerate}>
                <RefreshCw className="h-3 w-3 mr-1.5" /> Retry
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetCard;
