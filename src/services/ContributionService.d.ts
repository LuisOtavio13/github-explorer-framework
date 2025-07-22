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
 * Contribution Service
 * 
 * Handles fetching and processing of GitHub contribution data including commit calendars.
 * 
 * @class ContributionService
 */

import { GitHubConfig, ContributionCalendar } from '../types';

declare class ContributionService {
  /**
   * Creates a ContributionService instance
   * @param {GitHubConfig} config - Configuration object with GitHub credentials
   */
  constructor(config: GitHubConfig);

  /**
   * Contribution calendar data
   * @type {ContributionCalendar}
   * @description Monthly contribution counts in the format:
   * {
   *   Jan: number,
   *   Feb: number,
   *   ...
   *   Dec: number
   * }
   */
  contributionsData: ContributionCalendar;

  /**
   * Loads contribution data for a specific year
   * @param {number} [year=new Date().getFullYear()] - Year to fetch contributions for
   * @returns {Promise<void>} Resolves when contribution data is loaded
   * @throws {Error} If API request fails
   * @example
   * await contributionService.loadContributionsData(2023);
   */
  loadContributionsData(year?: number): Promise<void>;
}

export default ContributionService;