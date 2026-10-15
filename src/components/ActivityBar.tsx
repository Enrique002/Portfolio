import React from 'react';
import { 
  Files, 
  FolderGit2, 
  User, 
  Code, 
  Briefcase, 
  Mail, 
  Terminal as TerminalIcon,
  Settings
} from 'lucide-react';

export type ActivityTab = 'explorer' | 'projects' | 'profile' | 'skills' | 'experience' | 'contact';

interface ActivityBarProps {
  activeTab: ActivityTab;
  onSelectTab: (tab: ActivityTab) => void;
  toggleTerminal: () => void;
  isTerminalOpen: boolean;
}

export const ActivityBar: React.FC<ActivityBarProps> = ({
  activeTab,
  onSelectTab,
  toggleTerminal,
  isTerminalOpen
}) => {
  const mainNavItems = [
    { id: 'explorer' as ActivityTab, icon: Files, label: 'Explorador (Archivos)' },
    { id: 'projects' as ActivityTab, icon: FolderGit2, label: 'Proyectos de GitHub' },
    { id: 'profile' as ActivityTab, icon: User, label: 'Sobre mí' },
    { id: 'skills' as ActivityTab, icon: Code, label: 'Habilidades & Tecnologías' },
    { id: 'experience' as ActivityTab, icon: Briefcase, label: 'Experiencia Laboral' },
    { id: 'contact' as ActivityTab, icon: Mail, label: 'Contacto' },
  ];

  return (
    <aside className="w-12 bg-[#333333] border-r border-[#3c3c3c] flex flex-col justify-between items-center py-2 z-10 shrink-0">
      {/* Upper activity buttons */}
      <div className="flex flex-col space-y-1 w-full items-center">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              title={item.label}
              className={`relative p-2.5 rounded hover:text-white transition-colors w-full flex justify-center ${
                isActive ? 'text-white bg-[#252526]' : 'text-[#858585]'
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#007acc] rounded-r" />
              )}
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>

      {/* Bottom utility buttons */}
      <div className="flex flex-col space-y-1 w-full items-center">
        <button
          onClick={toggleTerminal}
          title={isTerminalOpen ? "Ocultar Terminal" : "Mostrar Terminal"}
          className={`relative p-2.5 rounded hover:text-white transition-colors w-full flex justify-center ${
            isTerminalOpen ? 'text-white' : 'text-[#858585]'
          }`}
        >
          <TerminalIcon className="w-5 h-5" />
        </button>

        <button
          onClick={() => onSelectTab('contact')}
          title="Configuración & Info"
          className="p-2.5 text-[#858585] hover:text-white transition-colors w-full flex justify-center"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};
