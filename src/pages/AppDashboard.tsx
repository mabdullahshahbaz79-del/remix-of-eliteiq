import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppProvider, useAppContext } from '@/components/app/AppContext';
import AppNavbar from '@/components/app/AppNavbar';
import EmptyState from '@/components/app/EmptyState';
import UploadZone from '@/components/app/UploadZone';
import AssetGrid from '@/components/app/AssetGrid';
import AssetSidePanel from '@/components/app/AssetSidePanel';
import SettingsModal from '@/components/app/SettingsModal';
import MetadataEditor from '@/components/app/MetadataEditor';
import ExportCSVModal from '@/components/app/ExportCSVModal';
import LicenseGate from '@/components/app/LicenseGate';
import BatchNotification from '@/components/app/BatchNotification';
import { useKeyboardShortcuts, useShortcutSettings } from '@/hooks/use-keyboard-shortcuts';

interface BatchResult {
  total: number;
  success: number;
  failed: number;
  timestamp: number;
}

const DashboardContent = () => {
  const {
    assets, showUpload, selectedAsset, selectedIds,
    selectAll, deselectAll, removeAsset, setShowUpload, setShowSettings,
    viewMode, setViewMode, generateMetadata, generateBatch, batchProgress,
    showSettings,
  } = useAppContext();
  const [showExport, setShowExport] = useState(false);
  const [batchResult, setBatchResult] = useState<BatchResult | null>(null);
  const { shortcuts, updateShortcut, resetShortcuts } = useShortcutSettings();

  // Watch for batch completion to show notification
  const prevRunning = useMemo(() => ({ current: false }), []);
  if (prevRunning.current && !batchProgress.isRunning) {
    const result: BatchResult = {
      total: batchProgress.total,
      success: batchProgress.completed - batchProgress.failed,
      failed: batchProgress.failed,
      timestamp: Date.now(),
    };
    setBatchResult(result);
  }
  prevRunning.current = batchProgress.isRunning;

  const shortcutHandlers = useMemo(() => ({
    selectAll: () => selectAll(),
    deselectAll: () => deselectAll(),
    deleteSelected: () => {
      const ids = Array.from(selectedIds);
      ids.forEach(id => removeAsset(id));
    },
    generateSelected: () => {
      const ids = Array.from(selectedIds).length > 0
        ? Array.from(selectedIds)
        : assets.filter(a => a.status === 'ready').slice(0, 1).map(a => a.id);
      if (ids.length === 1) generateMetadata(ids[0]);
      else if (ids.length > 1) generateBatch(ids);
    },
    generateAll: () => {
      const ids = assets.filter(a => a.status === 'ready').map(a => a.id);
      if (ids.length > 0) generateBatch(ids);
    },
    openUpload: () => setShowUpload(true),
    openSettings: () => setShowSettings(true),
    toggleSearch: () => {
      const input = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
      input?.focus();
    },
    toggleView: () => setViewMode(viewMode === 'grid' ? 'list' : 'grid'),
  }), [selectAll, deselectAll, selectedIds, removeAsset, assets, generateMetadata, generateBatch, setShowUpload, setShowSettings, viewMode, setViewMode]);

  // Disable shortcuts when modals are open
  const shortcutsEnabled = !showUpload && !showSettings;
  useKeyboardShortcuts(shortcuts, shortcutHandlers, shortcutsEnabled);

  return (
    <div className="min-h-screen bg-[#0B1120] text-white relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-purple-600/8 blur-[120px]"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-cyan-500/8 blur-[120px]"
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <AppNavbar onExportCSV={() => setShowExport(true)} />

      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`relative pt-16 px-4 pb-8 transition-all duration-300 ${selectedAsset ? 'mr-80' : ''}`}
      >
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {assets.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <EmptyState />
              </motion.div>
            ) : (
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AssetGrid />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>

      <AnimatePresence>{showUpload && <UploadZone />}</AnimatePresence>
      <AssetSidePanel />
      <SettingsModal shortcuts={shortcuts} onUpdateShortcut={updateShortcut} onResetShortcuts={resetShortcuts} />
      <MetadataEditor />
      <ExportCSVModal open={showExport} onClose={() => setShowExport(false)} />

      <BatchNotification
        result={batchResult}
        onDismiss={() => setBatchResult(null)}
      />
    </div>
  );
};

const AppDashboard = () => (
  <LicenseGate>
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  </LicenseGate>
);
export default AppDashboard;
