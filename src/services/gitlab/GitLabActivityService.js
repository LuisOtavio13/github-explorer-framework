// Import Axios for HTTP requests
import axios from 'axios';

// Import helper function to generate authorization headers
import { getAuthHeaders } from '../../utils/helpers.js';

/**
 * GitLabActivityService class
 * 
 * This service is responsible for retrieving user activity events from the GitLab API
 * and formatting them in a readable structure.
 */
export default class GitLabActivityService {
  constructor(config) {
    // Store configuration such as baseUrl, username, and token
    this.config = config;

    // Initialize array to hold activities fetched from GitLab
    this.activitiesData = [];
  }

  /**
   * Loads recent user activities from GitLab API
   * @param {number} per_page - Number of activities to fetch (default is 10)
   */
  async loadActivities(per_page = 10) {
    try {
      // Step 1: Retrieve user ID using provided username
      const userResponse = await axios.get(
        `${this.config.baseUrl}/users?username=${this.config.username}`,
        {
          headers: getAuthHeaders(this.config.token)
        }
      );

      const userId = userResponse.data[0]?.id;
      if (!userId) throw new Error('User not found');

      // Step 2: Fetch activity events for the identified user
      const response = await axios.get(
        `${this.config.baseUrl}/users/${userId}/events`,
        {
          headers: getAuthHeaders(this.config.token),
          params: { per_page }
        }
      );

      // Store retrieved activity data
      this.activitiesData = response.data;

    } catch (err) {
      // In case of error, log the issue and clear activity data
      console.error('Error loading activities:', err);
      this.activitiesData = [];
    }
  }

  /**
   * Renders the list of user activities in a formatted structure
   * @returns {Array<Object>} Array of formatted activity descriptions
   */
  renderActivities() {
    return this.activitiesData.map(event => {
      let text = '';
      let icon = '';

      // Choose a descriptive label and icon based on activity type
      switch (event.action_name) {
        case 'pushed to':
          text = `Pushed to ${event.project?.name || 'repository'}`;
          icon = 'fa-code-commit';
          break;
        case 'created':
          text = `Created ${event.target_type} in ${event.project?.name || 'repository'}`;
          icon = 'fa-plus-circle';
          break;
        case 'opened':
          if (event.target_type === 'MergeRequest') {
            text = `Opened a merge request in ${event.project?.name || 'repository'}`;
            icon = 'fa-code-pull-request';
          } else {
            text = `Opened ${event.target_type} in ${event.project?.name || 'repository'}`;
            icon = 'fa-exclamation-circle';
          }
          break;
        default:
          text = `${event.action_name} in ${event.project?.name || 'repository'}`;
          icon = 'fa-circle-notch';
      }

      // Return a structured object for UI rendering
      return {
        text,
        icon,
        date: new Date(event.created_at).toLocaleString()
      };
    });
  }
}
