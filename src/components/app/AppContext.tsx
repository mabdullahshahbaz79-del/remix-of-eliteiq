import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Asset, AppSettings, defaultSettings } from './types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface BatchProgress {
  total: number;
  completed: number;
  failed: number;
  isRunning: boolean;
}

interface AppContextType {
  assets: Asset[];
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
  addAssets: (newAssets: Asset[]) => void;
  removeAsset: (id: string) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  selectedIds: Set<string>;
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<string>>>;
  toggleSelect: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  viewMode: 'grid' | 'list';
  setViewMode: (m: 'grid' | 'list') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  showUpload: boolean;
  setShowUpload: (v: boolean) => void;
  showSettings: boolean;
  setShowSettings: (v: boolean) => void;
  selectedAsset: Asset | null;
  setSelectedAsset: (a: Asset | null) => void;
  showMetadataEditor: boolean;
  setShowMetadataEditor: (v: boolean) => void;
  batchProgress: BatchProgress;
  generateMetadata: (assetId: string) => Promise<void>;
  generateBatch: (assetIds: string[]) => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be inside AppProvider');
  return ctx;
};

const loadSettings = (): AppSettings => {
  try {
    const s = localStorage.getItem('eliteiq-settings');
    return s ? { ...defaultSettings, ...JSON.parse(s) } : defaultSettings;
  } catch { return defaultSettings; }
};

const blobToBase64 = async (url: string): Promise<string> => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [settings, setSettings] = useState<AppSettings>(loadSettings);
  const [showUpload, setShowUpload] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [showMetadataEditor, setShowMetadataEditor] = useState(false);
  const [batchProgress, setBatchProgress] = useState<BatchProgress>({ total: 0, completed: 0, failed: 0, isRunning: false });

  useEffect(() => {
    localStorage.setItem('eliteiq-settings', JSON.stringify(settings));
  }, [settings]);

  const addAssets = useCallback((newAssets: Asset[]) => {
    setAssets(prev => [...prev, ...newAssets]);
  }, []);

  const removeAsset = useCallback((id: string) => {
    setAssets(prev => prev.filter(a => a.id !== id));
    setSelectedIds(prev => { const n = new Set(prev); n.delete(id); return n; });
    setSelectedAsset(prev => prev?.id === id ? null : prev);
  }, []);

  const updateAsset = useCallback((id: string, updates: Partial<Asset>) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(assets.map(a => a.id)));
  }, [assets]);

  const deselectAll = useCallback(() => setSelectedIds(new Set()), []);

  const generateMetadata = useCallback(async (assetId: string) => {
    const asset = assets.find(a => a.id === assetId);
    if (!asset) return;

    setAssets(prev => prev.map(a => a.id === assetId ? { ...a, status: 'processing' as const } : a));
    
    try {
      const base64 = await blobToBase64(asset.thumbnail);
      const { data, error } = await supabase.functions.invoke('generate-metadata', {
        body: { image: base64, filename: asset.name },
      });
      if (error) throw error;
      setAssets(prev => prev.map(a => a.id === assetId ? { ...a, status: 'done' as const, metadata: data } : a));
      toast.success(`Metadata generated for ${asset.name}`);
    } catch (e: any) {
      setAssets(prev => prev.map(a => a.id === assetId ? { ...a, status: 'error' as const } : a));
      if (e?.message?.includes('429')) {
        toast.error('Rate limited — please wait and try again');
      } else if (e?.message?.includes('402')) {
        toast.error('Credits exhausted — add funds to continue');
      } else {
        toast.error(`Failed to generate metadata for ${asset.name}`);
      }
    }
  }, [assets]);

  const generateBatch = useCallback(async (assetIds: string[]) => {
    const workers = settings.advanced.parallelWorkers || 1;
    setBatchProgress({ total: assetIds.length, completed: 0, failed: 0, isRunning: true });

    let completed = 0;
    let failed = 0;

    const processOne = async (id: string) => {
      const asset = assets.find(a => a.id === id);
      if (!asset || asset.status === 'done') {
        completed++;
        setBatchProgress(p => ({ ...p, completed }));
        return;
      }

      setAssets(prev => prev.map(a => a.id === id ? { ...a, status: 'processing' as const } : a));

      let retries = settings.advanced.autoRetry ? 2 : 0;
      let success = false;

      while (!success && retries >= 0) {
        try {
          const base64 = await blobToBase64(asset.thumbnail);
          const { data, error } = await supabase.functions.invoke('generate-metadata', {
            body: { image: base64, filename: asset.name },
          });
          if (error) throw error;
          setAssets(prev => prev.map(a => a.id === id ? { ...a, status: 'done' as const, metadata: data } : a));
          success = true;
          completed++;
        } catch {
          retries--;
          if (retries < 0) {
            setAssets(prev => prev.map(a => a.id === id ? { ...a, status: 'error' as const } : a));
            failed++;
            completed++;
          }
        }
      }
      setBatchProgress(p => ({ ...p, completed, failed }));
    };

    // Process in chunks of `workers`
    for (let i = 0; i < assetIds.length; i += workers) {
      const chunk = assetIds.slice(i, i + workers);
      await Promise.all(chunk.map(processOne));
    }

    setBatchProgress(p => ({ ...p, isRunning: false }));
    toast.success(`Batch complete: ${completed - failed} success, ${failed} failed`);
  }, [assets, settings.advanced]);

  return (
    <AppContext.Provider value={{
      assets, setAssets, addAssets, removeAsset, updateAsset,
      selectedIds, setSelectedIds, toggleSelect, selectAll, deselectAll,
      viewMode, setViewMode, searchQuery, setSearchQuery,
      settings, setSettings,
      showUpload, setShowUpload, showSettings, setShowSettings,
      selectedAsset, setSelectedAsset,
      showMetadataEditor, setShowMetadataEditor,
      batchProgress, generateMetadata, generateBatch,
    }}>
      {children}
    </AppContext.Provider>
  );
};
