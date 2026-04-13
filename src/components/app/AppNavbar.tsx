import { Search, Download, FileSpreadsheet, Sparkles, Upload, Settings, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useAppContext } from './AppContext';

interface Props {
  onExportCSV: () => void;
}

const AppNavbar = ({ onExportCSV }: Props) => {
  const {
    assets, selectedIds, searchQuery, setSearchQuery,
    setShowUpload, setShowSettings, setShowMetadataEditor,
    batchProgress, generateBatch,
  } = useAppContext();

  const readyCount = assets.filter(a => a.status === 'ready').length;
  const doneCount = assets.filter(a => a.status === 'done').length;
  const processingCount = assets.filter(a => a.status === 'processing').length;

  const handleGenerateAll = () => {
    const ids = assets.filter(a => a.status === 'ready').map(a => a.id);
    if (ids.length > 0) generateBatch(ids);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0B1120]/80 backdrop-blur-2xl">
      <div className="h-14 flex items-center px-4 gap-3">
        {/* Left */}
        <div className="flex items-center gap-2 shrink-0">
          <Sparkles className="h-5 w-5 text-cyan-400" />
          <span className="text-base font-bold">
            <span className="text-purple-400">Vision</span>{' '}
            <span className="text-white">Metadata</span>
          </span>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            PRO
          </span>
        </div>

        {/* Stats badges */}
        {assets.length > 0 && (
          <div className="hidden md:flex items-center gap-2 ml-2">
            <span className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-white/50 border border-white/10">
              {assets.length} total
            </span>
            {processingCount > 0 && (
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-[10px] px-2 py-1 rounded-full bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
              >
                {processingCount} processing
              </motion.span>
            )}
            <span className="text-[10px] px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {doneCount} done
            </span>
          </div>
        )}

        {/* Center search */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <Input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search assets..."
              className="pl-9 h-8 bg-white/5 border-white/10 text-white text-xs placeholder:text-white/25 focus-visible:ring-cyan-500/50"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Button variant="ghost" size="sm" className="text-white/50 hover:text-white text-[11px] gap-1.5 h-8 hover:bg-white/5" onClick={() => {}}>
            <Download className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Download ({doneCount})</span>
          </Button>

          <Button variant="ghost" size="sm" className="text-white/50 hover:text-white text-[11px] gap-1.5 h-8 hover:bg-white/5" onClick={onExportCSV}>
            <FileSpreadsheet className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Export CSV</span>
          </Button>

          <Button variant="ghost" size="sm" className="text-white/50 hover:text-white text-[11px] gap-1.5 h-8 hover:bg-white/5" onClick={() => setShowMetadataEditor(true)}>
            <Edit3 className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Bulk Edit</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-white/50 hover:text-white text-[11px] gap-1.5 h-8 hover:bg-white/5"
            onClick={handleGenerateAll}
            disabled={readyCount === 0 || batchProgress.isRunning}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Generate All ({readyCount})</span>
          </Button>

          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-[11px] gap-1.5 shadow-lg shadow-cyan-500/20 h-8"
            onClick={() => setShowUpload(true)}
          >
            <Upload className="h-3.5 w-3.5" />
            Upload
          </Button>

          <Button variant="ghost" size="icon" className="text-white/50 hover:text-white h-8 w-8 hover:bg-white/5" onClick={() => setShowSettings(true)}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Batch progress bar */}
      <AnimatePresence>
        {batchProgress.isRunning && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-2"
          >
            <div className="flex items-center gap-3">
              <Progress
                value={(batchProgress.completed / batchProgress.total) * 100}
                className="h-1.5 flex-1 bg-white/5"
              />
              <span className="text-[10px] text-white/50 shrink-0">
                {batchProgress.completed}/{batchProgress.total}
                {batchProgress.failed > 0 && <span className="text-red-400 ml-1">({batchProgress.failed} failed)</span>}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
    </nav>
  );
};

export default AppNavbar;
