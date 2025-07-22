/**
 * Language Analysis Service
 * 
 * Handles fetching and processing of repository language statistics.
 * 
 * @class LanguageService
 */

import { GitHubConfig, LanguageStats, Repository } from '../types';

declare class LanguageService {
  /**
   * Creates a LanguageService instance
   * @param {GitHubConfig} config - Configuration object with GitHub credentials
   */
  constructor(config: GitHubConfig);

  /**
   * Aggregated language statistics
   * @type {LanguageStats}
   * @description Key-value pairs of languages and their total bytes of code
   * @example
   * {
   *   "TypeScript": 24576,
   *   "JavaScript": 10240,
   *   "CSS": 5120
   * }
   */
  languagesData: LanguageStats;

  /**
   * Loads and aggregates language data for multiple repositories
   * @param {Repository[]} reposData - Array of repository objects
   * @returns {Promise<void>} Resolves when all language data is loaded and aggregated
   * @throws {Error} If API requests fail
   * @example
   * await languageService.loadLanguagesData(userRepositories);
   */
  loadLanguagesData(reposData: Repository[]): Promise<void>;
}

export default LanguageService;