export interface JobExperience {
  company: string;
  role: string;
  period: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface CVData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  gitlab: string;
  summary: string;
  experience: JobExperience[];
  education: Education[];
  skills: SkillCategory[];
  languages: { language: string; level: string }[];
  softSkills: string[];
}

export const cvData: CVData = {
  name: "Enrique Navarrete-Amado Sánchez",
  title: "Desarrollador Web Front-End & Back-End | Técnico IT",
  email: "enriquenavarrete3000@gmail.com",
  phone: "+34691178855",
  location: "Monóvar, Alicante, España",
  linkedin: "https://www.linkedin.com/in/enrique-nav/",
  github: "https://github.com/Enrique002",
  gitlab: "https://gitlab.com/Enrique002",
  summary:
    "Soy Técnico Superior en Desarrollo de Aplicaciones Web (DAW) y Técnico en Sistemas Microinformáticos y Redes (SMR), con experiencia en desarrollo web y soporte informático. Me interesa especialmente el desarrollo de aplicaciones web, tanto en frontend como en backend, y seguir ampliando mis conocimientos en tecnologías de vanguardia.",
  experience: [
    {
      company: "Garmo Contact Center",
      role: "Desarrollador web",
      period: "01/11/2025 - 31/07/2026",
      startDate: "2025-11-01",
      endDate: "2026-07-31",
      location: "Monóvar, Alicante",
      description: [
        "Desarrollo y mantenimiento de aplicaciones web en entornos front-end y back-end.",
        "Diseño e implementación de interfaces de usuario responsivas, mejorando la experiencia de uso.",
        "Desarrollo de nuevas funcionalidades web utilizando Node.js, Angular y Bootstrap.",
        "Maquetación, pruebas y validación de componentes web.",
        "Corrección de errores y mantenimiento de aplicaciones existentes.",
        "Colaboración con el equipo de desarrollo en la implementación de nuevas funcionalidades.",
        "Optimización y mejora del rendimiento y la usabilidad de las aplicaciones web."
      ],
      technologies: ["Node.js", "Angular", "Bootstrap", "JavaScript", "HTML5/CSS3"]
    },
    {
      company: "Neo Franquicias",
      role: "Programador Web",
      period: "01/02/2025 - 24/10/2025",
      startDate: "2025-02-01",
      endDate: "2025-10-24",
      location: "Elda, Alicante",
      description: [
        "Desarrollo y mantenimiento de aplicaciones y funcionalidades web.",
        "Desarrollo de interfaces de usuario adaptadas a distintos dispositivos y resoluciones.",
        "Implementación de funcionalidades utilizando Node.js, Angular y Bootstrap.",
        "Integración y modificación de componentes front-end y back-end.",
        "Realización de pruebas y validación del correcto funcionamiento de las funcionalidades desarrolladas.",
        "Identificación y corrección de errores en las aplicaciones web.",
        "Colaboración con el equipo de desarrollo en la planificación e implementación de mejoras."
      ],
      technologies: ["Node.js", "Angular", "Bootstrap", "JavaScript", "REST APIs"]
    },
    {
      company: "OrthoLab",
      role: "Técnico/a informático/a",
      period: "28/02/2022 - 10/09/2022",
      startDate: "2022-02-28",
      endDate: "2022-09-10",
      location: "Elda, Alicante",
      description: [
        "Soporte técnico a usuarios y resolución de incidencias de hardware y software.",
        "Instalación, configuración y mantenimiento de equipos informáticos y periféricos.",
        "Migración y configuración de sistemas operativos, incluyendo entornos Windows.",
        "Administración de sistemas y usuarios en entornos corporativos.",
        "Gestión de incidencias relacionadas con redes, impresoras y conectividad.",
        "Uso de herramientas de acceso remoto para asistencia técnica.",
        "Colaboración en tareas de mantenimiento y mejora de la infraestructura IT."
      ],
      technologies: ["Windows Server", "Active Directory", "Redes", "Linux", "Soporte IT", "Virtualización"]
    }
  ],
  education: [
    {
      degree: "Técnico Superior en Desarrollo de Aplicaciones Web (DAW)",
      institution: "IES Enric Valor",
      location: "Monóvar, Alicante",
      period: "10/09/2023 - 12/06/2025"
    },
    {
      degree: "Técnico en Sistemas Microinformáticos y Redes (SMR)",
      institution: "IES Enric Valor",
      location: "Monóvar, Alicante",
      period: "10/09/2020 - 12/06/2022"
    },
    {
      degree: "Bachillerato",
      institution: "IES Enric Valor",
      location: "Monóvar, Alicante",
      period: "10/09/2018 - 12/06/2020"
    }
  ],
  skills: [
    {
      category: "Desarrollo Web",
      items: [
        "JavaScript (ES6+)",
        "Angular",
        "Node.js",
        "HTML5",
        "CSS3",
        "Bootstrap",
        "jQuery",
        "JSON",
        "Java",
        "PHP",
        "Docker"
      ]
    },
    {
      category: "Sistemas & Administración IT",
      items: [
        "Administración de Sistemas",
        "Gestión y Mantenimiento de SO",
        "Redes Informáticas",
        "Soporte Técnico & Support IT",
        "Windows / Windows Server",
        "Linux",
        "Active Directory",
        "Virtualización"
      ]
    },
    {
      category: "Bases de Datos & Seguridad",
      items: ["MySQL", "Bases de Datos Relacionales", "Ciberseguridad Informática"]
    }
  ],
  languages: [
    {
      language: "Español",
      level: "Lengua materna"
    }
  ],
  softSkills: [
    "Trabajo en equipo",
    "Resolución de problemas",
    "Comunicación eficaz",
    "Adaptación a entornos cambiantes",
    "Organización y gestión del tiempo"
  ]
};
