/**
 * Core Helper Utilities
 * 
 * Provides essential utility functions for GitHub API operations and data formatting.
 * 
 * @module Helpers
 */

/**
 * Generates authentication headers for GitHub API requests
 * @param {string|null} [githubToken] - Optional GitHub personal access token
 * @returns {Record<string, string>} Headers object with Authorization if token provided
 * @example
 * getAuthHeaders('ghp_abc123') // Returns { Authorization: 'Bearer ghp_abc123' }
 * getAuthHeaders() // Returns {}
 */
export function getAuthHeaders(githubToken?: string | null): Record<string, string>;

/**
 * Formats bytes into human-readable file size
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted size string (e.g., "1.5 MB")
 * @example
 * formatFileSize(1500000) // Returns "1.5 MB"
 */
export function formatFileSize(bytes: number): string;

/**
 * Formats a date string or Date object into localized date format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string (e.g., "January 1, 2023")
 */
export function formatDate(date: string | Date): string;

/**
 * Formats a date string or Date object into localized date-time format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date-time string (e.g., "Jan 1, 2023, 12:00 PM")
 */
export function formatDateTime(date: string | Date): string;

/**
 * Default export containing all helper functions
 */
declare const _default: {
  getAuthHeaders: typeof getAuthHeaders;
  formatFileSize: typeof formatFileSize;
  formatDate: typeof formatDate;
  formatDateTime: typeof formatDateTime;
};

export default _default;