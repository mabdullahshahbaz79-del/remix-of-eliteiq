import { Grid3x3, List, CheckSquare, Sparkles, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAppContext } from './AppContext';
import AssetCard from './AssetCard';
import { toast } from 'sonner';

const AssetGrid = () => {
  const {
    assets, viewMode, setViewMode, searchQuery,
    selectedIds, selectAll, deselectAll, removeAsset,
    setSelectedAsset, generateBatch, batchProgress,
  } = useAppContext();

  const filtered = assets.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBulkGenerate = async () => {
    const targets = assets.filter(a => selectedIds.has(a.id) && a.status === 'ready').map(a => a.id);
    if (targets.length === 0) {
      toast.info('No ready assets selected');
      return;
    }
    await generateBatch(targets);
  };

  const handleBulkDelete = () => {
    selectedIds.forEach(id => removeAsset(id));
    toast.success('Deleted selected assets');
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Asset Dashboard</h2>
        <div className="flex items-center gap-2">
          <AnimatePresence>
            {selectedIds.size > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-2"
              >
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs text-cyan-400 hover:bg-cyan-500/10"
                  onClick={handleBulkGenerate}
                  disabled={batchProgress.isRunning}
                >
                  <Sparkles className="h-3 w-3 mr-1" /> Generate ({selectedIds.size})
                </Button>
                <Button size="sm" variant="ghost" className="text-xs text-red-400 hover:bg-red-500/10" onClick={handleBulkDelete}>
                  <Trash2 className="h-3 w-3 mr-1" /> Delete
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          <Button size="sm" variant="ghost" className="text-xs text-white/50 hover:bg-white/5" onClick={selectedIds.size > 0 ? deselectAll : selectAll}>
            <CheckSquare className="h-3 w-3 mr-1" /> {selectedIds.size > 0 ? 'Deselect' : 'Select All'}
          </Button>
          <div className="flex border border-white/10 rounded-lg overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/50'}`}>
              <Grid3x3 className="h-4 w-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-1.5 transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/50'}`}>
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {filtered.length === 0 && searchQuery && (
        <p className="text-center text-white/30 py-12">No assets match your search.</p>
      )}

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((asset, i) => (
            <AssetCard key={asset.id} asset={asset} index={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((asset, i) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.2) }}
              className="flex items-center gap-4 p-3 rounded-lg bg-white/[0.03] border border-white/10 hover:border-purple-500/30 cursor-pointer transition-all group"
              onClick={() => setSelectedAsset(asset)}
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-black/30 shrink-0">
                {asset.type.startsWith('image') && <img src={asset.thumbnail} className="w-full h-full object-cover" />}
              </div>
              <span className="text-sm text-white/70 flex-1 truncate">{asset.name}</span>
              <span className="text-xs text-white/40">{(asset.size / 1048576).toFixed(1)} MB</span>
              {asset.metadata && (
                <span className="text-[10px] text-white/30">{Math.round(asset.metadata.confidence * 100)}%</span>
              )}
              <span className={`text-[10px] px-2 py-0.5 rounded border ${
                asset.status === 'done' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' :
                asset.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                asset.status === 'error' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              }`}>
                {asset.status === 'done' ? 'Done' : asset.status === 'processing' ? 'Processing' : asset.status === 'error' ? 'Error' : 'Ready'}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetGrid;
