import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  FileCode, 
  FileText, 
  FileJson, 
  Folder, 
  FolderOpen,
  FileSpreadsheet,
  Download
} from 'lucide-react';

export interface FileItem {
  id: string;
  name: string;
  type: 'md' | 'json' | 'pdf' | 'custom';
  iconColor?: string;
}

interface FileExplorerProps {
  activeFileId: string;
  onOpenFile: (fileId: string) => void;
  isOpen: boolean;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({ activeFileId, onOpenFile, isOpen }) => {
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(true);
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);

  if (!isOpen) return null;

  const getFileIcon = (type: FileItem['type']) => {
    switch (type) {
      case 'md':
        return <FileText className="w-4 h-4 text-[#42a5f5] shrink-0" />;
      case 'json':
        return <FileJson className="w-4 h-4 text-[#fbc02d] shrink-0" />;
      case 'pdf':
        return <FileSpreadsheet className="w-4 h-4 text-[#e57373] shrink-0" />;
      default:
        return <FileCode className="w-4 h-4 text-[#81c784] shrink-0" />;
    }
  };

  const mainFiles: FileItem[] = [
    { id: 'README.md', name: 'README.md', type: 'md' },
    { id: 'about-me.md', name: 'about-me.md', type: 'md' },
    { id: 'skills.json', name: 'skills.json', type: 'json' },
    { id: 'experience.md', name: 'experience.md', type: 'md' },
    { id: 'education.md', name: 'education.md', type: 'md' },
  ];

  const projectFiles: FileItem[] = [
    { id: 'github-projects', name: 'github-repos.json', type: 'json' },
  ];

  const contactFiles: FileItem[] = [
    { id: 'contact.json', name: 'contact.json', type: 'json' },
    { id: 'cv.pdf', name: 'cv.pdf', type: 'pdf' },
  ];

  return (
    <aside className="w-60 bg-[#252526] border-r border-[#3c3c3c] flex flex-col text-[#cccccc] text-xs font-sans select-none shrink-0 h-full overflow-y-auto">
      {/* Title / Section Header */}
      <div className="px-3 py-2 text-[11px] font-semibold text-[#858585] tracking-wider uppercase flex items-center justify-between border-b border-[#2d2d2d]">
        <span>Explorador</span>
        <span className="text-[10px] bg-[#333333] px-1.5 py-0.5 rounded text-[#cccccc]">PORTFOLIO</span>
      </div>

      {/* Workspace tree */}
      <div className="py-2">
        {/* Top Folder: portfolio */}
        <div>
          <button
            onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}
            className="w-full flex items-center px-2 py-1 hover:bg-[#2a2d2e] text-[#cccccc] font-medium"
          >
            {isPortfolioOpen ? (
              <ChevronDown className="w-4 h-4 mr-1 text-[#858585]" />
            ) : (
              <ChevronRight className="w-4 h-4 mr-1 text-[#858585]" />
            )}
            {isPortfolioOpen ? (
              <FolderOpen className="w-4 h-4 mr-1.5 text-[#dcb67a]" />
            ) : (
              <Folder className="w-4 h-4 mr-1.5 text-[#dcb67a]" />
            )}
            <span className="truncate">portfolio</span>
          </button>

          {/* Folder Content */}
          {isPortfolioOpen && (
            <div className="pl-4">
              {/* Root Files */}
              {mainFiles.map((file) => (
                <button
                  key={file.id}
                  onClick={() => onOpenFile(file.id)}
                  className={`w-full flex items-center px-2 py-1.5 rounded-sm transition-colors text-left ${
                    activeFileId === file.id
                      ? 'bg-[#37373d] text-white font-medium'
                      : 'hover:bg-[#2a2d2e] text-[#cccccc]'
                  }`}
                >
                  <span className="mr-2">{getFileIcon(file.type)}</span>
                  <span className="truncate">{file.name}</span>
                </button>
              ))}

              {/* Subfolder: projects/ */}
              <div className="mt-1">
                <button
                  onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                  className="w-full flex items-center px-2 py-1 hover:bg-[#2a2d2e] text-[#cccccc]"
                >
                  {isProjectsOpen ? (
                    <ChevronDown className="w-4 h-4 mr-1 text-[#858585]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 mr-1 text-[#858585]" />
                  )}
                  {isProjectsOpen ? (
                    <FolderOpen className="w-4 h-4 mr-1.5 text-[#64b5f6]" />
                  ) : (
                    <Folder className="w-4 h-4 mr-1.5 text-[#64b5f6]" />
                  )}
                  <span className="truncate">projects/</span>
                </button>

                {isProjectsOpen && (
                  <div className="pl-4">
                    {projectFiles.map((file) => (
                      <button
                        key={file.id}
                        onClick={() => onOpenFile(file.id)}
                        className={`w-full flex items-center px-2 py-1.5 rounded-sm transition-colors text-left ${
                          activeFileId === file.id
                            ? 'bg-[#37373d] text-white font-medium'
                            : 'hover:bg-[#2a2d2e] text-[#cccccc]'
                        }`}
                      >
                        <span className="mr-2">{getFileIcon(file.type)}</span>
                        <span className="truncate">{file.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact Files */}
              {contactFiles.map((file) => (
                <button
                  key={file.id}
                  onClick={() => onOpenFile(file.id)}
                  className={`w-full flex items-center px-2 py-1.5 rounded-sm transition-colors text-left ${
                    activeFileId === file.id
                      ? 'bg-[#37373d] text-white font-medium'
                      : 'hover:bg-[#2a2d2e] text-[#cccccc]'
                  }`}
                >
                  <span className="mr-2">{getFileIcon(file.type)}</span>
                  <span className="truncate">{file.name}</span>
                  {file.type === 'pdf' && (
                    <Download className="w-3 h-3 ml-auto text-[#858585] hover:text-white" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
