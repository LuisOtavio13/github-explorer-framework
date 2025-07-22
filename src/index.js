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
 * @file Main entry point for GitHub API Helper framework
 * @module GitHubAPIHelper
 * @description 
 * Exports all framework components including:
 * - Main GitHubAPIHelper class
 * - Individual service classes
 * - Utility functions
 * 
 * Provides both default and named exports for flexible importing.
 */

import GitHubAPIHelper from './core/GitHubAPIHelper.js';

/**
 * Main GitHub API Helper class (default export)
 * @see GitHubAPIHelper
 */
export default GitHubAPIHelper;

/**
 * Individual service classes (named exports)
 * @namespace Services
 */
export { default as UserService } from './services/UserService.js';       // Handles user profile data
export { default as RepoService } from './services/RepoService.js';       // Manages repository operations
export { default as ActivityService } from './services/ActivityService.js'; // Processes user activities
export { default as LanguageService } from './services/LanguageService.js'; // Analyzes language statistics
export { default as CommitService } from './services/CommitService.js';    // Handles commit-related operations
export { default as ContributionService } from './services/ContributionService.js'; // Manages contribution data

/**
 * Utility functions (wildcard export)
 * @namespace Utils
 * @see module:utils/helpers
 */
export * from './utils/helpers.js';