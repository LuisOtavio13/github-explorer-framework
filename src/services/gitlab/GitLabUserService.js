// Import Axios for handling HTTP requests
import axios from 'axios';

// Import helper that generates authentication headers from token
import { getAuthHeaders } from '../../utils/helpers.js';

/**
 * GitLabUserService
 * 
 * This class is responsible for retrieving a GitLab user's profile and statistics.
 */
export default class GitLabUserService {
  constructor(config) {
    // Configuration object including baseUrl, username, and token
    this.config = config;

    // Object that will store user profile and statistics
    this.userData = {};
  }

  /**
   * Loads the user's profile and statistics from the GitLab API.
   * This includes basic profile data and contribution statistics.
   */
  async loadUserData() {
    try {
      // Step 1: Search for user by username (GitLab returns an array)
      const response = await axios.get(
        `${this.config.baseUrl}/users?username=${this.config.username}`,
        {
          headers: getAuthHeaders(this.config.token)
        }
      );

      // If no user is found, throw an error
      if (response.data.length === 0) {
        throw new Error('User not found');
      }

      // Store the user profile information
      this.userData = response.data[0];

      // Step 2: Fetch extended contribution statistics for the user
      const statsResponse = await axios.get(
        `${this.config.baseUrl}/users/${this.userData.id}/statistics`,
        {
          headers: getAuthHeaders(this.config.token)
        }
      );

      // Attach stats data to the userData object
      this.userData.stats = statsResponse.data;

    } catch (err) {
      console.error('Error loading GitLab user:', err);
      throw err;
    }
  }

  /**
   * Returns a formatted user profile object for display in UI or reports.
   * Defaults to fallback values when data is missing.
   * 
   * @returns {Object} - Formatted user profile data
   */
  renderProfile() {
    return {
      avatarUrl: this.userData.avatar_url || '',
      name: this.userData.name || this.config.username,
      bio: this.userData.bio || 'No bio available',
      followers: this.userData.followers || 0,
      following: this.userData.following || 0,
      publicRepos: this.userData.public_repos || 0,
      stats: this.userData.stats || {}
    };
  }
}
