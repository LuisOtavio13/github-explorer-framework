/**
 * Main entry point for GitHub Explorer Framework
 * 
 * This module serves as the central export point for all framework functionality,
 * including the main helper class, individual services, utility functions, and type definitions.
 * 
 * @module GitHubAPIHelper
 */

/**
 * Core GitHub API Helper class
 * Provides high-level access to GitHub data through integrated services
 */
import GitHubAPIHelper from './core/GitHubAPIHelper';

/**
 * Service Modules
 * Individual services that handle specific GitHub data domains
 */
import UserService from './services/UserService';        // Handles user profile data
import RepoService from './services/RepoService';        // Manages repository data
import ActivityService from './services/ActivityService'; // Processes user activities
import LanguageService from './services/LanguageService'; // Analyzes language usage
import CommitService from './services/CommitService';    // Tracks commit statistics
import ContributionService from './services/ContributionService'; // Manages contribution data

/**
 * Utility Modules
 * Helper functions for data processing and formatting
 */
import * as helpers from './utils/helpers';       // General utility functions
import * as formatters from './utils/formatters'; // Data formatting utilities

// Main framework export - the GitHubAPIHelper class
export default GitHubAPIHelper;

/**
 * Service Exports
 * Individual services can be imported for specialized use cases
 */
export {
  UserService,
  RepoService,
  ActivityService,
  LanguageService,
  CommitService,
  ContributionService
};

/**
 * Utility Exports
 * Helper functions for custom data processing
 */
export { helpers, formatters };

/**
 * Type Exports
 * All type definitions for TypeScript support
 */
export * from './types';