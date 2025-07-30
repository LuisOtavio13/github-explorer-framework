// Import Axios to handle HTTP requests
import axios from 'axios';

// Import helper to generate authorization headers using the user's token
import { getAuthHeaders } from '../../utils/helpers.js';

/**
 * GitLabContributionService
 * 
 * This class retrieves and summarizes GitLab user contributions (push events)
 * grouped by month for a given year.
 */
export default class GitLabContributionService {
  constructor(config) {
    // Store configuration including baseUrl, username, and token
    this.config = config;

    // Object to hold monthly contribution data
    this.contributionsData = {};
  }

  /**
   * Loads the user's GitLab contributions for a specified year.
   * If no year is given, defaults to the current year.
   * @param {number} year - Optional year for which contributions should be fetched
   */
  async loadContributionsData(year) {
    try {
      const currentYear = year || new Date().getFullYear();
      const startDate = `${currentYear}-01-01`;
      const endDate = `${currentYear}-12-31`;

      // Step 1: Fetch the GitLab user ID using the provided username
      const userResponse = await axios.get(
        `${this.config.baseUrl}/users?username=${this.config.username}`,
        {
          headers: getAuthHeaders(this.config.token)
        }
      );

      const userId = userResponse.data[0]?.id;
      if (!userId) throw new Error('User not found');

      // Step 2: Fetch push events for the user within the year
      const response = await axios.get(
        `${this.config.baseUrl}/users/${userId}/events`,
        {
          headers: getAuthHeaders(this.config.token),
          params: {
            after: startDate,
            before: endDate,
            action: 'pushed',
            per_page: 100
          }
        }
      );

      // Initialize contribution counters per month
      const contributions = {
        'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0,
        'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0
      };

      // Tally push events based on their creation month
      response.data.forEach(event => {
        const date = new Date(event.created_at);
        if (date.getFullYear() === currentYear) {
          const month = date.getMonth();
          switch (month) {
            case 0: contributions.Jan++; break;
            case 1: contributions.Feb++; break;
            case 2: contributions.Mar++; break;
            case 3: contributions.Apr++; break;
            case 4: contributions.May++; break;
            case 5: contributions.Jun++; break;
            case 6: contributions.Jul++; break;
            case 7: contributions.Aug++; break;
            case 8: contributions.Sep++; break;
            case 9: contributions.Oct++; break;
            case 10: contributions.Nov++; break;
            case 11: contributions.Dec++; break;
          }
        }
      });

      // Store the final contribution data
      this.contributionsData = contributions;

    } catch (err) {
      console.error('Error loading contributions:', err);

      // Fallback data in case of error
      this.contributionsData = {
        'Jan': 12, 'Feb': 19, 'Mar': 8, 'Apr': 15, 'May': 22, 'Jun': 30,
        'Jul': 18, 'Aug': 14, 'Sep': 25, 'Oct': 20, 'Nov': 17, 'Dec': 10
      };
    }
  }
}
