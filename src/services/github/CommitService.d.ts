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