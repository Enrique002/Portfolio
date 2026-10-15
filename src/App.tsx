import React, { useState } from 'react';
import { TitleBar } from './components/TitleBar';
import { ActivityBar } from './components/ActivityBar';
import type { ActivityTab } from './components/ActivityBar';
import { FileExplorer } from './components/FileExplorer';
import { TabEditor } from './components/TabEditor';
import { ProjectsView } from './components/ProjectsView';
import { TerminalPanel } from './components/TerminalPanel';
import { StatusBar } from './components/StatusBar';
import { X, FileText, FileJson, FileSpreadsheet, FolderGit2, Menu } from 'lucide-react';

interface TabItem {
  id: string;
  title: string;
  type: 'md' | 'json' | 'pdf' | 'custom';
}

export const App: React.FC = () => {
  const [activeActivityTab, setActiveActivityTab] = useState<ActivityTab>('explorer');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);

  // Open tabs history
  const [openTabs, setOpenTabs] = useState<TabItem[]>([
    { id: 'README.md', title: 'README.md', type: 'md' },
    { id: 'about-me.md', title: 'about-me.md', type: 'md' },
    { id: 'skills.json', title: 'skills.json', type: 'json' },
    { id: 'github-projects', title: 'github-repos.json', type: 'json' },
  ]);

  const [activeTabId, setActiveTabId] = useState<string>('README.md');

  // Handle opening file
  const handleOpenFile = (fileId: string) => {
    let title = fileId;
    let type: TabItem['type'] = 'md';

    if (fileId.endsWith('.json')) type = 'json';
    if (fileId.endsWith('.pdf')) type = 'pdf';
    if (fileId === 'github-projects') {
      title = 'github-repos.json';
      type = 'json';
    }

    if (!openTabs.some((t) => t.id === fileId)) {
      setOpenTabs((prev) => [...prev, { id: fileId, title, type }]);
    }
    setActiveTabId(fileId);

    // Close sidebar on small screens after choosing a file for better mobile UX
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  // Handle closing file tab
  const handleCloseTab = (e: React.MouseEvent, fileId: string) => {
    e.stopPropagation();
    const updatedTabs = openTabs.filter((t) => t.id !== fileId);
    setOpenTabs(updatedTabs);

    if (activeTabId === fileId && updatedTabs.length > 0) {
      setActiveTabId(updatedTabs[updatedTabs.length - 1].id);
    }
  };

  // Handle Activity Bar selection
  const handleSelectActivityTab = (tab: ActivityTab) => {
    setActiveActivityTab(tab);
    switch (tab) {
      case 'explorer':
        setIsSidebarOpen(!isSidebarOpen);
        break;
      case 'projects':
        handleOpenFile('github-projects');
        break;
      case 'profile':
        handleOpenFile('about-me.md');
        break;
      case 'skills':
        handleOpenFile('skills.json');
        break;
      case 'experience':
        handleOpenFile('experience.md');
        break;
      case 'contact':
        handleOpenFile('contact.json');
        break;
    }
  };

  const getTabIcon = (type: TabItem['type']) => {
    switch (type) {
      case 'md':
        return <FileText className="w-3.5 h-3.5 text-[#42a5f5] shrink-0" />;
      case 'json':
        return <FileJson className="w-3.5 h-3.5 text-[#fbc02d] shrink-0" />;
      case 'pdf':
        return <FileSpreadsheet className="w-3.5 h-3.5 text-[#e57373] shrink-0" />;
      default:
        return <FolderGit2 className="w-3.5 h-3.5 text-[#81c784] shrink-0" />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#1e1e1e] text-[#cccccc] font-sans antialiased">
      {/* Top Window Bar */}
      <TitleBar activeFile={activeTabId} onOpenFile={handleOpenFile} />

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Activity Bar Icons */}
        <ActivityBar
          activeTab={activeActivityTab}
          onSelectTab={handleSelectActivityTab}
          toggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
          isTerminalOpen={isTerminalOpen}
        />

        {/* File Explorer Sidebar - Responsive drawer on mobile */}
        <div
          className={`fixed md:relative z-30 md:z-auto inset-y-0 left-12 md:left-0 transform transition-transform duration-200 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:hidden'
          } h-full`}
        >
          <FileExplorer
            activeFileId={activeTabId}
            onOpenFile={handleOpenFile}
            isOpen={true}
          />
        </div>

        {/* Mobile backdrop for sidebar */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden fixed inset-0 bg-black/50 z-20"
            aria-hidden="true"
          />
        )}

        {/* Main Editor Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e] overflow-hidden">
          {/* Tab bar */}
          <div className="flex items-center bg-[#2d2d2d] border-b border-[#3c3c3c] overflow-x-auto select-none no-scrollbar">
            {/* Mobile Sidebar toggle button in tabbar */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 text-[#858585] hover:text-white border-r border-[#3c3c3c] cursor-pointer shrink-0"
              title="Alternar Explorador"
              aria-label="Alternar Explorador de archivos"
            >
              <Menu className="w-4 h-4" />
            </button>

            {openTabs.map((tab) => {
              const isActive = activeTabId === tab.id;
              return (
                <div
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`group flex items-center space-x-2 px-3 py-2 text-xs border-r border-[#3c3c3c] cursor-pointer min-w-[120px] max-w-[200px] transition-colors shrink-0 ${
                    isActive
                      ? 'bg-[#1e1e1e] text-white font-medium border-t-2 border-t-[#007acc]'
                      : 'bg-[#2d2d2d] text-[#858585] hover:bg-[#2a2d2e] hover:text-[#cccccc]'
                  }`}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={0}
                >
                  {getTabIcon(tab.type)}
                  <span className="truncate flex-1">{tab.title}</span>
                  <button
                    onClick={(e) => handleCloseTab(e, tab.id)}
                    className="p-0.5 rounded hover:bg-[#454545] text-[#858585] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Cerrar pestaña"
                    aria-label={`Cerrar pestaña ${tab.title}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Breadcrumbs path bar */}
          <div className="bg-[#1e1e1e] px-4 py-1 text-[11px] text-[#858585] font-mono border-b border-[#2d2d2d] flex items-center space-x-1.5 select-none shrink-0">
            <span>portfolio</span>
            <span>&gt;</span>
            <span className="text-[#cccccc]">{activeTabId}</span>
          </div>

          {/* Editor content container */}
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
            {activeTabId === 'github-projects' ? (
              <ProjectsView />
            ) : (
              <TabEditor activeFileId={activeTabId} onOpenFile={handleOpenFile} />
            )}
          </div>

          {/* Bottom Terminal Panel */}
          <TerminalPanel
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
            onOpenFile={handleOpenFile}
          />
        </main>
      </div>

      {/* Bottom Status Bar */}
      <StatusBar
        activeFile={activeTabId}
        isTerminalOpen={isTerminalOpen}
        toggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
      />
    </div>
  );
};

export default App;
