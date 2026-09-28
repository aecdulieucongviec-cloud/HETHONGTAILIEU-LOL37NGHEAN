import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { DocumentLibraryView } from './views/DocumentLibraryView';
import { DocumentControlView } from './views/DocumentControlView';
import { ObjectivesAndCertsView } from './views/ObjectivesAndCertsView';
import { DashboardView } from './views/DashboardView';
import { WebAppsView } from './views/WebAppsView';
import { WifiRequestView } from './views/WifiRequestView';
import { AnnouncementsView } from './views/AnnouncementsView';
import { EventsView } from './views/EventsView';
import { UserManagementView } from './views/UserManagementView';
import { AuditLogView } from './views/AuditLogView';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { DocumentDetailModal } from './components/DocumentDetailModal';
import { VersionHistoryModal } from './components/VersionHistoryModal';
import { UploadDocumentModal } from './components/UploadDocumentModal';
import { ToastContainer } from './components/ToastContainer';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="flex-1 min-h-[calc(100vh-220px)] bg-[#F4F9FD]">
      {activeTab === 'home' && <HomeView />}
      {activeTab === 'documents' && <DocumentLibraryView />}
      {activeTab === 'control' && <DocumentControlView />}
      {activeTab === 'objectives' && <ObjectivesAndCertsView />}
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'webapps' && <WebAppsView />}
      {activeTab === 'wifi' && <WifiRequestView />}
      {activeTab === 'announcements' && <AnnouncementsView />}
      {activeTab === 'events' && <EventsView />}
      {activeTab === 'users' && <UserManagementView />}
      {activeTab === 'audit' && <AuditLogView />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#F4F9FD] text-[#12345B] font-sans antialiased selection:bg-[#00BFEF]/20 selection:text-[#003B82]">
        <Header />
        <Navbar />
        <MainContent />
        <Footer />

        {/* Global Modals and Overlay Tools */}
        <DocumentViewerModal />
        <DocumentDetailModal />
        <VersionHistoryModal />
        <UploadDocumentModal />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
