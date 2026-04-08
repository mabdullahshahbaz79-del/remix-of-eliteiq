import { Grid3x3, List, CheckSquare, Sparkles, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from './AppContext';
import AssetCard from './AssetCard';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AssetGrid = () => {
  const {
    assets, viewMode, setViewMode, searchQuery,
    selectedIds, selectAll, deselectAll, updateAsset, removeAsset,
    setSelectedAsset,
  } = useAppContext();

  const filtered = assets.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBulkGenerate = async () => {
    const targets = assets.filter(a => selectedIds.has(a.id) && a.status === 'ready');
    for (const asset of targets) {
      updateAsset(asset.id, { status: 'processing' });
      try {
        const res = await fetch(asset.thumbnail);
        const blob = await res.blob();
        const base64 = await new Promise<string>(resolve => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(blob);
        });
        const { data, error } = await supabase.functions.invoke('generate-metadata', {
          body: { image: base64, filename: asset.name },
        });
        if (error) throw error;
        updateAsset(asset.id, { status: 'done', metadata: data });
      } catch {
        updateAsset(asset.id, { status: 'error' });
      }
    }
    toast.success(`Generated metadata for ${targets.length} assets`);
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
          {selectedIds.size > 0 && (
            <>
              <Button size="sm" variant="ghost" className="text-xs text-cyan-400" onClick={handleBulkGenerate}>
                <Sparkles className="h-3 w-3 mr-1" /> Generate Selected ({selectedIds.size})
              </Button>
              <Button size="sm" variant="ghost" className="text-xs text-red-400" onClick={handleBulkDelete}>
                <Trash2 className="h-3 w-3 mr-1" /> Delete Selected
              </Button>
            </>
          )}
          <Button size="sm" variant="ghost" className="text-xs text-white/50" onClick={selectedIds.size > 0 ? deselectAll : selectAll}>
            <CheckSquare className="h-3 w-3 mr-1" /> {selectedIds.size > 0 ? 'Deselect' : 'Select All'}
          </Button>
          <div className="flex border border-white/10 rounded-lg overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={`p-1.5 ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/30'}`}>
              <Grid3x3 className="h-4 w-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-1.5 ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/30'}`}>
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
          {filtered.map(asset => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(asset => (
            <div
              key={asset.id}
              className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/40 cursor-pointer transition-all"
              onClick={() => setSelectedAsset(asset)}
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-black/30 shrink-0">
                {asset.type.startsWith('image') && <img src={asset.thumbnail} className="w-full h-full object-cover" />}
              </div>
              <span className="text-sm text-white/70 flex-1 truncate">{asset.name}</span>
              <span className="text-xs text-white/40">{(asset.size / 1048576).toFixed(1)} MB</span>
              <span className={`text-[10px] px-2 py-0.5 rounded border ${
                asset.status === 'done' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              }`}>
                {asset.status === 'done' ? 'Done' : 'Ready'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssetGrid;
