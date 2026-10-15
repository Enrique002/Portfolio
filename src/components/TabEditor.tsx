import React from 'react';
import { cvData } from '../data/cvData';
import { 
  Briefcase, 
  GraduationCap, 
  Code, 
  Download, 
  Mail, 
  ExternalLink,
  MapPin,
  Calendar,
  Sparkles,
  FileText
} from 'lucide-react';

interface TabEditorProps {
  activeFileId: string;
  onOpenFile: (fileId: string) => void;
}

export const TabEditor: React.FC<TabEditorProps> = ({ activeFileId, onOpenFile }) => {

  const renderContent = () => {
    switch (activeFileId) {
      case 'README.md':
        return (
          <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8 font-sans text-[#cccccc]">
            {/* Hero Section */}
            <div className="bg-[#252526] p-6 sm:p-8 rounded-xl border border-[#3c3c3c] flex flex-col md:flex-row items-center md:items-start gap-6 shadow-xl">
              <img
                src="avatar.jpg"
                alt="Enrique Navarrete"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-[#007acc] shadow-lg shrink-0"
              />
              <div className="space-y-3 text-center md:text-left flex-1">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {cvData.name}
                  </h1>
                  <span className="bg-[#1e2d24] text-[#4ec9b0] text-xs px-2.5 py-1 rounded-full border border-[#234832] font-mono">
                    DAW & SMR
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#569cd6] font-medium">
                  {cvData.title}
                </p>

                <p className="text-xs sm:text-sm text-[#9da5b4] leading-relaxed">
                  {cvData.summary}
                </p>

                <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3 text-xs">
                  <a
                    href="cv.pdf"
                    download="CV_Enrique_Navarrete.pdf"
                    className="bg-[#0e639c] hover:bg-[#1177bb] text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all shadow-md cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar CV (PDF)</span>
                  </a>

                  <a
                    href="cv.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#333333] hover:bg-[#454545] text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all border border-[#454545] cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Ver CV en nueva pestaña</span>
                  </a>

                  <button
                    onClick={() => onOpenFile('github-projects')}
                    className="bg-[#252526] hover:bg-[#333333] text-[#4ec9b0] border border-[#234832] px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Ver Proyectos GitHub</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Specs / JSON style grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                onClick={() => onOpenFile('experience.md')}
                className="bg-[#252526] p-5 rounded-lg border border-[#3c3c3c] hover:border-[#007acc] transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-3 text-[#569cd6] mb-2">
                  <Briefcase className="w-5 h-5" />
                  <h3 className="font-bold text-white group-hover:text-[#569cd6] transition-colors">Experiencia</h3>
                </div>
                <p className="text-xs text-[#858585]">
                  Garmo Contact Center, Neo Franquicias, OrthoLab. Desarrollo Web & Sistemas IT.
                </p>
              </div>

              <div 
                onClick={() => onOpenFile('skills.json')}
                className="bg-[#252526] p-5 rounded-lg border border-[#3c3c3c] hover:border-[#007acc] transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-3 text-[#4ec9b0] mb-2">
                  <Code className="w-5 h-5" />
                  <h3 className="font-bold text-white group-hover:text-[#4ec9b0] transition-colors">Stack Técnico</h3>
                </div>
                <p className="text-xs text-[#858585]">
                  Angular, Node.js, JavaScript, HTML5/CSS3, Bootstrap, PHP, MySQL, Linux, Docker.
                </p>
              </div>

              <div 
                onClick={() => onOpenFile('education.md')}
                className="bg-[#252526] p-5 rounded-lg border border-[#3c3c3c] hover:border-[#007acc] transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-3 text-[#ce9178] mb-2">
                  <GraduationCap className="w-5 h-5" />
                  <h3 className="font-bold text-white group-hover:text-[#ce9178] transition-colors">Titulación</h3>
                </div>
                <p className="text-xs text-[#858585]">
                  Técnico Superior DAW y Técnico SMR en IES Enric Valor.
                </p>
              </div>
            </div>

            {/* Markdown simulation block */}
            <div className="bg-[#1e1e1e] p-5 rounded-lg border border-[#3c3c3c] font-mono text-xs space-y-2">
              <p className="text-[#6a9955]">// README.md — Portafolio Personal</p>
              <p className="text-[#dcdcaa]"><span className="text-[#569cd6]">const</span> developer = &#123;</p>
              <p className="pl-4 text-[#9cdcfe]">nombre: <span className="text-[#ce9178]">"{cvData.name}"</span>,</p>
              <p className="pl-4 text-[#9cdcfe]">titulacion: <span className="text-[#ce9178]">"Técnico Superior DAW & SMR"</span>,</p>
              <p className="pl-4 text-[#9cdcfe]">especialidades: [<span className="text-[#ce9178]">"Front-end"</span>, <span className="text-[#ce9178]">"Back-end"</span>, <span className="text-[#ce9178]">"Sistemas"</span>],</p>
              <p className="pl-4 text-[#9cdcfe]">estado: <span className="text-[#4ec9b0]">"Open for work"</span></p>
              <p className="text-[#dcdcaa]">&#125;;</p>
            </div>
          </div>
        );

      case 'about-me.md':
        return (
          <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6 font-sans text-[#cccccc]">
            <h1 className="text-2xl font-bold text-white border-b border-[#3c3c3c] pb-3 flex items-center space-x-2">
              <span className="text-[#007acc]">#</span>
              <span>about-me.md — Sobre Mí</span>
            </h1>

            <div className="bg-[#252526] p-6 rounded-lg border border-[#3c3c3c] space-y-4">
              <h2 className="text-lg font-semibold text-[#569cd6]">Perfil Profesional</h2>
              <p className="text-sm leading-relaxed text-[#d4d4d4]">
                {cvData.summary}
              </p>
              <p className="text-sm leading-relaxed text-[#d4d4d4]">
                Cuento con una doble vertiente formativa y práctica: por un lado, una sólida preparación técnica en desarrollo de software full-stack web (DAW), abarcando desde el diseño de componentes en el frontend con frameworks modernos como Angular hasta la creación de APIs y lógica de servidor con Node.js y bases de datos. Por otro lado, dispongo de experiencia en la administración de redes, mantenimiento de sistemas y soporte IT (SMR).
              </p>
            </div>

            <div className="bg-[#252526] p-6 rounded-lg border border-[#3c3c3c] space-y-3">
              <h2 className="text-lg font-semibold text-[#4ec9b0]">Competencias Clave</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {cvData.softSkills.map((skill, i) => (
                  <div key={i} className="flex items-center space-x-2 bg-[#1e1e1e] p-2.5 rounded border border-[#333333]">
                    <span className="w-2 h-2 rounded-full bg-[#4ec9b0]" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#252526] p-6 rounded-lg border border-[#3c3c3c] space-y-3">
              <h2 className="text-lg font-semibold text-[#ce9178]">Ubicación & Idiomas</h2>
              <div className="flex flex-col sm:flex-row gap-4 text-xs">
                <div className="flex items-center space-x-2 bg-[#1e1e1e] px-4 py-3 rounded border border-[#333333] flex-1">
                  <MapPin className="w-4 h-4 text-[#e5c07b]" />
                  <span>{cvData.location}</span>
                </div>
                {cvData.languages.map((lang, idx) => (
                  <div key={idx} className="flex items-center space-x-2 bg-[#1e1e1e] px-4 py-3 rounded border border-[#333333] flex-1">
                    <span className="text-[#569cd6] font-bold">Idioma:</span>
                    <span>{lang.language} ({lang.level})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'skills.json':
        return (
          <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6 font-mono text-xs">
            <div className="bg-[#1e1e1e] p-6 rounded-lg border border-[#3c3c3c] space-y-1 overflow-x-auto">
              <p className="text-[#6a9955]">// skills.json — Habilidades técnicas y tecnológicas</p>
              <p className="text-[#da70d6]">&#123;</p>
              
              {cvData.skills.map((category, idx) => (
                <div key={idx} className="pl-4 my-2">
                  <p className="text-[#9cdcfe]">
                    "<span className="text-[#ce9178]">{category.category}</span>": [
                  </p>
                  <div className="pl-6 flex flex-wrap gap-1.5 my-1">
                    {category.items.map((item, itemIdx) => (
                      <span key={itemIdx} className="bg-[#252526] text-[#b5cea8] border border-[#3c3c3c] px-2 py-0.5 rounded text-[11px]">
                        "{item}"{itemIdx < category.items.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                  <p className="text-[#9cdcfe]">]{idx < cvData.skills.length - 1 ? ',' : ''}</p>
                </div>
              ))}

              <p className="text-[#da70d6]">&#125;</p>
            </div>
          </div>
        );

      case 'experience.md':
        return (
          <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6 font-sans text-[#cccccc]">
            <h1 className="text-2xl font-bold text-white border-b border-[#3c3c3c] pb-3 flex items-center space-x-2">
              <Briefcase className="w-6 h-6 text-[#007acc]" />
              <span>experience.md — Experiencia Laboral</span>
            </h1>

            <div className="space-y-6">
              {cvData.experience.map((exp, idx) => (
                <div key={idx} className="bg-[#252526] p-6 rounded-lg border border-[#3c3c3c] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#333333] pb-3">
                    <div>
                      <h2 className="text-lg font-bold text-white">{exp.role}</h2>
                      <p className="text-sm font-semibold text-[#569cd6]">{exp.company}</p>
                    </div>
                    <div className="text-xs text-[#858585] flex flex-col sm:items-end">
                      <span className="flex items-center space-x-1"><Calendar className="w-3.5 h-3.5" /><span>{exp.period}</span></span>
                      <span className="flex items-center space-x-1"><MapPin className="w-3.5 h-3.5" /><span>{exp.location}</span></span>
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs text-[#d4d4d4] list-disc list-inside leading-relaxed">
                    {exp.description.map((desc, dIdx) => (
                      <li key={dIdx}>{desc}</li>
                    ))}
                  </ul>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="bg-[#1e1e1e] text-[#4ec9b0] text-[11px] px-2.5 py-0.5 rounded border border-[#333333]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'education.md':
        return (
          <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6 font-sans text-[#cccccc]">
            <h1 className="text-2xl font-bold text-white border-b border-[#3c3c3c] pb-3 flex items-center space-x-2">
              <GraduationCap className="w-6 h-6 text-[#ce9178]" />
              <span>education.md — Formación Académica</span>
            </h1>

            <div className="grid grid-cols-1 gap-4">
              {cvData.education.map((edu, idx) => (
                <div key={idx} className="bg-[#252526] p-6 rounded-lg border border-[#3c3c3c] space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h2 className="text-base font-bold text-white">{edu.degree}</h2>
                    <span className="text-xs text-[#858585] font-mono">{edu.period}</span>
                  </div>
                  <p className="text-xs text-[#569cd6] font-medium">{edu.institution} — {edu.location}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contact.json':
        return (
          <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6 font-sans text-[#cccccc]">
            <h1 className="text-2xl font-bold text-white border-b border-[#3c3c3c] pb-3 flex items-center space-x-2">
              <Mail className="w-6 h-6 text-[#4ec9b0]" />
              <span>contact.json — Información de Contacto</span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`mailto:${cvData.email}`}
                className="bg-[#252526] hover:bg-[#2a2d2e] p-5 rounded-lg border border-[#3c3c3c] hover:border-[#007acc] transition-all flex items-center space-x-4 group cursor-pointer"
              >
                <div className="bg-[#1e1e1e] p-3 rounded-full text-[#4ec9b0] group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-[#858585]">Correo Electrónico</p>
                  <p className="text-sm font-semibold text-white group-hover:text-[#569cd6] transition-colors truncate">
                    {cvData.email}
                  </p>
                </div>
              </a>

              <a
                href={cvData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#252526] hover:bg-[#2a2d2e] p-5 rounded-lg border border-[#3c3c3c] hover:border-[#007acc] transition-all flex items-center space-x-4 group cursor-pointer"
              >
                <div className="bg-[#1e1e1e] p-3 rounded-full text-[#007acc] group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#858585]">LinkedIn</p>
                  <p className="text-sm font-semibold text-white group-hover:text-[#569cd6] transition-colors truncate">
                    linkedin.com/in/enrique-nav/
                  </p>
                </div>
              </a>

              <a
                href={cvData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#252526] hover:bg-[#2a2d2e] p-5 rounded-lg border border-[#3c3c3c] hover:border-[#007acc] transition-all flex items-center space-x-4 group cursor-pointer"
              >
                <div className="bg-[#1e1e1e] p-3 rounded-full text-[#cccccc] group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#858585]">GitHub</p>
                  <p className="text-sm font-semibold text-white group-hover:text-[#569cd6] transition-colors truncate">
                    github.com/Enrique002
                  </p>
                </div>
              </a>

              <a
                href={cvData.gitlab}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#252526] hover:bg-[#2a2d2e] p-5 rounded-lg border border-[#3c3c3c] hover:border-[#007acc] transition-all flex items-center space-x-4 group cursor-pointer"
              >
                <div className="bg-[#1e1e1e] p-3 rounded-full text-[#e57373] group-hover:scale-110 transition-transform">
                  <ExternalLink className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-[#858585]">GitLab</p>
                  <p className="text-sm font-semibold text-white group-hover:text-[#569cd6] transition-colors truncate">
                    gitlab.com/Enrique002
                  </p>
                </div>
              </a>
            </div>
          </div>
        );

      case 'cv.pdf':
        return (
          <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6 text-center text-[#cccccc]">
            <div className="bg-[#252526] p-8 rounded-xl border border-[#3c3c3c] space-y-6">
              <FileText className="w-16 h-16 text-[#e57373] mx-auto" />
              <div className="space-y-2">
                <h1 className="text-xl font-bold text-white">Curriculum Vitae — Enrique Navarrete</h1>
                <p className="text-xs text-[#858585]">Documento oficial en PDF con todos los detalles profesionales.</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <a
                  href="cv.pdf"
                  download="CV_Enrique_Navarrete.pdf"
                  className="bg-[#0e639c] hover:bg-[#1177bb] text-white px-6 py-2.5 rounded-lg font-medium text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar CV (PDF)</span>
                </a>

                <a
                  href="cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#333333] hover:bg-[#454545] text-white px-6 py-2.5 rounded-lg font-medium text-xs flex items-center justify-center space-x-2 transition-all border border-[#454545] cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir PDF en pestaña nueva</span>
                </a>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#1e1e1e]">
      {renderContent()}
    </div>
  );
};
