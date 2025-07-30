// Import Axios for making HTTP requests
import axios from 'axios';

// Import helper that adds authorization headers using the provided token
import { getAuthHeaders } from '../../utils/helpers.js';

/**
 * GitLabLanguageService
 * 
 * This class analyzes the programming language usage across multiple GitLab repositories.
 * It fetches the language distribution for each repo and aggregates the data into 
 * approximate byte representation.
 */
export default class GitLabLanguageService {
  constructor(config) {
    // Configuration object (contains baseUrl, username, and token)
    this.config = config;

    // Stores the total byte count per programming language
    this.languagesData = {};
  }

  /**
   * Loads and aggregates language usage data across repositories.
   * @param {Array<Object>} reposData - Array containing repository metadata (must include `languages_url`)
   */
  async loadLanguagesData(reposData) {
    this.languagesData = {}; // Reset language data

    for (const repo of reposData) {
      try {
        // Fetch language usage percentages from the repo's languages URL
        const response = await axios.get(
          repo.languages_url,
          {
            headers: getAuthHeaders(this.config.token)
          }
        );

        // Convert percentage usage to approximate byte count and aggregate totals
        for (const [language, percentage] of Object.entries(response.data)) {
          const repoSize = repo.size || 0; // Size in bytes
          const bytes = (percentage * repoSize) / 100;

          // Sum the bytes for each language across all repos
          this.languagesData[language] =
            (this.languagesData[language] || 0) + bytes;
        }
      } catch (err) {
        // Log error if language data fetch fails for a repo
        console.error(`Error loading languages for ${repo.name}:`, err);
      }
    }
  }
}
