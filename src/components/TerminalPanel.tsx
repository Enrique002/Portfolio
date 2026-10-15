import React, { useState } from 'react';
import { 
  Terminal as TerminalIcon, 
  X, 
  Info, 
  HelpCircle,
  Trash2
} from 'lucide-react';
import { cvData } from '../data/cvData';

interface TerminalPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFile: (fileId: string) => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const TerminalPanel: React.FC<TerminalPanelProps> = ({ isOpen, onClose, onOpenFile }) => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'output' | 'about'>('terminal');
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: 'welcome',
      command: 'welcome',
      output: (
        <div className="space-y-1 text-[#cccccc]">
          <p className="text-[#4ec9b0]">Escribe <span className="text-[#ce9178] font-bold">help</span> para listar los comandos disponibles.</p>
        </div>
      )
    }
  ]);

  if (!isOpen) return null;

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-xs">
            <p className="text-[#ce9178] font-semibold">Comandos disponibles:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pl-2">
              <div><span className="text-[#569cd6]">ls</span> : Listar archivos del portfolio</div>
              <div><span className="text-[#569cd6]">cat [archivo]</span> : Mostrar o abrir un archivo</div>
              <div><span className="text-[#569cd6]">skills</span> : Mostrar resúmen de tecnologías</div>
              <div><span className="text-[#569cd6]">contact</span> : Mostrar vías de contacto</div>
              <div><span className="text-[#569cd6]">experience</span> : Mostrar experiencia reciente</div>
              <div><span className="text-[#569cd6]">cv</span> : Abrir / descargar CV en PDF</div>
              <div><span className="text-[#569cd6]">clear</span> : Limpiar la terminal</div>
            </div>
          </div>
        );
        break;

      case 'ls':
        outputNode = (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#9cdcfe]">
            <span>README.md</span>
            <span>about-me.md</span>
            <span>skills.json</span>
            <span>experience.md</span>
            <span>education.md</span>
            <span>projects/</span>
            <span>contact.json</span>
            <span className="text-[#f48771]">cv.pdf</span>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'skills':
        outputNode = (
          <div className="text-xs space-y-1 text-[#dcdcaa]">
            <p className="font-semibold text-[#4ec9b0]">Principales habilidades técnicas:</p>
            {cvData.skills.map((s, idx) => (
              <p key={idx}><span className="text-[#ce9178]">{s.category}:</span> {s.items.join(', ')}</p>
            ))}
          </div>
        );
        break;

      case 'experience':
        outputNode = (
          <div className="text-xs space-y-2">
            {cvData.experience.map((exp, i) => (
              <div key={i} className="border-l-2 border-[#007acc] pl-2">
                <p className="font-bold text-[#569cd6]">{exp.role} @ {exp.company}</p>
                <p className="text-[11px] text-[#858585]">{exp.period} | {exp.location}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="text-xs space-y-1 text-[#cccccc]">
            <p>📧 Email: <a href={`mailto:${cvData.email}`} className="text-[#3794ff] underline">{cvData.email}</a></p>
            <p>💼 LinkedIn: <a href={cvData.linkedin} target="_blank" rel="noreferrer" className="text-[#3794ff] underline">{cvData.linkedin}</a></p>
            <p>🐙 GitHub: <a href={cvData.github} target="_blank" rel="noreferrer" className="text-[#3794ff] underline">{cvData.github}</a></p>
            <p>📍 Ubicación: {cvData.location}</p>
          </div>
        );
        break;

      case 'cv':
        onOpenFile('cv.pdf');
        outputNode = <p className="text-xs text-[#4ec9b0]">Abriendo y ofreciendo descarga de cv.pdf...</p>;
        break;

      case 'cat readme.md':
      case 'readme':
        onOpenFile('README.md');
        outputNode = <p className="text-xs text-[#4ec9b0]">Abriendo README.md en el editor...</p>;
        break;

      case 'cat about-me.md':
      case 'about':
        onOpenFile('about-me.md');
        outputNode = <p className="text-xs text-[#4ec9b0]">Abriendo about-me.md en el editor...</p>;
        break;

      case 'cat skills.json':
        onOpenFile('skills.json');
        outputNode = <p className="text-xs text-[#4ec9b0]">Abriendo skills.json en el editor...</p>;
        break;

      default:
        outputNode = (
          <p className="text-xs text-[#f48771]">
            Comando no reconocido: '{cmd}'. Escribe <span className="font-bold underline cursor-pointer" onClick={() => setInputVal('help')}>help</span> para ver los comandos válidos.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: inputVal,
        output: outputNode
      }
    ]);
    setInputVal('');
  };

  return (
    <div className="h-48 sm:h-56 bg-[#1e1e1e] border-t border-[#3c3c3c] flex flex-col font-mono text-xs select-none shrink-0 z-10">
      {/* Panel header tabs */}
      <div className="bg-[#252526] px-3 h-8 flex items-center justify-between border-b border-[#3c3c3c]">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center space-x-1.5 h-8 border-b-2 font-sans font-medium transition-colors cursor-pointer ${
              activeTab === 'terminal'
                ? 'border-[#007acc] text-white'
                : 'border-transparent text-[#858585] hover:text-[#cccccc]'
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>TERMINAL</span>
          </button>

          <button
            onClick={() => setActiveTab('output')}
            className={`flex items-center space-x-1.5 h-8 border-b-2 font-sans font-medium transition-colors cursor-pointer ${
              activeTab === 'output'
                ? 'border-[#007acc] text-white'
                : 'border-transparent text-[#858585] hover:text-[#cccccc]'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>OUTPUT</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center space-x-1.5 h-8 border-b-2 font-sans font-medium transition-colors cursor-pointer ${
              activeTab === 'about'
                ? 'border-[#007acc] text-white'
                : 'border-transparent text-[#858585] hover:text-[#cccccc]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>ABOUT</span>
          </button>
        </div>

        {/* Panel controls */}
        <div className="flex items-center space-x-2 text-[#858585]">
          <button
            onClick={() => setHistory([])}
            title="Limpiar consola"
            className="hover:text-white transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            title="Cerrar panel"
            className="hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 p-3 overflow-y-auto font-mono text-xs">
        {activeTab === 'terminal' && (
          <div className="space-y-2">
            <div className="text-[#858585] text-[11px]">
              Portfolio Shell v1.0.0 — Tipo 'help' para ver los comandos interactivos.
            </div>

            {history.map((log) => (
              <div key={log.id} className="space-y-1">
                <div className="flex items-center space-x-2 text-[#4ec9b0]">
                  <span className="text-[#ce9178]">guest@enrique-portfolio</span>
                  <span className="text-[#cccccc]">:~$</span>
                  <span className="text-white font-medium">{log.command}</span>
                </div>
                <div className="pl-3">{log.output}</div>
              </div>
            ))}

            {/* Input Line */}
            <form onSubmit={handleCommandSubmit} className="flex items-center space-x-2 pt-1">
              <span className="text-[#ce9178]">guest@enrique-portfolio</span>
              <span className="text-[#cccccc]">:~$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs focus:ring-0 p-0"
                placeholder="escribe un comando..."
                autoFocus
              />
            </form>
          </div>
        )}

        {activeTab === 'output' && (
          <div className="text-[#cccccc] space-y-1 font-mono text-[11px]">
            <p className="text-[#4ec9b0]">[Info] Cargado sistema de Portfolio en estética VS Code v1.0.</p>
            <p className="text-[#9cdcfe]">[Info] API de GitHub sincronizada para usuario @Enrique002.</p>
            <p className="text-[#dcdcaa]">[Build] Bundle optimizado cargado correctamente.</p>
            <p className="text-[#858585]">[Status] Estado: Disponible para oportunidades laborales.</p>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="text-[#cccccc] space-y-2 font-sans text-xs max-w-2xl">
            <p className="font-bold text-white text-sm">Entorno Portfolio VS Code</p>
            <p>
              Diseñado y desarrollado para emular fielmente la interfaz de usuario de Visual Studio Code, ofreciendo una experiencia interactiva para consultar datos profesionales, proyectos en directo e información de CV.
            </p>
            <div className="flex items-center space-x-4 pt-2 text-[#858585] text-[11px]">
              <span>Desarrollado por Enrique Navarrete</span>
              <span>•</span>
              <span>Stack: React + TS + Tailwind</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
