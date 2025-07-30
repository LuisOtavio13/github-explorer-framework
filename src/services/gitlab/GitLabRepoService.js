// Import Axios for handling HTTP requests
import axios from 'axios';

// Import helpers: one to generate authentication headers, and one to format file sizes
import { getAuthHeaders, formatFileSize } from '../../utils/helpers.js';

/**
 * GitLabRepoService
 * 
 * This class provides methods to retrieve and format information about
 * GitLab repositories for a specific user.
 */
export default class GitLabRepoService {
  constructor(config) {
    // Configuration object containing baseUrl, username, and token
    this.config = config;

    // Holds repository metadata
    this.reposData = [];
  }

  /**
   * Load a list of repositories from the GitLab API for the configured user.
   * Repositories are sorted according to the specified criteria.
   * 
   * @param {string} sort - Sorting method: 'updated', 'stars', or 'forks'
   * @param {number} per_page - Max number of repositories to fetch
   */
  async loadReposData(sort = 'updated', per_page = 100) {
    try {
      const params = {
        per_page,
        order_by: sort === 'stars' ? 'stars_count'
                  : sort === 'forks' ? 'forks_count'
                  : 'last_activity_at',
        sort: 'desc' // Descending order
      };

      const response = await axios.get(
        `${this.config.baseUrl}/users/${this.config.username}/projects`,
        {
          headers: getAuthHeaders(this.config.token),
          params
        }
      );

      // Add a custom property for the language API endpoint
      this.reposData = response.data.map(repo => ({
        ...repo,
        languages_url: `${this.config.baseUrl}/projects/${repo.id}/languages`
      }));
    } catch (err) {
      console.error('Error loading repositories:', err);
      throw err;
    }
  }

  /**
   * Load files within a specific repository and path.
   * Useful for browsing folder contents.
   * 
   * @param {number|string} repoId - Repository ID
   * @param {string} path - Path inside the repository
   * @param {string} ref - Branch or tag reference (default is 'main')
   * @returns {Array<Object>} - List of file metadata
   */
  async loadRepoFiles(repoId, path = '', ref = 'main') {
    try {
      const response = await axios.get(
        `${this.config.baseUrl}/projects/${repoId}/repository/tree`,
        {
          headers: getAuthHeaders(this.config.token),
          params: { path, ref }
        }
      );

      // Format file/folder data for presentation
      return response.data.map(item => ({
        name: item.name,
        type: item.type,
        path: item.path,
        size: item.size ? formatFileSize(item.size) : '', // Optional file size
        url: item.web_url
      }));
    } catch (err) {
      throw new Error('Error loading files: ' + err.message);
    }
  }

  /**
   * Load the raw content of a specific file in a repository.
   * 
   * @param {number|string} repoId - Repository ID
   * @param {string} filePath - Full path to the file inside the repo
   * @param {string} ref - Branch or tag reference (default is 'main')
   * @returns {string} - File contents as a string
   */
  async loadFileContent(repoId, filePath, ref = 'main') {
    try {
      const response = await axios.get(
        `${this.config.baseUrl}/projects/${repoId}/repository/files/${encodeURIComponent(filePath)}/raw`,
        {
          headers: getAuthHeaders(this.config.token),
          params: { ref }
        }
      );
      return response.data;
    } catch (err) {
      throw new Error('Error loading file content: ' + err.message);
    }
  }

  /**
   * Returns a formatted list of repositories with selected details.
   * This can be used for displaying repositories in a UI.
   * 
   * @param {string} sort - Sorting method: 'updated', 'stars', or 'forks'
   * @returns {Array<Object>} - Array of formatted repository objects
   */
  renderRepos(sort = 'updated') {
    let repos = [...this.reposData];

    // Sort repositories based on selected criteria
    if (sort === 'stars') {
      repos.sort((a, b) => b.star_count - a.star_count);
    } else if (sort === 'forks') {
      repos.sort((a, b) => b.forks_count - a.forks_count);
    } else {
      repos.sort((a, b) => new Date(b.last_activity_at) - new Date(a.last_activity_at));
    }

    // Return structured info for display
    return repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description available',
      language: repo.language || 'N/A',
      stars: repo.star_count,
      forks: repo.forks_count,
      updatedAt: new Date(repo.last_activity_at).toLocaleDateString(),
      url: repo.web_url
    }));
  }
}
