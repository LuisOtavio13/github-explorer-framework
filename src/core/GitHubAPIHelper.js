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

import UserService from '../services/UserService.js';
import RepoService from '../services/RepoService.js';
import ActivityService from '../services/ActivityService.js';
import LanguageService from '../services/LanguageService.js';
import CommitService from '../services/CommitService.js';
import ContributionService from '../services/ContributionService.js';
/**
 * GitHubAPIHelper - Main facade class for GitHub API operations
 * 
 * Provides a unified interface to access GitHub user data, repositories,
 * activities, languages, commits and contributions through specialized services.
 * Implements the Facade design pattern to simplify complex API interactions.
 */
class GitHubAPIHelper {
  /**
   * Constructs a new GitHubAPIHelper instance
   * @param {Object} config Configuration object
   * @param {string} config.githubUsername GitHub username (required)
   * @param {string} [config.githubToken] GitHub personal access token (optional)
   * @throws {Error} When githubUsername is not provided
   */
  constructor(config) {
    if (!config || !config.githubUsername) {
      throw new Error('GitHub username is required');
    }

    this.config = {
      githubUsername: config.githubUsername,
      githubToken: config.githubToken || null
    };

    // Initialize specialized services
    this.userService = new UserService(this.config);
    this.repoService = new RepoService(this.config);
    this.activityService = new ActivityService(this.config);
    this.languageService = new LanguageService(this.config);
    this.commitService = new CommitService(this.config);
    this.contributionService = new ContributionService(this.config);

    // Current state tracking
    this.currentRepo = null;
    this.currentPath = '';
    this.currentCommit = null;
  }

  /**
   * Loads all available GitHub data for the user
   * @async
   * @returns {Promise<boolean>} True if all data loaded successfully
   * @throws {Error} If any data loading fails
   */
  async loadAllData() {
    try {
      await this.userService.loadUserData();
      await this.repoService.loadReposData();
      await this.activityService.loadActivities();
      await this.languageService.loadLanguagesData(this.repoService.reposData);
      await this.commitService.loadCommitsData(this.repoService.reposData);
      await this.contributionService.loadContributionsData();
      return true;
    } catch (err) {
      console.error('Error loading data:', err);
      throw err;
    }
  }

  /* Data Accessors */
  
  /**
   * Gets user profile data
   * @returns {Object} User profile information
   */
  get userData() { return this.userService.userData; }

  /**
   * Gets repositories data
   * @returns {Array<Object>} List of repositories
   */
  get reposData() { return this.repoService.reposData; }

  /**
   * Gets user activities data
   * @returns {Array<Object>} List of user activities
   */
  get activitiesData() { return this.activityService.activitiesData; }

  /**
   * Gets language statistics
   * @returns {Object} Language usage data
   */
  get languagesData() { return this.languageService.languagesData; }

  /**
   * Gets commits data
   * @returns {Object} Commits information
   */
  get commitsData() { return this.commitService.commitsData; }

  /**
   * Gets contributions data
   * @returns {Object} Contribution statistics
   */
  get contributionsData() { return this.contributionService.contributionsData; }

  /* Rendering Methods */

  /**
   * Renders user profile for display
   * @returns {Object} Formatted profile data
   */
  renderProfile() { return this.userService.renderProfile(); }

  /**
   * Renders user activities for display
   * @returns {Array<Object>} Formatted activities
   */
  renderActivities() { return this.activityService.renderActivities(); }

  /**
   * Renders repositories for display
   * @param {string} [sort='updated'] Sorting method ('updated', 'stars', 'forks')
   * @returns {Array<Object>} Formatted repositories
   */
  renderRepos(sort) { return this.repoService.renderRepos(sort); }

  /**
   * Prepares chart data for visualization
   * @returns {Object} Chart-ready data including:
   * - languages: {labels, data}
   * - commits: {labels, data} 
   * - contributions: {labels, data}
   */
  renderCharts() {
    return {
      languages: {
        labels: Object.keys(this.languagesData),
        data: Object.values(this.languagesData)
      },
      commits: {
        labels: Object.keys(this.commitsData).slice(0, 10),
        data: Object.values(this.commitsData).slice(0, 10)
      },
      contributions: {
        labels: Object.keys(this.contributionsData),
        data: Object.values(this.contributionsData)
      }
    };
  }

  /* Repository Operations */

  /**
   * Loads commits for a specific repository
   * @async
   * @param {string} repoName Repository name
   * @param {number} [page=1] Page number
   * @param {number} [per_page=10] Commits per page
   * @returns {Promise<Array<Object>>} List of commits
   */
  async loadRepoCommits(repoName, page = 1, per_page = 10) {
    return this.commitService.loadRepoCommits(repoName, page, per_page);
  }

  /**
   * Loads files for a repository path
   * @async
   * @param {string} repoName Repository name
   * @param {string} [path=''] Path within repository
   * @returns {Promise<Array<Object>>} List of files/directories
   */
  async loadRepoFiles(repoName, path = '') {
    return this.repoService.loadRepoFiles(repoName, path);
  }

  /**
   * Loads content of a specific file
   * @async
   * @param {string} repoName Repository name
   * @param {string} filePath File path
   * @returns {Promise<string>} File content
   */
  async loadFileContent(repoName, filePath) {
    return this.repoService.loadFileContent(repoName, filePath);
  }

  /**
   * Loads details for a specific commit
   * @async
   * @param {string} repoName Repository name
   * @param {string} sha Commit SHA
   * @returns {Promise<Object>} Detailed commit information
   */
  async loadCommitDetails(repoName, sha) {
    return this.commitService.loadCommitDetails(repoName, sha);
  }
}

export default GitHubAPIHelper;