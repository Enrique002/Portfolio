import React from 'react';
import { 
  Mail, 
  Download, 
  Code2
} from 'lucide-react';

interface TitleBarProps {
  activeFile: string;
  onOpenFile: (fileId: string) => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({ activeFile: _activeFile, onOpenFile: _onOpenFile }) => {
  return (
    <header className="h-9 bg-[#323233] text-[#cccccc] text-xs flex items-center justify-between px-3 select-none border-b border-[#3c3c3c] z-20">
      {/* Left: Window control dots & Menu items */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1.5 mr-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block border border-[#e0443e]"></span>
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block border border-[#dea123]"></span>
          <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block border border-[#1aab29]"></span>
        </div>

        <div className="hidden md:flex items-center space-x-3 text-[#cccccc] text-xs font-sans">
          <span className="hover:text-white cursor-pointer transition-colors">Archivo</span>
          <span className="hover:text-white cursor-pointer transition-colors">Editar</span>
          <span className="hover:text-white cursor-pointer transition-colors">Ver</span>
          <span className="hover:text-white cursor-pointer transition-colors">Ir</span>
          <span className="hover:text-white cursor-pointer transition-colors">Terminal</span>
          <span className="hover:text-white cursor-pointer transition-colors">Ayuda</span>
        </div>
      </div>

      {/* Center: Title */}
      <div className="flex items-center space-x-2 text-[#9da5b4] font-sans truncate max-w-[300px] sm:max-w-none">
        <Code2 className="w-3.5 h-3.5 text-[#007acc] hidden sm:block" />
        <span className="truncate">Enrique Navarrete — Portfolio [VS Code]</span>
      </div>

      {/* Right: Quick Links & Opportunities Badge */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Availability Badge */}
        <div className="hidden lg:flex items-center space-x-1.5 bg-[#1e2d24] text-[#4ec9b0] px-2 py-0.5 rounded-full border border-[#234832] text-[11px]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium">Disponible para oportunidades</span>
        </div>

        {/* GitHub SVG */}
        <a 
          href="https://github.com/Enrique002" 
          target="_blank" 
          rel="noopener noreferrer" 
          title="GitHub"
          className="p-1 hover:bg-[#454545] rounded text-[#cccccc] hover:text-white transition-colors"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>

        {/* LinkedIn SVG */}
        <a 
          href="https://www.linkedin.com/in/enrique-nav/" 
          target="_blank" 
          rel="noopener noreferrer" 
          title="LinkedIn"
          className="p-1 hover:bg-[#454545] rounded text-[#cccccc] hover:text-white transition-colors"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
          </svg>
        </a>

        <a 
          href="mailto:enriquenavarrete3000@gmail.com" 
          title="Correo"
          className="p-1 hover:bg-[#454545] rounded text-[#cccccc] hover:text-white transition-colors"
        >
          <Mail className="w-3.5 h-3.5" />
        </a>

        {/* CV Download button */}
        <a 
          href="cv.pdf" 
          download="CV_Enrique_Navarrete.pdf"
          title="Descargar CV (PDF)"
          className="flex items-center space-x-1 bg-[#0e639c] hover:bg-[#1177bb] text-white px-2 py-0.5 rounded text-[11px] font-medium transition-colors"
        >
          <Download className="w-3 h-3" />
          <span className="hidden sm:inline">CV</span>
        </a>
      </div>
    </header>
  );
};
