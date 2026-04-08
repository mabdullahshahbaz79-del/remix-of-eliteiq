import { useState, useRef, useCallback } from 'react';
import { Upload, X, Image, Film, Pen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from './AppContext';
import { Asset } from './types';

const UploadZone = () => {
  const { addAssets, setShowUpload } = useAppContext();
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback((files: FileList | File[]) => {
    const arr = Array.from(files);
    const newAssets: Asset[] = arr.map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      thumbnail: URL.createObjectURL(file),
      status: 'ready' as const,
      addedAt: Date.now(),
    }));
    addAssets(newAssets);
    setShowUpload(false);
  }, [addAssets, setShowUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) processFiles(e.dataTransfer.files);
  }, [processFiles]);

  return (
    <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowUpload(false)}>
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-[#0F172A] border border-white/10 p-8"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={() => setShowUpload(false)} className="absolute top-4 right-4 text-white/40 hover:text-white">
          <X className="h-5 w-5" />
        </button>

        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center text-center transition-all ${
            dragOver
              ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_40px_rgba(0,206,201,0.15)]'
              : 'border-white/20 hover:border-purple-500/50'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/30 to-cyan-500/30 flex items-center justify-center mb-4">
            <Upload className="h-8 w-8 text-cyan-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-1">Drag & drop your assets</h3>
          <p className="text-white/40 text-sm mb-6">or click the button below to browse files</p>

          <div className="flex gap-6 mb-6 text-xs text-white/30">
            <div className="flex items-center gap-1.5"><Image className="h-3.5 w-3.5 text-purple-400" /> JPEG · PNG · WebP</div>
            <div className="flex items-center gap-1.5"><Film className="h-3.5 w-3.5 text-cyan-400" /> MP4 · MOV · AVI · WebM</div>
            <div className="flex items-center gap-1.5"><Pen className="h-3.5 w-3.5 text-emerald-400" /> AI · EPS · SVG</div>
          </div>

          <Button
            className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white"
            onClick={() => inputRef.current?.click()}
          >
            Browse Files
          </Button>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*,video/*,.ai,.eps,.svg"
            className="hidden"
            onChange={e => e.target.files && processFiles(e.target.files)}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadZone;
