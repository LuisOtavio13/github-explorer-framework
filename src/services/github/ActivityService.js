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
 * Service class for handling GitHub user activities/events
 * 
 * Provides methods to fetch and format user activity data from GitHub's events API.
 * Handles different event types like pushes, pull requests, issues, etc.
 */
class ActivityService {
  /**
   * Creates a new ActivityService instance
   * @param {Object} config Configuration object
   * @param {string} config.githubUsername GitHub username
   * @param {string} [config.githubToken] GitHub access token (optional)
   */
  constructor(config) {
    this.config = config;
    this.activitiesData = [];
  }

  /**
   * Fetches user activities from GitHub API
   * @async
   * @param {number} [per_page=10] Number of activities to fetch (default: 10)
   * @returns {Promise<void>}
   * @description Retrieves user events and stores them in activitiesData
   * @throws {Error} Logs error to console but maintains empty activitiesData on failure
   */
  async loadActivities(per_page = 10) {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${this.config.githubUsername}/events`,
        {
          headers: getAuthHeaders(this.config.githubToken),
          params: { per_page }
        }
      );
      this.activitiesData = response.data;
    } catch (err) {
      console.error('Error loading activities:', err);
      this.activitiesData = [];
    }
  }

  /**
   * Formats raw activity data for display
   * @returns {Array<Object>} Formatted activities with:
   * @property {string} text - Human-readable activity description
   * @property {string} icon - Font Awesome icon class
   * @property {string} date - Formatted date string
   * 
   * @example
   * // Returns:
   * [{
   *   text: "Pushed to owner/repo",
   *   icon: "fa-code-commit",
   *   date: "5/15/2023, 2:30:00 PM"
   * }]
   */
  renderActivities() {
    return this.activitiesData.map(activity => {
      let text = '';
      let icon = '';
      
      // Determine display text and icon based on event type
      switch(activity.type) {
        case 'PushEvent':
          text = `Pushed to ${activity.repo.name}`;
          icon = 'fa-code-commit';
          break;
        case 'CreateEvent':
          text = `Created ${activity.payload.ref_type} in ${activity.repo.name}`;
          icon = 'fa-plus-circle';
          break;
        case 'PullRequestEvent':
          text = `${activity.payload.action} pull request in ${activity.repo.name}`;
          icon = 'fa-code-pull-request';
          break;
        case 'IssuesEvent':
          text = `${activity.payload.action} issue in ${activity.repo.name}`;
          icon = 'fa-exclamation-circle';
          break;
        default:
          text = `${activity.type} in ${activity.repo.name}`;
          icon = 'fa-circle-notch';
      }
      
      return {
        text,
        icon,
        date: new Date(activity.created_at).toLocaleString()
      };
    });
  }
}

export default ActivityService;