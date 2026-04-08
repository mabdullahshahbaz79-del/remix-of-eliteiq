import { Search, Download, FileSpreadsheet, Sparkles, Upload, Settings, Wifi, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppContext } from './AppContext';

interface Props {
  onExportCSV: () => void;
}

const AppNavbar = ({ onExportCSV }: Props) => {
  const { assets, selectedIds, searchQuery, setSearchQuery, setShowUpload, setShowSettings, setShowMetadataEditor } = useAppContext();

  const readyCount = assets.filter(a => a.status === 'ready').length;
  const doneCount = assets.filter(a => a.status === 'done').length;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/10 bg-[#0B1120]/95 backdrop-blur-xl flex items-center px-4 gap-3">
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
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 mr-2">
          <Wifi className="h-3 w-3" />
          <span>Online</span>
        </div>

        <Button variant="ghost" size="sm" className="text-white/50 hover:text-white text-[11px] gap-1.5 h-8" onClick={() => { /* download zip */ }}>
          <Download className="h-3.5 w-3.5" />
          Download Zip ({doneCount})
        </Button>

        <Button variant="ghost" size="sm" className="text-white/50 hover:text-white text-[11px] gap-1.5 h-8" onClick={onExportCSV}>
          <FileSpreadsheet className="h-3.5 w-3.5" />
          Export CSV
        </Button>

        <Button variant="ghost" size="sm" className="text-white/50 hover:text-white text-[11px] gap-1.5 h-8" onClick={() => setShowMetadataEditor(true)}>
          <Edit3 className="h-3.5 w-3.5" />
          Bulk Edit
        </Button>

        <Button variant="ghost" size="sm" className="text-white/50 hover:text-white text-[11px] gap-1.5 h-8">
          <Sparkles className="h-3.5 w-3.5" />
          Generate All ({readyCount})
        </Button>

        <Button
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-[11px] gap-1.5 shadow-lg shadow-cyan-500/20 h-8"
          onClick={() => setShowUpload(true)}
        >
          <Upload className="h-3.5 w-3.5" />
          Upload Assets
        </Button>

        <Button variant="ghost" size="icon" className="text-white/50 hover:text-white h-8 w-8" onClick={() => setShowSettings(true)}>
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
};

export default AppNavbar;
