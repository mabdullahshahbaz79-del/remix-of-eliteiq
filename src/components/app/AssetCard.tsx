import { Trash2, Sparkles, CheckSquare, Square } from 'lucide-react';
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
  done: 'Metadata Ready',
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

  return (
    <div
      className={`group relative rounded-xl overflow-hidden bg-white/5 border transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(108,92,231,0.15)] ${
        isSelected ? 'border-cyan-500/60 shadow-[0_0_20px_rgba(0,206,201,0.1)]' : 'border-white/10 hover:border-purple-500/40'
      }`}
      onClick={() => setSelectedAsset(asset)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black/30">
        {asset.type.startsWith('image') ? (
          <img src={asset.thumbnail} alt={asset.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">{asset.type.split('/')[1]?.toUpperCase()}</div>
        )}

        {/* Badges */}
        <span className="absolute top-2 left-2 text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-white/80 backdrop-blur-sm">
          {formatSize(asset.size)}
        </span>
        <span className={`absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded border backdrop-blur-sm ${statusColors[asset.status]}`}>
          {statusLabels[asset.status]}
        </span>

        {/* Select checkbox */}
        <button
          className="absolute bottom-2 left-2 text-white/40 hover:text-white"
          onClick={e => { e.stopPropagation(); toggleSelect(asset.id); }}
        >
          {isSelected ? <CheckSquare className="h-5 w-5 text-cyan-400" /> : <Square className="h-5 w-5" />}
        </button>
      </div>

      {/* Info */}
      <div className="p-3 flex items-center gap-2">
        <span className="text-xs text-white/70 truncate flex-1">{asset.name}</span>

        {asset.status === 'ready' && (
          <Button size="sm" className="h-7 text-[10px] bg-gradient-to-r from-purple-600 to-cyan-500 text-white" onClick={e => { e.stopPropagation(); handleGenerate(); }}>
            <Sparkles className="h-3 w-3 mr-1" /> Generate
          </Button>
        )}
        {asset.status === 'processing' && (
          <div className="h-4 w-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        )}

        <button className="text-white/20 hover:text-red-400 transition-colors" onClick={e => { e.stopPropagation(); removeAsset(asset.id); }}>
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AssetCard;
