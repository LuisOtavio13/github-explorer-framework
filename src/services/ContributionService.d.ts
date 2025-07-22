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