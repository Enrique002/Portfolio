import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Star, 
  GitFork, 
  ExternalLink, 
  RotateCw, 
  Code2, 
  AlertCircle,
  Sparkles,
  Filter
} from 'lucide-react';
import { fetchGitHubRepos } from '../services/githubService';
import type { GitHubRepo } from '../services/githubService';

export const ProjectsView: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fromCache, setFromCache] = useState<boolean>(false);
  
  // Filtering & Sorting
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'name'>('updated');
  const [onlyFeatured, setOnlyFeatured] = useState<boolean>(false);

  const loadRepos = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);
    const result = await fetchGitHubRepos(forceRefresh);
    setRepos(result.repos);
    setFromCache(result.fromCache);
    if (result.error) {
      setError(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadRepos();
  }, []);

  // Unique languages for filtering
  const languages = ['All', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean) as string[]))];

  // Filter & Sort logic
  const filteredRepos = repos
    .filter(repo => {
      const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesLanguage = selectedLanguage === 'All' || repo.language === selectedLanguage;
      const matchesFeatured = !onlyFeatured || repo.isFeatured;
      return matchesSearch && matchesLanguage && matchesFeatured;
    })
    .sort((a, b) => {
      if (sortBy === 'updated') {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      } else if (sortBy === 'stars') {
        return b.stargazers_count - a.stargazers_count;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

  const getLanguageColor = (lang: string | null) => {
    switch (lang?.toLowerCase()) {
      case 'javascript': return '#f1e05a';
      case 'typescript': return '#3178c6';
      case 'html': return '#e34c26';
      case 'css': return '#563d7c';
      case 'java': return '#b07219';
      case 'php': return '#4f5d95';
      case 'python': return '#3572A5';
      case 'shell': return '#89e051';
      default: return '#007acc';
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto font-sans text-[#cccccc] space-y-6">
      {/* Header Banner */}
      <div className="bg-[#252526] p-5 rounded-lg border border-[#3c3c3c] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6 text-[#007acc] fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <h1 className="text-xl font-bold text-white">Repositorios Públicos de GitHub</h1>
            {fromCache && (
              <span className="bg-[#333333] text-[#858585] text-[11px] px-2 py-0.5 rounded-full border border-[#454545]" title="Datos cargados de caché local para optimización y resiliencia">
                Caché local
              </span>
            )}
          </div>
          <p className="text-xs text-[#858585] mt-1">
            Sincronizado dinámicamente desde la API pública de GitHub para <span className="text-[#4ec9b0] font-mono">@Enrique002</span>.
          </p>
        </div>

        <button
          onClick={() => loadRepos(true)}
          disabled={loading}
          className="flex items-center space-x-2 bg-[#0e639c] hover:bg-[#1177bb] text-white px-3 py-1.5 rounded text-xs transition-colors disabled:opacity-50 shrink-0 cursor-pointer"
        >
          <RotateCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Actualizar de GitHub</span>
        </button>
      </div>

      {/* Error alert if any */}
      {error && (
        <div className="bg-[#2d1c1c] border border-[#a12626] text-[#f48771] p-3 rounded text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Controls: Search, Filters & Sorting */}
      <div className="bg-[#252526] p-4 rounded-lg border border-[#3c3c3c] space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#858585]" />
            <input
              type="text"
              placeholder="Buscar proyectos por nombre o descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e1e1e] border border-[#3c3c3c] rounded pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#858585] focus:outline-none focus:border-[#007acc]"
            />
          </div>

          {/* Language filter */}
          <div className="flex items-center space-x-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-[#858585]" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-[#1e1e1e] border border-[#3c3c3c] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#007acc]"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang === 'All' ? 'Todos los lenguajes' : lang}</option>
              ))}
            </select>
          </div>

          {/* Sort order */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-[#858585]">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#1e1e1e] border border-[#3c3c3c] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#007acc]"
            >
              <option value="updated">Última actualización</option>
              <option value="stars">Estrellas</option>
              <option value="name">Nombre</option>
            </select>
          </div>
        </div>

        {/* Featured checkbox */}
        <div className="flex items-center space-x-2 pt-1 text-xs text-[#cccccc]">
          <input
            type="checkbox"
            id="featuredToggle"
            checked={onlyFeatured}
            onChange={(e) => setOnlyFeatured(e.target.checked)}
            className="rounded bg-[#1e1e1e] border-[#3c3c3c] text-[#007acc] focus:ring-0"
          />
          <label htmlFor="featuredToggle" className="cursor-pointer flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-[#e5c07b]" />
            <span>Mostrar solo destacados</span>
          </label>
        </div>
      </div>

      {/* Loading state */}
      {loading && repos.length === 0 && (
        <div className="py-12 text-center text-[#858585] text-xs flex flex-col items-center justify-center space-y-2">
          <RotateCw className="w-6 h-6 animate-spin text-[#007acc]" />
          <span>Cargando repositorios desde GitHub...</span>
        </div>
      )}

      {/* Empty state */}
      {!loading && filteredRepos.length === 0 && (
        <div className="py-12 bg-[#252526] rounded-lg border border-[#3c3c3c] text-center text-[#858585] text-xs space-y-2">
          <Code2 className="w-8 h-8 mx-auto text-[#454545]" />
          <p>No se encontraron repositorios que coincidan con los filtros aplicados.</p>
        </div>
      )}

      {/* Grid of Repositories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRepos.map((repo) => (
          <div
            key={repo.id}
            className="bg-[#252526] hover:bg-[#2a2d2e] border border-[#3c3c3c] hover:border-[#007acc] rounded-lg p-4 transition-all flex flex-col justify-between space-y-3 group"
          >
            <div>
              {/* Card top bar */}
              <div className="flex items-start justify-between gap-2">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-[#569cd6] hover:underline flex items-center space-x-2 truncate"
                >
                  <span className="truncate">{repo.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>

                {repo.isFeatured && (
                  <span className="bg-[#382e1c] text-[#e5c07b] text-[10px] px-2 py-0.5 rounded border border-[#5c4923] flex items-center space-x-1 shrink-0">
                    <Sparkles className="w-3 h-3" />
                    <span>Destacado</span>
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-[#cccccc] mt-2 line-clamp-2 leading-relaxed">
                {repo.description || "Sin descripción proporcionada en GitHub."}
              </p>
            </div>

            {/* Topics/Tags if any */}
            {repo.topics && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {repo.topics.map((topic) => (
                  <span key={topic} className="bg-[#1e1e1e] text-[#4ec9b0] text-[10px] px-2 py-0.5 rounded">
                    #{topic}
                  </span>
                ))}
              </div>
            )}

            {/* Footer metadata */}
            <div className="pt-2 border-t border-[#333333] flex items-center justify-between text-xs text-[#858585]">
              <div className="flex items-center space-x-3">
                {repo.language && (
                  <div className="flex items-center space-x-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: getLanguageColor(repo.language) }}
                    />
                    <span>{repo.language}</span>
                  </div>
                )}

                <div className="flex items-center space-x-1" title="Estrellas">
                  <Star className="w-3.5 h-3.5 text-[#d19a66]" />
                  <span>{repo.stargazers_count}</span>
                </div>

                <div className="flex items-center space-x-1" title="Forks">
                  <GitFork className="w-3.5 h-3.5" />
                  <span>{repo.forks_count}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-2">
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4ec9b0] hover:underline text-[11px] flex items-center space-x-1"
                    title="Ver demo desplegada"
                  >
                    <span>Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#333333] hover:bg-[#454545] text-white px-2 py-0.5 rounded text-[11px] transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
