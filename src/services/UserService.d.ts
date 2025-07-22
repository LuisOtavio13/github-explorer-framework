/**
 * User Profile Service
 * 
 * Handles fetching and processing of GitHub user profile data.
 * 
 * @class UserService
 */

import { GitHubConfig } from '../types';

/**
 * Raw user profile data from GitHub API
 * @interface UserProfile
 */
interface UserProfile {
  avatar_url: string;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

/**
 * Formatted user profile data for display
 * @interface RenderedProfile
 */
interface RenderedProfile {
  avatarUrl: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos: number;
}

declare class UserService {
  /**
   * Creates a UserService instance
   * @param {GitHubConfig} config - Configuration object with GitHub credentials
   */
  constructor(config: GitHubConfig);

  /**
   * Raw user profile data
   * @type {UserProfile}
   */
  userData: UserProfile;

  /**
   * Loads user profile data from GitHub API
   * @returns {Promise<void>} Resolves when profile data is loaded
   * @throws {Error} If API request fails
   * @example
   * await userService.loadUserData();
   */
  loadUserData(): Promise<void>;

  /**
   * Formats raw profile data for display
   * @returns {RenderedProfile} Formatted profile object
   * @example
   * const profile = userService.renderProfile();
   */
  renderProfile(): RenderedProfile;
}

export default UserService;