import axios from 'axios';
import { getAuthHeaders } from '../utils/helpers.js';
import UserService from '../services/UserService.js';
/**
 * Service class for handling GitHub commit operations
 * 
 * Provides methods to fetch commit data at both repository and individual commit levels.
 * Handles commit statistics, file changes, and pagination.
 */
class CommitService {
  /**
   * Creates a new CommitService instance
   * @param {Object} config Configuration object
   * @param {string} config.githubUsername GitHub username
   * @param {string} [config.githubToken] GitHub access token (optional)
   */
  constructor(config) {
    this.config = config;
    this.commitsData = {};
  }

  /**
   * Loads commit counts for multiple repositories
   * @async
   * @param {Array<Object>} reposData Array of repository objects
   * @param {number} [per_page=100] Number of commits to fetch per repo
   * @returns {Promise<void>}
   * @description Populates commitsData with {repoName: commitCount} pairs
   */
  async loadCommitsData(reposData, per_page = 100) {
    this.commitsData = {};
    
    for (const repo of reposData) {
      try {
        const response = await axios.get(
          `${repo.url}/commits`,
          {
            headers: getAuthHeaders(this.config.githubToken),
            params: { per_page }
          }
        );
        this.commitsData[repo.name] = response.data.length;
      } catch (err) {
        console.error(`Error loading commits for ${repo.name}:`, err);
        this.commitsData[repo.name] = 0;
      }
    }
  }

  /**
   * Fetches paginated commits for a specific repository
   * @async
   * @param {string} repoName Name of the repository
   * @param {number} [page=1] Page number
   * @param {number} [per_page=10] Commits per page
   * @returns {Promise<Array<Object>>} Array of commit objects with:
   * @property {string} sha Commit hash
   * @property {string} message Commit message
   * @property {string} author Author name
   * @property {Date} date Commit date
   * @property {string} url GitHub URL
   * @property {Object} stats Commit statistics (additions, deletions, total)
   * @throws {Error} When repository not found or API request fails
   */
  async loadRepoCommits(repoName, page = 1, per_page = 10) {
    try {
      const repo = this.reposData?.find(r => r.name === repoName);
      if (!repo) throw new Error('Repository not found');

      const response = await axios.get(
        `https://api.github.com/repos/${repo.full_name}/commits`,
        {
          headers: getAuthHeaders(this.config.githubToken),
          params: { per_page, page }
        }
      );
      
      return response.data.map(commit => ({
        sha: commit.sha,
        message: commit.commit.message,
        author: commit.commit.author.name,
        date: new Date(commit.commit.author.date),
        url: commit.html_url,
        stats: commit.stats
      }));
    } catch (err) {
      throw new Error('Error loading commits: ' + (err.response?.data?.message || err.message));
    }
  }

  /**
   * Fetches detailed information for a specific commit
   * @async
   * @param {string} repoName Name of the repository
   * @param {string} sha Commit hash
   * @returns {Promise<Object>} Detailed commit information with:
   * @property {string} sha Commit hash
   * @property {string} message Full commit message
   * @property {string} author Author name
   * @property {Date} date Commit date
   * @property {string} url GitHub URL
   * @property {Object} stats Change statistics
   * @property {Array<Object>} files Changed files with diff information
   * @throws {Error} When commit or repository not found
   */
  async loadCommitDetails(repoName, sha) {
    try {
      const repo = this.reposData?.find(r => r.name === repoName);
      if (!repo) throw new Error('Repository not found');

      const response = await axios.get(
        `https://api.github.com/repos/${repo.full_name}/commits/${sha}`,
        {
          headers: getAuthHeaders(this.config.githubToken)
        }
      );
      
      const commit = response.data;
      return {
        sha: commit.sha,
        message: commit.commit.message,
        author: commit.commit.author.name,
        date: new Date(commit.commit.author.date),
        url: commit.html_url,
        stats: commit.stats,
        files: commit.files
      };
    } catch (err) {
      throw new Error('Error loading commit details: ' + (err.response?.data?.message || err.message));
    }
  }
}

export default CommitService;