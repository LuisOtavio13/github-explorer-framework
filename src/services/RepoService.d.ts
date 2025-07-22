/**
 * Repository Service
 * 
 * Handles fetching, processing, and managing GitHub repository data.
 * 
 * @class RepoService
 */

import { 
  GitHubConfig, 
  Repository, 
  FormattedRepo, 
  RepoContentItem, 
  FormattedContentItem 
} from '../types';

declare class RepoService {
  /**
   * Creates a RepoService instance
   * @param {GitHubConfig} config - Configuration object with GitHub credentials
   */
  constructor(config: GitHubConfig);

  /**
   * Raw repository data from GitHub API
   * @type {Repository[]}
   */
  reposData: Repository[];

  /**
   * Loads repository data from GitHub API
   * @param {string} [sort='updated'] - Sort order ('updated', 'created', 'pushed', 'full_name')
   * @param {number} [per_page=100] - Number of repositories to fetch
   * @returns {Promise<void>} Resolves when repositories are loaded
   * @throws {Error} If API request fails
   * @example
   * await repoService.loadReposData('stars', 50);
   */
  loadReposData(sort?: string, per_page?: number): Promise<void>;

  /**
   * Formats repository data for display
   * @param {string} [sort='stars'] - Sort order ('stars', 'forks', 'updated', 'name')
   * @returns {FormattedRepo[]} Array of formatted repositories
   * @example
   * const topRepos = repoService.renderRepos('stars');
   */
  renderRepos(sort?: string): FormattedRepo[];

  /**
   * Loads repository file/directory contents
   * @param {string} repoName - Full repository name (owner/repo)
   * @param {string} [path=''] - Path within repository
   * @returns {Promise<FormattedContentItem[]>} Array of formatted content items
   * @example
   * const rootFiles = await repoService.loadRepoFiles('owner/repo');
   * const srcFiles = await repoService.loadRepoFiles('owner/repo', 'src');
   */
  loadRepoFiles(repoName: string, path?: string): Promise<FormattedContentItem[]>;

  /**
   * Loads raw content of a file
   * @param {string} repoName - Full repository name (owner/repo)
   * @param {string} filePath - Path to file within repository
   * @returns {Promise<string>} File content as string
   * @example
   * const readme = await repoService.loadFileContent('owner/repo', 'README.md');
   */
  loadFileContent(repoName: string, filePath: string): Promise<string>;
}

export default RepoService;