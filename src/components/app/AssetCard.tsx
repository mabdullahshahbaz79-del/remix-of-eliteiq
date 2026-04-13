import { Trash2, Sparkles, Copy, Edit3, RefreshCw, Clock, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Asset } from './types';
import { useAppContext } from './AppContext';
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
  ready: 'Ready',
  processing: 'Processing...',
  done: 'Done',
  error: 'Error',
};

interface Props {
  asset: Asset;
  index?: number;
}

const AssetCard = ({ asset, index = 0 }: Props) => {
  const { removeAsset, selectedIds, toggleSelect, setSelectedAsset, generateMetadata } = useAppContext();

  const isSelected = selectedIds.has(asset.id);

  const handleGenerate = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    await generateMetadata(asset.id);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  const a = asset;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
      whileHover={{ y: -2 }}
      className={`group relative rounded-xl overflow-hidden bg-white/[0.03] border transition-all duration-300 ${
        isSelected
          ? 'border-cyan-500/60 shadow-[0_0_20px_rgba(0,206,201,0.1)]'
          : 'border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/5'
      }`}
    >
      {/* Select checkbox */}
      <button
        className="absolute top-2 left-2 z-10 w-5 h-5 rounded border flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 data-[selected=true]:opacity-100"
        data-selected={isSelected}
        style={{
          borderColor: isSelected ? 'rgb(0 206 201)' : 'rgba(255,255,255,0.3)',
          background: isSelected ? 'rgb(0 206 201)' : 'rgba(0,0,0,0.5)',
        }}
        onClick={e => { e.stopPropagation(); toggleSelect(asset.id); }}
      >
        {isSelected && <Check className="h-3 w-3 text-black" />}
      </button>

      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black/30 cursor-pointer" onClick={() => setSelectedAsset(asset)}>
        {asset.type.startsWith('image') ? (
          <img src={asset.thumbnail} alt={asset.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">{asset.type.split('/')[1]?.toUpperCase()}</div>
        )}

        {/* Processing overlay */}
        {asset.status === 'processing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            <div className="h-8 w-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-2" />
            <span className="text-xs text-cyan-400">Analyzing...</span>
            {/* Progress bar */}
            <div className="w-3/4 h-1 rounded-full bg-white/10 mt-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '90%' }}
                transition={{ duration: 8, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        )}

        {/* Size badge */}
        <div className="absolute top-2 right-2 flex gap-1.5">
          <span className={`text-[10px] px-1.5 py-0.5 rounded border backdrop-blur-sm ${statusColors[asset.status]}`}>
            {statusLabels[asset.status]}
          </span>
        </div>

        <div className="absolute bottom-2 left-2">
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/70 text-white/80 backdrop-blur-sm">
            {formatSize(asset.size)}
          </span>
        </div>

        {/* Delete button */}
        <button
          className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/50 text-white/40 hover:text-red-400 hover:bg-black/70 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          onClick={e => { e.stopPropagation(); removeAsset(asset.id); }}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <p className="text-xs text-white/60 truncate">{asset.name}</p>

        {a.metadata ? (
          <div className="space-y-2">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/40 uppercase tracking-wider">Title</span>
                <button onClick={() => copyToClipboard(a.metadata!.title, 'Title')} className="text-white/20 hover:text-white/60">
                  <Copy className="h-3 w-3" />
                </button>
              </div>
              <p className="text-xs text-white/80 leading-snug line-clamp-2">{a.metadata.title}</p>
            </div>

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

            {/* Confidence */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${a.metadata.confidence * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                />
              </div>
              <span className="text-[10px] text-white/40">{Math.round(a.metadata.confidence * 100)}%</span>
            </div>

            <div className="flex items-center gap-1 pt-1 border-t border-white/5">
              <button className="p-1.5 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all" title="Edit">
                <Edit3 className="h-3.5 w-3.5" />
              </button>
              <button className="p-1.5 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all" title="Regenerate" onClick={() => handleGenerate()}>
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
              <button className="p-1.5 rounded-lg bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all" title="History">
                <Clock className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ) : (
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
    </motion.div>
  );
};

export default AssetCard;
