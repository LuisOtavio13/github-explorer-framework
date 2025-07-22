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