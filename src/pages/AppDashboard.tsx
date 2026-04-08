import { AppProvider, useAppContext } from '@/components/app/AppContext';
import AppNavbar from '@/components/app/AppNavbar';
import EmptyState from '@/components/app/EmptyState';
import UploadZone from '@/components/app/UploadZone';
import AssetGrid from '@/components/app/AssetGrid';
import AssetSidePanel from '@/components/app/AssetSidePanel';
import SettingsModal from '@/components/app/SettingsModal';
import MetadataEditor from '@/components/app/MetadataEditor';

const DashboardContent = () => {
  const { assets, showUpload, selectedAsset } = useAppContext();

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <AppNavbar />
      <main className={`pt-20 px-4 pb-8 transition-all ${selectedAsset ? 'mr-80' : ''}`}>
        <div className="max-w-7xl mx-auto">
          {assets.length === 0 ? <EmptyState /> : <AssetGrid />}
        </div>
      </main>
      {showUpload && <UploadZone />}
      <AssetSidePanel />
      <SettingsModal />
      <MetadataEditor />
    </div>
  );
};

const AppDashboard = () => (
  <AppProvider>
    <DashboardContent />
  </AppProvider>
);

export default AppDashboard;
