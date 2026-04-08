import { Search, Download, FileSpreadsheet, Sparkles, Upload, Settings, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppContext } from './AppContext';

const AppNavbar = () => {
  const { assets, selectedIds, searchQuery, setSearchQuery, setShowUpload, setShowSettings, setShowMetadataEditor } = useAppContext();

  const readyCount = assets.filter(a => a.status === 'done').length;

  const handleExportCSV = () => {
    const rows = assets.filter(a => a.metadata).map(a => ({
      filename: a.name,
      title: a.metadata!.title,
      description: a.metadata!.description,
      keywords: a.metadata!.keywords.join(', '),
    }));
    if (!rows.length) return;
    const header = 'Filename,Title,Description,Keywords\n';
    const csv = header + rows.map(r =>
      `"${r.filename}","${r.title}","${r.description}","${r.keywords}"`
    ).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'metadata.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/10 bg-[#0B1120]/90 backdrop-blur-xl flex items-center px-4 gap-3">
      {/* Left */}
      <div className="flex items-center gap-2 shrink-0">
        <Sparkles className="h-6 w-6 text-cyan-400" />
        <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          AdobeMeta AI
        </span>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
          PRO
        </span>
      </div>

      {/* Center search */}
      <div className="flex-1 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search assets..."
            className="pl-9 h-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-cyan-500/50"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 mr-2">
          <Wifi className="h-3 w-3" />
          <span>Online</span>
        </div>

        <Button variant="ghost" size="sm" className="text-white/60 hover:text-white text-xs gap-1.5" onClick={handleExportCSV}>
          <FileSpreadsheet className="h-3.5 w-3.5" />
          Export CSV
        </Button>

        <Button variant="ghost" size="sm" className="text-white/60 hover:text-white text-xs gap-1.5" onClick={() => setShowMetadataEditor(true)}>
          <Download className="h-3.5 w-3.5" />
          Download Zip ({readyCount})
        </Button>

        <Button
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs gap-1.5 shadow-lg shadow-cyan-500/20"
          onClick={() => setShowUpload(true)}
        >
          <Upload className="h-3.5 w-3.5" />
          Upload Assets
        </Button>

        <Button variant="ghost" size="icon" className="text-white/60 hover:text-white h-9 w-9" onClick={() => setShowSettings(true)}>
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
};

export default AppNavbar;
