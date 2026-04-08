import { ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from './AppContext';

const EmptyState = () => {
  const { setShowUpload } = useAppContext();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600/20 to-cyan-500/20 border border-white/10 flex items-center justify-center mb-6">
        <ImagePlus className="h-12 w-12 text-cyan-400/60" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">No Assets Yet</h2>
      <p className="text-white/50 max-w-sm mb-8">
        Upload your images and videos to generate optimized metadata for 9 platforms
      </p>
      <Button
        size="lg"
        className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/20"
        onClick={() => setShowUpload(true)}
      >
        Upload Your First Asset
      </Button>
    </div>
  );
};

export default EmptyState;
