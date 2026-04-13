import { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, X, Image, Film, Pen, AlertCircle, FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAppContext } from './AppContext';
import { Asset } from './types';
import { toast } from 'sonner';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_TYPES = ['image/', 'video/', '.ai', '.eps', '.svg'];

const UploadZone = () => {
  const { addAssets, setShowUpload } = useAppContext();
  const [dragOver, setDragOver] = useState(false);
  const [fileQueue, setFileQueue] = useState<{ file: File; valid: boolean; error?: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) return { valid: false, error: 'File too large (max 50MB)' };
    const isAccepted = file.type.startsWith('image/') || file.type.startsWith('video/') || 
      ['.ai', '.eps', '.svg'].some(ext => file.name.toLowerCase().endsWith(ext));
    if (!isAccepted) return { valid: false, error: 'Unsupported file type' };
    return { valid: true };
  };

  const addToQueue = useCallback((files: FileList | File[]) => {
    const arr = Array.from(files);
    const items = arr.map(file => {
      const validation = validateFile(file);
      return { file, ...validation };
    });
    setFileQueue(prev => [...prev, ...items]);
  }, []);

  const processQueue = useCallback(() => {
    const valid = fileQueue.filter(f => f.valid);
    if (valid.length === 0) {
      toast.error('No valid files to add');
      return;
    }
    const newAssets: Asset[] = valid.map(({ file }) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      thumbnail: URL.createObjectURL(file),
      status: 'ready' as const,
      addedAt: Date.now(),
    }));
    addAssets(newAssets);
    toast.success(`Added ${newAssets.length} asset${newAssets.length > 1 ? 's' : ''}`);
    setShowUpload(false);
  }, [fileQueue, addAssets, setShowUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) addToQueue(e.dataTransfer.files);
  }, [addToQueue]);

  // Clipboard paste support
  useEffect(() => {
    const handler = (e: ClipboardEvent) => {
      if (e.clipboardData?.files.length) {
        addToQueue(e.clipboardData.files);
      }
    };
    document.addEventListener('paste', handler);
    return () => document.removeEventListener('paste', handler);
  }, [addToQueue]);

  const removeFromQueue = (index: number) => {
    setFileQueue(prev => prev.filter((_, i) => i !== index));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => setShowUpload(false)}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
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
          className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center text-center transition-all duration-300 ${
            dragOver
              ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_40px_rgba(0,206,201,0.15)]'
              : 'border-white/20 hover:border-purple-500/50'
          }`}
        >
          <motion.div
            animate={dragOver ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/30 to-cyan-500/30 flex items-center justify-center mb-4"
          >
            <Upload className="h-8 w-8 text-cyan-400" />
          </motion.div>
          <h3 className="text-xl font-semibold text-white mb-1">Drag & drop your assets</h3>
          <p className="text-white/40 text-sm mb-4">or click below to browse · Ctrl+V to paste</p>

          <div className="flex gap-6 mb-5 text-xs text-white/30">
            <div className="flex items-center gap-1.5"><Image className="h-3.5 w-3.5 text-purple-400" /> JPEG · PNG · WebP</div>
            <div className="flex items-center gap-1.5"><Film className="h-3.5 w-3.5 text-cyan-400" /> MP4 · MOV · AVI</div>
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
            onChange={e => { if (e.target.files) addToQueue(e.target.files); e.target.value = ''; }}
          />
        </div>

        {/* File queue */}
        {fileQueue.length > 0 && (
          <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
            {fileQueue.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-2 rounded-lg text-xs ${
                  item.valid ? 'bg-white/5 border border-white/10' : 'bg-red-500/10 border border-red-500/20'
                }`}
              >
                {item.valid ? (
                  <FileCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                )}
                <span className="text-white/70 flex-1 truncate">{item.file.name}</span>
                <span className="text-white/30">{formatSize(item.file.size)}</span>
                {item.error && <span className="text-red-400">{item.error}</span>}
                <button onClick={() => removeFromQueue(i)} className="text-white/30 hover:text-white">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-white/40">{fileQueue.filter(f => f.valid).length} valid · {fileQueue.filter(f => !f.valid).length} invalid</span>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs"
                onClick={processQueue}
                disabled={fileQueue.filter(f => f.valid).length === 0}
              >
                Add {fileQueue.filter(f => f.valid).length} Assets
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default UploadZone;
