/**
 * Commit Service
 * 
 * Handles fetching and processing of GitHub commit data across repositories.
 * 
 * @class CommitService
 */

import { GitHubConfig, Repository, Commit, FormattedCommit } from '../types';

declare class CommitService {
  /**
   * Creates a CommitService instance
   * @param {GitHubConfig} config - Configuration object with GitHub credentials
   */
  constructor(config: GitHubConfig);

  /**
   * Aggregated commit statistics data
   * @type {Record<string, number>}
   * @description Key-value pairs of repository names and commit counts
   */
  commitsData: Record<string, number>;

  /**
   * Loads commit statistics for multiple repositories
   * @param {Repository[]} reposData - Array of repository objects
   * @param {number} [per_page=100] - Number of commits to fetch per repository
   * @returns {Promise<void>} Resolves when all commit data is loaded
   * @throws {Error} If API requests fail
   * @example
   * await commitService.loadCommitsData(userRepositories);
   */
  loadCommitsData(reposData: Repository[], per_page?: number): Promise<void>;

  /**
   * Loads formatted commits for a specific repository
   * @param {string} repoName - Full repository name (owner/repo)
   * @param {number} [page=1] - Page number for paginated results
   * @param {number} [per_page=30] - Number of commits per page
   * @returns {Promise<FormattedCommit[]>} Array of formatted commits
   * @example
   * const commits = await commitService.loadRepoCommits('owner/repo');
   */
  loadRepoCommits(repoName: string, page?: number, per_page?: number): Promise<FormattedCommit[]>;

  /**
   * Loads detailed commit information
   * @param {string} repoName - Full repository name (owner/repo)
   * @param {string} sha - Commit SHA hash
   * @returns {Promise<Commit>} Detailed commit object
   * @example
   * const commit = await commitService.loadCommitDetails('owner/repo', 'abc123');
   */
  loadCommitDetails(repoName: string, sha: string): Promise<Commit>;
}

export default CommitService;