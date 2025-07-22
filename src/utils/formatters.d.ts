/**
 * Data Formatting Utilities
 * 
 * This module provides standardized formatting functions for GitHub data
 * to ensure consistent presentation across the application.
 * 
 * @module Formatters
 */

/**
 * Formats a date string or Date object into a localized date string
 * @param {string|Date} date - The date to format (ISO string or Date object)
 * @returns {string} Formatted date string (e.g., "January 1, 2023")
 * @example
 * formatDate('2023-01-01T12:00:00Z') // Returns "January 1, 2023"
 */
export function formatDate(date: string | Date): string;

/**
 * Formats a date string or Date object into a localized date-time string
 * @param {string|Date} date - The date to format (ISO string or Date object)
 * @returns {string} Formatted date-time string (e.g., "January 1, 2023 at 12:00 PM")
 * @example
 * formatDateTime('2023-01-01T12:00:00Z') // Returns "January 1, 2023 at 12:00 PM"
 */
export function formatDateTime(date: string | Date): string;

/**
 * Formats a Git commit message by:
 * 1. Trimming whitespace
 * 2. Capitalizing first letter
 * 3. Removing extra newlines
 * @param {string} message - Raw commit message
 * @returns {string} Formatted commit message
 * @example
 * formatCommitMessage('  fix: login issue\n\n') // Returns "Fix: login issue"
 */
export function formatCommitMessage(message: string): string;

/**
 * Default export containing all formatter functions
 */
declare const _default: {
  formatDate: typeof formatDate;
  formatDateTime: typeof formatDateTime;
  formatCommitMessage: typeof formatCommitMessage;
};

export default _default;