# Portfolio Personal — Estética Visual Studio Code

Este proyecto es un portfolio web completo, moderno y responsive para **Enrique Navarrete-Amado Sánchez** (Desarrollador Web Front-End & Back-End y Técnico IT), diseñado visualmente con la estética de **Visual Studio Code**.

![Portfolio Preview](avatar.jpg)

---

## 🚀 Características Principales

1. **Interfaz Inmersiva VS Code**:
   - **Barra Superior (TitleBar)**: Nombre profesional, navegación, indicador "Disponible para oportunidades" y accesos directos a GitHub, LinkedIn, Email y descarga directa de CV.
   - **Barra Lateral de Actividad (ActivityBar)**: Iconos interactivos para navegar a Explorador, Proyectos, Perfil, Habilidades, Experiencia y Contacto.
   - **Explorador de Archivos (FileExplorer)**: Estructura de archivos de proyecto (`README.md`, `about-me.md`, `skills.json`, `experience.md`, `education.md`, `projects/github-repos.json`, `contact.json`, `cv.pdf`).
   - **Editor Central con Pestañas (TabEditor)**: Permite abrir múltiples secciones, alternar entre pestañas y cerrar archivos como en un editor real.
   - **Terminal Interactiva (TerminalPanel)**: Consola ejecutable con comandos ficticios e inocuos (`help`, `ls`, `skills`, `experience`, `contact`, `cv`, `clear`), pestañas de OUTPUT y ABOUT, y botón de contracción.
   - **Barra de Estado (StatusBar)**: Muestra la rama de Git (`main*`), errores (0), advertencias (0), codificación UTF-8, espacios e indicador de formato Prettier.

2. **Integración Dinámica con GitHub API**:
   - Consulta dinámica a la API pública de GitHub para el usuario **`Enrique002`**.
   - Soporte para **paginación automática** (obtiene todos los repositorios sin limitar a los primeros 30).
   - **Estrategia de Caché Resiliente**: Guarda los datos en `localStorage` con expiración de 30 minutos y fallback automático si se supera la tasa límite de GitHub (Rate limit 403).
   - **Filtros y Búsqueda**: Filtrado por lenguaje, buscador por texto, ordenador por fecha de actualización, estrellas o nombre, y casilla para mostrar repositorios destacados.

3. **Curriculum Vitae Integrado en PDF**:
   - Generado en formato PDF con la información oficial proporcionada en el CV.
   - Guardado en `public/cv.pdf`.
   - Botón visible para **descarga directa** (`CV_Enrique_Navarrete.pdf`) y botón para **visualizar en una nueva pestaña**.

4. **Diseño Responsive & Accesibilidad**:
   - Adaptación completa a dispositivos móviles, tablets y ordenadores de escritorio.
   - En móviles se habilita un menú de cajón (drawer) para el explorador con fondo translúcido.
   - Tema oscuro con alto contraste (`#1e1e1e`), tipografía monoespaciada para código y etiquetas ARIA de accesibilidad.

---

## 🛠️ Tecnologías Utilizadas

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Generación de PDF**: [ReportLab (Python)](https://www.reportlab.com/)

---

## 💻 Instalación y Ejecución Local

Para ejecutar el proyecto localmente en tu máquina:

```bash
# 1. Clonar el repositorio
git clone https://github.com/Enrique002/portfolio.git
cd portfolio

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## 📦 Compilación y Despliegue (GitHub Pages)

Para generar el bundle de producción optimizado:

```bash
npm run build
```

El código compilado se generará en la carpeta `/dist`.

### Despliegue en GitHub Pages

1. La configuración de Vite incluye `base: './'` en `vite.config.ts`, lo que garantiza que las rutas a assets, imágenes y al PDF del CV funcionen de manera relativa en cualquier subdirectorio de GitHub Pages.
2. Puedes desplegar la carpeta `dist` utilizando la acción estándar de GitHub Pages o mediante el paquete `gh-pages`:

```bash
npx gh-pages -d dist
```

---

## 📁 Resumen de Archivos Creados y Modificados

- `src/App.tsx`: Layout principal del entorno VS Code (ActivityBar, FileExplorer, TabEditor, TerminalPanel, StatusBar).
- `src/components/TitleBar.tsx`: Barra de título superior con enlaces rápidos y badge de disponibilidad.
- `src/components/ActivityBar.tsx`: Barra lateral con accesos directos a vistas.
- `src/components/FileExplorer.tsx`: Árbol de archivos interactivo del portfolio.
- `src/components/TabEditor.tsx`: Renderizador de archivos Markdown y JSON.
- `src/components/ProjectsView.tsx`: Vista dinámica de repositorios con filtros, ordenación y buscador.
- `src/components/TerminalPanel.tsx`: Panel de terminal interactiva con intérprete de comandos.
- `src/components/StatusBar.tsx`: Barra de estado inferior.
- `src/data/cvData.ts`: Objeto tipado con los datos del CV de Enrique Navarrete.
- `src/services/githubService.ts`: Servicio para consulta a la API de GitHub con paginación, caché y manejo de errores.
- `public/cv.pdf`: Curriculum Vitae en formato PDF descargable.
- `public/avatar.jpg`: Fotografía de perfil oficial.
- `generate_pdf.py`: Script para regenerar el PDF del CV si fuese necesario.
