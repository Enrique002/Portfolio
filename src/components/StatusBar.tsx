import React from 'react';
import { 
  GitBranch, 
  Check, 
  XCircle, 
  AlertTriangle, 
  Bell, 
  Terminal as TerminalIcon
} from 'lucide-react';

interface StatusBarProps {
  activeFile: string;
  isTerminalOpen: boolean;
  toggleTerminal: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  activeFile,
  isTerminalOpen,
  toggleTerminal
}) => {
  return (
    <footer className="h-6 bg-[#007acc] text-white text-[11px] font-sans flex items-center justify-between px-2 select-none z-20 shrink-0">
      {/* Left side items */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1 hover:bg-[#005999] px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          <GitBranch className="w-3 h-3" />
          <span>main*</span>
        </div>

        <div className="flex items-center space-x-1 hover:bg-[#005999] px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          <XCircle className="w-3 h-3" />
          <span>0</span>
          <AlertTriangle className="w-3 h-3 ml-1" />
          <span>0</span>
        </div>

        <button 
          onClick={toggleTerminal}
          className="hidden sm:flex items-center space-x-1 hover:bg-[#005999] px-1.5 py-0.5 rounded transition-colors cursor-pointer"
        >
          <TerminalIcon className="w-3 h-3" />
          <span>{isTerminalOpen ? 'Ocultar Terminal' : 'Terminal'}</span>
        </button>
      </div>

      {/* Right side items */}
      <div className="flex items-center space-x-3 text-[10.5px]">
        <div className="hidden sm:block hover:bg-[#005999] px-1.5 py-0.5 rounded cursor-pointer">
          Ln 1, Col 1
        </div>

        <div className="hidden sm:block hover:bg-[#005999] px-1.5 py-0.5 rounded cursor-pointer">
          Espacios: 2
        </div>

        <div className="hover:bg-[#005999] px-1.5 py-0.5 rounded cursor-pointer">
          UTF-8
        </div>

        <div className="hidden md:block hover:bg-[#005999] px-1.5 py-0.5 rounded cursor-pointer">
          {activeFile.endsWith('.json') ? 'JSON' : activeFile.endsWith('.md') ? 'Markdown' : 'TypeScript React'}
        </div>

        <div className="flex items-center space-x-1 hover:bg-[#005999] px-1.5 py-0.5 rounded cursor-pointer">
          <Check className="w-3 h-3 text-emerald-300" />
          <span>Prettier</span>
        </div>

        <div className="hover:bg-[#005999] p-1 rounded cursor-pointer">
          <Bell className="w-3 h-3" />
        </div>
      </div>
    </footer>
  );
};
