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
 * @file Main entry point for API Helper framework
 * @module APIHelper
 * @description 
 * Exports all framework components including:
 * - Main GitHub and GitLab API Helper classes
 * - Individual service classes for both platforms
 * - Utility functions
 * 
 * Provides both default and named exports for flexible importing.
 */

import GitHubAPIHelper from './core/GitHubAPIHelper.js';
import GitLabAPIHelper from './core/GitLabAPIHelper.js';

/**
 * Main GitHub API Helper class (default export remains GitHub for backward compatibility)
 * @see GitHubAPIHelper
 */
export default GitHubAPIHelper;

/**
 * Main GitLab API Helper class
 * @see GitLabAPIHelper
 */
export { GitLabAPIHelper };

/**
 * Individual GitHub service classes (named exports)
 * @namespace GitHubServices
 */
export { default as GitHubUserService } from './services/github/UserService.js';
export { default as GitHubRepoService } from './services/github/RepoService.js';
export { default as GitHubActivityService } from './services/github/ActivityService.js';
export { default as GitHubLanguageService } from './services/github/LanguageService.js';
export { default as GitHubCommitService } from './services/github/CommitService.js';
export { default as GitHubContributionService } from './services/github/ContributionService.js';

/**
 * Individual GitLab service classes (named exports)
 * @namespace GitLabServices
 */
export { default as GitLabUserService } from './services/gitlab/GitLabUserService.js';
export { default as GitLabRepoService } from './services/gitlab/GitLabRepoService.js';
export { default as GitLabActivityService } from './services/gitlab/GitLabActivityService.js';
export { default as GitLabLanguageService } from './services/gitlab/GitLabLanguageService.js';
export { default as GitLabCommitService } from './services/gitlab/GitLabCommitService.js';
export { default as GitLabContributionService } from './services/gitlab/GitLabContributionService.js';

/**
 * Utility functions (wildcard export)
 * @namespace Utils
 * @see module:utils/helpers
 */
export * from './utils/helpers.js';

/**
 * Legacy service exports (maintains backward compatibility)
 * @deprecated Use platform-specific services instead
 * @namespace Services
 */
export { default as UserService } from './services/github/UserService.js';
export { default as RepoService } from './services/github/RepoService.js';
export { default as ActivityService } from './services/github/ActivityService.js';
export { default as LanguageService } from './services/github/LanguageService.js';
export { default as CommitService } from './services/github/CommitService.js';
export { default as ContributionService } from './services/github/ContributionService.js';