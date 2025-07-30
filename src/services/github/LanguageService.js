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
import { getAuthHeaders } from '../../utils/helpers.js';
import UserService from '../UserService.js';
/**
 * Service class for handling GitHub repository language statistics
 * 
 * Provides methods to fetch and aggregate programming language data
 * across all of a user's repositories. Calculates total bytes of code
 * per language.
 */
class LanguageService {
  /**
   * Creates a new LanguageService instance
   * @param {Object} config Configuration object
   * @param {string} config.githubUsername GitHub username
   * @param {string} [config.githubToken] GitHub access token (optional)
   */
  constructor(config) {
    this.config = config;
    this.languagesData = {};
  }

  /**
   * Loads and aggregates language statistics across multiple repositories
   * @async
   * @param {Array<Object>} reposData Array of repository objects containing languages_url
   * @returns {Promise<void>}
   * @description
   * - Iterates through all provided repositories
   * - Fetches language statistics for each repository
   * - Aggregates total bytes per language across all repositories
   * - Silently handles errors for individual repositories
   * 
   * @example
   * // Resulting languagesData structure:
   * {
   *   'JavaScript': 125000,
   *   'TypeScript': 75000,
   *   'CSS': 15000
   * }
   */
  async loadLanguagesData(reposData) {
    this.languagesData = {};
    
    for (const repo of reposData) {
      try {
        const response = await axios.get(repo.languages_url, {
          headers: getAuthHeaders(this.config.githubToken)
        });
        
        // Aggregate language bytes across repositories
        for (const [language, bytes] of Object.entries(response.data)) {
          this.languagesData[language] = (this.languagesData[language] || 0) + bytes;
        }
      } catch (err) {
        console.error(`Error loading languages for ${repo.name}:`, err);
        // Continue processing other repositories even if one fails
      }
    }
  }
}

export default LanguageService;