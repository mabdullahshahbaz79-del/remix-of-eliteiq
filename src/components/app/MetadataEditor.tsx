import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAppContext } from './AppContext';

const MetadataEditor = () => {
  const { assets, updateAsset, showMetadataEditor, setShowMetadataEditor } = useAppContext();

  if (!showMetadataEditor) return null;

  const withMeta = assets.filter(a => a.metadata);

  const handleTitleChange = (id: string, title: string) => {
    const asset = assets.find(a => a.id === id);
    if (asset?.metadata) {
      updateAsset(id, { metadata: { ...asset.metadata, title } });
    }
  };

  const handleDescChange = (id: string, description: string) => {
    const asset = assets.find(a => a.id === id);
    if (asset?.metadata) {
      updateAsset(id, { metadata: { ...asset.metadata, description } });
    }
  };

  const handleKeywordsChange = (id: string, keywords: string) => {
    const asset = assets.find(a => a.id === id);
    if (asset?.metadata) {
      updateAsset(id, { metadata: { ...asset.metadata, keywords: keywords.split(',').map(k => k.trim()).filter(Boolean) } });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-5xl max-h-[85vh] rounded-2xl bg-[#0F172A] border border-white/10 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Metadata Editor</h2>
          <button onClick={() => setShowMetadataEditor(false)} className="text-white/40 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {withMeta.length === 0 ? (
            <p className="text-center text-white/30 py-12">No metadata generated yet. Generate metadata for your assets first.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-white/40 text-xs border-b border-white/10">
                  <th className="pb-2 pr-3 w-32">File</th>
                  <th className="pb-2 pr-3">Title</th>
                  <th className="pb-2 pr-3">Keywords</th>
                  <th className="pb-2 pr-3 w-48">Description</th>
                  <th className="pb-2 w-20">Score</th>
                </tr>
              </thead>
              <tbody>
                {withMeta.map(a => (
                  <tr key={a.id} className="border-b border-white/5">
                    <td className="py-2 pr-3">
                      <span className="text-xs text-white/60 truncate block max-w-[120px]">{a.name}</span>
                    </td>
                    <td className="py-2 pr-3">
                      <Input
                        value={a.metadata!.title}
                        onChange={e => handleTitleChange(a.id, e.target.value)}
                        className="h-8 text-xs bg-white/5 border-white/10 text-white"
                      />
                    </td>
                    <td className="py-2 pr-3">
                      <Input
                        value={a.metadata!.keywords.join(', ')}
                        onChange={e => handleKeywordsChange(a.id, e.target.value)}
                        className="h-8 text-xs bg-white/5 border-white/10 text-white"
                      />
                    </td>
                    <td className="py-2 pr-3">
                      <Textarea
                        value={a.metadata!.description}
                        onChange={e => handleDescChange(a.id, e.target.value)}
                        className="min-h-[32px] h-8 text-xs bg-white/5 border-white/10 text-white resize-none"
                      />
                    </td>
                    <td className="py-2">
                      <div className="w-full h-2 rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" style={{ width: `${a.metadata!.confidence * 100}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetadataEditor;
