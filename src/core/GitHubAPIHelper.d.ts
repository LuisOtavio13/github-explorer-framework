/**
 * GitHub API Helper - Core Class
 * 
 * Provides a high-level interface for accessing and processing GitHub data.
 * Orchestrates all services (users, repos, activities, etc.) under a unified API.
 * 
 * @class GitHubAPIHelper
 */

import { 
  GitHubConfig,
  Repository,
  FormattedRepo,
  FormattedActivity,
  LanguageStats,
  FormattedCommit,
  ContributionCalendar,
  FormattedContentItem,
  ChartData,
  Commit
} from '../types';

declare class GitHubAPIHelper {
  /**
   * Creates a GitHubAPIHelper instance
   * @param {GitHubConfig} config - Configuration object with GitHub credentials
   */
  constructor(config: GitHubConfig);
  
  /**
   * Loads all available GitHub data (profile, repos, activities, etc.)
   * @returns {Promise<boolean>} True if all data loaded successfully
   * @throws {Error} If any critical data fails to load
   * @example
   * await apiHelper.loadAllData();
   */
  loadAllData(): Promise<boolean>;
  
  // ==================== DATA ACCESSORS ====================
  
  /**
   * Raw user profile data
   * @readonly
   * @type {any}
   */
  readonly userData: any;
  
  /**
   * Array of repository data
   * @readonly
   * @type {Repository[]}
   */
  readonly reposData: Repository[];
  
  /**
   * Array of user activities/events
   * @readonly
   * @type {any[]}
   */
  readonly activitiesData: any[];
  
  /**
   * Language statistics across all repositories
   * @readonly
   * @type {LanguageStats}
   */
  readonly languagesData: LanguageStats;
  
  /**
   * Commit statistics by repository
   * @readonly
   * @type {Record<string, number>}
   */
  readonly commitsData: Record<string, number>;
  
  /**
   * Contribution calendar data
   * @readonly
   * @type {ContributionCalendar}
   */
  readonly contributionsData: ContributionCalendar;
  
  // ==================== RENDERING METHODS ====================
  
  /**
   * Formats user profile data for display
   * @returns {any} Formatted profile object
   */
  renderProfile(): any;
  
  /**
   * Formats activity data for display
   * @returns {FormattedActivity[]} Array of formatted activities
   */
  renderActivities(): FormattedActivity[];
  
  /**
   * Formats repository data for display
   * @param {string} [sort='stars'] - Sort order ('stars', 'forks', 'updated', 'name')
   * @returns {FormattedRepo[]} Array of formatted repositories
   */
  renderRepos(sort?: string): FormattedRepo[];
  
  /**
   * Prepares chart-ready data
   * @returns {Object} Chart data objects for:
   * - languages: Language usage distribution
   * - commits: Commit activity
   * - contributions: Contribution calendar
   */
  renderCharts(): {
    languages: ChartData,
    commits: ChartData,
    contributions: ChartData
  };
  
  // ==================== REPOSITORY OPERATIONS ====================
  
  /**
   * Loads commits for a specific repository
   * @param {string} repoName - Full repository name (owner/repo)
   * @param {number} [page=1] - Page number for paginated results
   * @param {number} [per_page=30] - Number of commits per page
   * @returns {Promise<FormattedCommit[]>} Array of formatted commits
   */
  loadRepoCommits(repoName: string, page?: number, per_page?: number): Promise<FormattedCommit[]>;
  
  /**
   * Loads file/directory contents from a repository
   * @param {string} repoName - Full repository name (owner/repo)
   * @param {string} [path=''] - Path within repository
   * @returns {Promise<FormattedContentItem[]>} Array of formatted content items
   */
  loadRepoFiles(repoName: string, path?: string): Promise<FormattedContentItem[]>;
  
  /**
   * Loads raw content of a file
   * @param {string} repoName - Full repository name (owner/repo)
   * @param {string} filePath - Path to file within repository
   * @returns {Promise<string>} File content as string
   */
  loadFileContent(repoName: string, filePath: string): Promise<string>;
  
  /**
   * Loads detailed commit information
   * @param {string} repoName - Full repository name (owner/repo)
   * @param {string} sha - Commit SHA hash
   * @returns {Promise<Commit>} Detailed commit object
   */
  loadCommitDetails(repoName: string, sha: string): Promise<Commit>;
}

export default GitHubAPIHelper;