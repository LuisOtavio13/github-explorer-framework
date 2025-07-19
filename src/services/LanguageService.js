import axios from 'axios';
import { getAuthHeaders } from '../utils/helpers.js';
import UserService from '../services/UserService.js';
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