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
 * Activity Service
 * 
 * Handles fetching and processing of GitHub user activities/events.
 * 
 * @class ActivityService
 */

import { GitHubConfig, Activity, FormattedActivity } from '../types';

declare class ActivityService {
  /**
   * Creates an ActivityService instance
   * @param {GitHubConfig} config - Configuration object with GitHub credentials
   */
  constructor(config: GitHubConfig);

  /**
   * Raw activity data from GitHub API
   * @type {Activity[]}
   */
  activitiesData: Activity[];

  /**
   * Fetches user activities from GitHub API
   * @param {number} [per_page=30] - Number of activities to fetch per request
   * @returns {Promise<void>} Resolves when activities are loaded
   * @throws {Error} If API request fails
   * @example
   * await activityService.loadActivities(50);
   */
  loadActivities(per_page?: number): Promise<void>;

  /**
   * Formats raw activity data for display
   * @returns {FormattedActivity[]} Array of formatted activities
   * @example
   * const feedItems = activityService.renderActivities();
   */
  renderActivities(): FormattedActivity[];
}

export default ActivityService;