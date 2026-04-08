import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Asset, AppSettings, defaultSettings } from './types';

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
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be inside AppProvider');
  return ctx;
};

const loadSettings = (): AppSettings => {
  try {
    const s = localStorage.getItem('adobemeta-settings');
    return s ? { ...defaultSettings, ...JSON.parse(s) } : defaultSettings;
  } catch { return defaultSettings; }
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

  useEffect(() => {
    localStorage.setItem('adobemeta-settings', JSON.stringify(settings));
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

  return (
    <AppContext.Provider value={{
      assets, setAssets, addAssets, removeAsset, updateAsset,
      selectedIds, setSelectedIds, toggleSelect, selectAll, deselectAll,
      viewMode, setViewMode, searchQuery, setSearchQuery,
      settings, setSettings,
      showUpload, setShowUpload, showSettings, setShowSettings,
      selectedAsset, setSelectedAsset,
      showMetadataEditor, setShowMetadataEditor,
    }}>
      {children}
    </AppContext.Provider>
  );
};
