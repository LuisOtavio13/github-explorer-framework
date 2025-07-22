/**
 * @license
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import axios from 'axios';
import { getAuthHeaders, formatFileSize } from '../utils/helpers.js';
import UserService from '../services/UserService.js';
/**
 * Service class for handling GitHub repository operations
 * 
 * Provides methods to fetch, sort, and analyze repository data including:
 * - Repository listings with sorting options
 * - File system navigation
 * - File content retrieval
 */
class RepoService {
  /**
   * Creates a new RepoService instance
   * @param {Object} config Configuration object
   * @param {string} config.githubUsername GitHub username
   * @param {string} [config.githubToken] GitHub access token (optional)
   */
  constructor(config) {
    this.config = config;
    this.reposData = [];
  }

  /**
   * Fetches repository data from GitHub API
   * @async
   * @param {string} [sort='updated'] Sorting method ('updated', 'stars', or 'forks')
   * @param {number} [per_page=100] Number of repositories to fetch per page
   * @returns {Promise<void>}
   * @throws {Error} When API request fails
   * @description Retrieves repositories with specified sorting and pagination
   */
  async loadReposData(sort = 'updated', per_page = 100) {
    try {
      const params = { per_page };

      // Configure sorting parameters
      if (sort === 'stars') {
        params.sort = 'stars';
        params.direction = 'desc';
      } else if (sort === 'forks') {
        params.sort = 'forks';
        params.direction = 'desc';
      } else {
        params.sort = 'updated';
        params.direction = 'desc';
      }

      const response = await axios.get(
        `https://api.github.com/users/${this.config.githubUsername}/repos`,
        {
          headers: getAuthHeaders(this.config.githubToken),
          params
        }
      );

      this.reposData = response.data;
    } catch (err) {
      throw new Error('Error loading repositories: ' + (err.response?.data?.message || err.message));
    }
  }

  /**
   * Formats and sorts repository data for display
   * @param {string} [sort='updated'] Sorting method ('updated', 'stars', or 'forks')
   * @returns {Array<Object>} Formatted repository objects containing:
   * @property {string} name Repository name
   * @property {string} description Repository description
   * @property {string} language Primary programming language
   * @property {number} stars Stargazer count
   * @property {number} forks Fork count
   * @property {string} updatedAt Formatted last update date
   * @property {string} url GitHub URL
   */
  renderRepos(sort = 'updated') {
    let repos = [...this.reposData];
    
    // Apply sorting
    if (sort === 'stars') {
      repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sort === 'forks') {
      repos.sort((a, b) => b.forks_count - a.forks_count);
    } else {
      repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }
    
    // Format output
    return repos.map(repo => ({
      name: repo.name,
      description: repo.description || 'No description',
      language: repo.language || 'N/A',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: new Date(repo.updated_at).toLocaleDateString(),
      url: repo.html_url
    }));
  }

  /**
   * Retrieves repository file listing
   * @async
   * @param {string} repoName Name of the repository
   * @param {string} [path=''] Path within repository (empty for root)
   * @returns {Promise<Array<Object>>} File/directory objects containing:
   * @property {string} name File/directory name
   * @property {string} type 'file' or 'dir'
   * @property {string} path Full path
   * @property {string} size Formatted file size (empty for directories)
   * @property {string} url GitHub URL
   * @throws {Error} When repository not found or API request fails
   */
  async loadRepoFiles(repoName, path = '') {
    try {
      const repo = this.reposData.find(r => r.name === repoName);
      if (!repo) throw new Error('Repository not found');

      const response = await axios.get(
        `https://api.github.com/repos/${repo.full_name}/contents/${path}`,
        {
          headers: getAuthHeaders(this.config.githubToken)
        }
      );
      
      return response.data.map(item => ({
        name: item.name,
        type: item.type,
        path: item.path,
        size: item.size ? formatFileSize(item.size) : '',
        url: item.html_url
      }));
    } catch (err) {
      throw new Error('Error loading files: ' + (err.response?.data?.message || err.message));
    }
  }

  /**
   * Retrieves file content from repository
   * @async
   * @param {string} repoName Name of the repository
   * @param {string} filePath Path to file within repository
   * @returns {Promise<string>} Decoded file content
   * @throws {Error} When repository not found, file doesn't exist, or API request fails
   */
  async loadFileContent(repoName, filePath) {
    try {
      const repo = this.reposData.find(r => r.name === repoName);
      if (!repo) throw new Error('Repository not found');

      const response = await axios.get(
        `https://api.github.com/repos/${repo.full_name}/contents/${filePath}`,
        {
          headers: getAuthHeaders(this.config.githubToken)
        }
      );
      
      return atob(response.data.content);
    } catch (err) {
      throw new Error('Error loading file: ' + (err.response?.data?.message || err.message));
    }
  }
}

export default RepoService;