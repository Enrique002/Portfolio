export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  archived: boolean;
  disabled: boolean;
  topics?: string[];
  isFeatured?: boolean;
}

const GITHUB_USERNAME = "Enrique002";
const CACHE_KEY = "github_repos_cache_v1";
const CACHE_EXPIRATION_MS = 30 * 60 * 1000; // 30 minutes cache

// Configurable array of repository names to mark as featured
const FEATURED_REPOS = [
  "api-rest-users",
  "portfolio",
  "angular-project",
  "nodejs-express-api",
  "web-dashboard"
];

interface CacheData {
  timestamp: number;
  repos: GitHubRepo[];
}

/**
 * Fetch public repositories for the specified GitHub user using pagination.
 * Implements client-side caching with LocalStorage, rate-limit fallback,
 * and automatic feature flagging.
 */
export async function fetchGitHubRepos(forceRefresh = false): Promise<{ repos: GitHubRepo[]; fromCache: boolean; error?: string }> {
  if (!forceRefresh) {
    try {
      const cachedStr = localStorage.getItem(CACHE_KEY);
      if (cachedStr) {
        const cache: CacheData = JSON.parse(cachedStr);
        const age = Date.now() - cache.timestamp;
        if (age < CACHE_EXPIRATION_MS && Array.isArray(cache.repos) && cache.repos.length > 0) {
          return { repos: cache.repos, fromCache: true };
        }
      }
    } catch (e) {
      console.warn("Error reading GitHub cache from localStorage:", e);
    }
  }

  try {
    let page = 1;
    const perPage = 100;
    let allRepos: GitHubRepo[] = [];
    let hasMore = true;

    while (hasMore) {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=${perPage}&page=${page}&sort=updated`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Límite de peticiones a la API de GitHub alcanzado (Rate limit). Mostrando datos guardados si existen.");
        }
        throw new Error(`Error en la API de GitHub: ${response.status} ${response.statusText}`);
      }

      const reposPage: GitHubRepo[] = await response.json();
      
      if (!Array.isArray(reposPage) || reposPage.length === 0) {
        hasMore = false;
      } else {
        allRepos = [...allRepos, ...reposPage];
        if (reposPage.length < perPage) {
          hasMore = false;
        } else {
          page++;
        }
      }
    }

    // Process repos: enrich with featured status
    const processedRepos = allRepos.map((repo) => ({
      ...repo,
      isFeatured: FEATURED_REPOS.some((f) => f.toLowerCase() === repo.name.toLowerCase()) || repo.stargazers_count > 0,
    }));

    // Cache the fresh data
    try {
      const cacheData: CacheData = {
        timestamp: Date.now(),
        repos: processedRepos,
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (e) {
      console.warn("Could not save GitHub repos to localStorage:", e);
    }

    return { repos: processedRepos, fromCache: false };
  } catch (err: any) {
    console.error("Failed to fetch GitHub repos:", err);

    // Try fallback to expired cache if fetch fails
    try {
      const cachedStr = localStorage.getItem(CACHE_KEY);
      if (cachedStr) {
        const cache: CacheData = JSON.parse(cachedStr);
        if (Array.isArray(cache.repos) && cache.repos.length > 0) {
          return {
            repos: cache.repos,
            fromCache: true,
            error: `${err.message || "Error al conectar con GitHub"}. Se están mostrando los datos en caché local.`,
          };
        }
      }
    } catch (e) {
      // Ignore fallback read error
    }

    return {
      repos: [],
      fromCache: false,
      error: err.message || "No se pudieron obtener los repositorios de GitHub.",
    };
  }
}
