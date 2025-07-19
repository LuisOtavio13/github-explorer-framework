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