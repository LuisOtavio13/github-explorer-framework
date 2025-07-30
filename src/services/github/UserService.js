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

/**
 * Service class for handling GitHub user profile data
 * 
 * Provides methods to fetch and format GitHub user profile information,
 * including basic details, social metrics, and public repository count.
 */
class UserService {
  /**
   * Creates a new UserService instance
   * @param {Object} config Configuration object
   * @param {string} config.githubUsername GitHub username (required)
   * @param {string} [config.githubToken] GitHub personal access token (optional)
   */
  constructor(config) {
    this.config = config;
    this.userData = {};
  }

  /**
   * Fetches user profile data from GitHub API
   * @async
   * @returns {Promise<void>}
   * @throws {Error} When API request fails or credentials are invalid
   * @description
   * - Makes authenticated request to GitHub Users API
   * - Stores raw response data in userData property
   * - Throws error with descriptive message on failure
   */
  async loadUserData() {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${this.config.githubUsername}`,
        {
          headers: getAuthHeaders(this.config.githubToken)
        }
      );
      this.userData = response.data;
    } catch (err) {
      throw new Error('Error loading user data: ' + (err.response?.data?.message || err.message));
    }
  }

  /**
   * Formats user profile data for display
   * @returns {Object} Formatted profile information containing:
   * @property {string} avatarUrl URL of user's avatar image
   * @property {string} name User's display name or username if name not set
   * @property {string} bio User biography or default text
   * @property {number} followers Number of followers
   * @property {number} following Number of users followed
   * @property {number} publicRepos Count of public repositories
   * 
   * @example
   * // Example return value:
   * {
   *   avatarUrl: 'https://avatars.githubusercontent.com/u/123?v=4',
   *   name: 'John Doe',
   *   bio: 'Software developer',
   *   followers: 42,
   *   following: 15,
   *   publicRepos: 27
   * }
   */
  renderProfile() {
    return {
      avatarUrl: this.userData.avatar_url,
      name: this.userData.name || this.config.githubUsername,
      bio: this.userData.bio || 'No bio available',
      followers: this.userData.followers,
      following: this.userData.following,
      publicRepos: this.userData.public_repos
    };
  }
}

export default UserService;