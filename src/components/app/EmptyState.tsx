import { useState, useCallback, useRef } from 'react';
import { ImagePlus, Upload, Image, Film, Pen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAppContext } from './AppContext';
import { Asset } from './types';

const EmptyState = () => {
  const { setShowUpload, addAssets } = useAppContext();
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
  }, [addAssets]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) processFiles(e.dataTransfer.files);
  }, [processFiles]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      {/* Animated icon */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600/20 to-cyan-500/20 border border-white/10 flex items-center justify-center">
          <ImagePlus className="h-12 w-12 text-cyan-400/60" />
        </div>
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-400/20 blur-xl -z-10"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl font-bold text-white mb-2"
      >
        No Assets Yet
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-white/50 max-w-sm mb-8"
      >
        Upload your images and videos to generate optimized metadata for 9 platforms
      </motion.p>

      {/* Inline drop zone */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`w-full max-w-lg border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
          dragOver
            ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_40px_rgba(0,206,201,0.15)]'
            : 'border-white/15 hover:border-purple-500/40 bg-white/[0.02]'
        }`}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Upload className="h-5 w-5 text-white/40" />
          <span className="text-sm text-white/50">Drag & drop files here</span>
        </div>

        <div className="flex justify-center gap-4 mb-5 text-[11px] text-white/30">
          <span className="flex items-center gap-1"><Image className="h-3 w-3 text-purple-400" /> JPEG · PNG · WebP</span>
          <span className="flex items-center gap-1"><Film className="h-3 w-3 text-cyan-400" /> MP4 · MOV</span>
          <span className="flex items-center gap-1"><Pen className="h-3 w-3 text-emerald-400" /> AI · EPS · SVG</span>
        </div>

        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/20"
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
      </motion.div>
    </div>
  );
};

export default EmptyState;
