// Import Axios for making HTTP requests
import axios from 'axios';

// Import custom helper to generate authorization headers
import { getAuthHeaders } from '../../utils/helpers.js';

/**
 * GitLabCommitService
 * 
 * This class handles retrieving commit-related data from GitLab repositories.
 */
export default class GitLabCommitService {
  constructor(config) {
    // Configuration includes username, token, base URL, etc.
    this.config = config;

    // Object to hold commit counts per repository
    this.commitsData = {};
  }

  /**
   * Load the number of commits for each repository provided.
   * @param {Array<Object>} reposData - Array of repository metadata
   * @param {number} per_page - Number of commits to request per repository (default is 100)
   */
  async loadCommitsData(reposData, per_page = 100) {
    this.commitsData = {};

    for (const repo of reposData) {
      try {
        // Fetch list of commits for the current repository
        const response = await axios.get(
          `${this.config.baseUrl}/projects/${repo.id}/repository/commits`,
          {
            headers: getAuthHeaders(this.config.token),
            params: { per_page }
          }
        );

        // Store the number of commits for this repository
        this.commitsData[repo.name] = response.data.length;

      } catch (err) {
        // If an error occurs, log it and default to zero commits
        console.error(`Error loading commits for ${repo.name}:`, err);
        this.commitsData[repo.name] = 0;
      }
    }
  }

  /**
   * Load a paginated list of commits from a specific repository.
   * @param {number|string} repoId - ID of the repository
   * @param {number} page - Page number for pagination (default is 1)
   * @param {number} per_page - Number of commits per page (default is 10)
   * @returns {Array<Object>} - Array of simplified commit objects
   */
  async loadRepoCommits(repoId, page = 1, per_page = 10) {
    try {
      const response = await axios.get(
        `${this.config.baseUrl}/projects/${repoId}/repository/commits`,
        {
          headers: getAuthHeaders(this.config.token),
          params: { per_page, page }
        }
      );

      // Transform each commit into a simplified object
      return response.data.map(commit => ({
        sha: commit.id,
        message: commit.title,
        author: commit.author_name,
        date: new Date(commit.created_at),
        url: commit.web_url
      }));

    } catch (err) {
      // Wrap and rethrow with custom message
      throw new Error('Error loading commits: ' + err.message);
    }
  }

  /**
   * Load detailed information for a specific commit.
   * @param {number|string} repoId - ID of the repository
   * @param {string} sha - SHA identifier of the commit
   * @returns {Object} - Detailed commit data including stats and changed files
   */
  async loadCommitDetails(repoId, sha) {
    try {
      const response = await axios.get(
        `${this.config.baseUrl}/projects/${repoId}/repository/commits/${sha}`,
        {
          headers: getAuthHeaders(this.config.token)
        }
      );

      const commit = response.data;

      // Return structured details about the commit
      return {
        sha: commit.id,
        message: commit.message,
        author: commit.author_name,
        date: new Date(commit.created_at),
        url: commit.web_url,
        stats: {
          additions: commit.stats?.additions || 0,
          deletions: commit.stats?.deletions || 0,
          total: commit.stats?.total || 0
        },
        files: commit.stats?.files || []
      };

    } catch (err) {
      // Wrap and rethrow with custom message
      throw new Error('Error loading commit details: ' + err.message);
    }
  }
}
