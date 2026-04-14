import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface BatchResult {
  total: number;
  success: number;
  failed: number;
  timestamp: number;
}

interface Props {
  result: BatchResult | null;
  onDismiss: () => void;
}

const BatchNotification = ({ result, onDismiss }: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (result) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onDismiss, 400);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [result, onDismiss]);

  if (!result) return null;

  const allSuccess = result.failed === 0;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -20, x: '-50%' }}
          className="fixed top-20 left-1/2 z-[60] w-full max-w-sm"
        >
          <div className={`relative rounded-xl border backdrop-blur-xl shadow-2xl overflow-hidden ${
            allSuccess
              ? 'bg-emerald-950/80 border-emerald-500/30 shadow-emerald-500/10'
              : 'bg-amber-950/80 border-amber-500/30 shadow-amber-500/10'
          }`}>
            {/* Glow effect */}
            <div className={`absolute inset-0 opacity-20 ${
              allSuccess
                ? 'bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0'
                : 'bg-gradient-to-r from-amber-500/0 via-amber-500/30 to-amber-500/0'
            }`} />

            <div className="relative p-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${allSuccess ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}>
                  {allSuccess ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <Sparkles className="h-5 w-5 text-amber-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">
                    {allSuccess ? 'Batch Complete!' : 'Batch Finished with Errors'}
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    {result.success} of {result.total} assets processed successfully
                    {result.failed > 0 && (
                      <span className="text-red-400"> · {result.failed} failed</span>
                    )}
                  </p>

                  {/* Progress dots */}
                  <div className="flex items-center gap-1 mt-2 flex-wrap">
                    {Array.from({ length: Math.min(result.total, 20) }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className={`w-2 h-2 rounded-full ${
                          i < result.success
                            ? 'bg-emerald-400'
                            : 'bg-red-400'
                        }`}
                      />
                    ))}
                    {result.total > 20 && (
                      <span className="text-[10px] text-white/30 ml-1">+{result.total - 20}</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => { setVisible(false); setTimeout(onDismiss, 400); }}
                  className="text-white/30 hover:text-white/60 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Auto-dismiss progress bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 8, ease: 'linear' }}
              className={`h-0.5 origin-left ${allSuccess ? 'bg-emerald-400/50' : 'bg-amber-400/50'}`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BatchNotification;
