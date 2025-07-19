/**
 * Formats a date string into a readable date format
 * @param {string|Date} date - The date to format (ISO string or Date object)
 * @returns {string} Formatted date in 'MMM DD, YYYY' format (e.g. 'Jan 15, 2023')
 * @example
 * // Returns "Jan 15, 2023"
 * formatDate('2023-01-15T12:00:00Z');
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Formats a date string into a readable date and time format
 * @param {string|Date} date - The date to format (ISO string or Date object)
 * @returns {string} Formatted datetime in 'MMM DD, YYYY, HH:MM AM/PM' format
 *                  (e.g. 'Jan 15, 2023, 12:00 PM')
 * @example
 * // Returns "Jan 15, 2023, 12:00 PM"
 * formatDateTime('2023-01-15T12:00:00Z');
 */
export function formatDateTime(date) {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Extracts the first line from a commit message (removes details and newlines)
 * @param {string} message - The full commit message
 * @returns {string} The first line of the commit message
 * @example
 * // Returns "Fix login bug"
 * formatCommitMessage("Fix login bug\n\n- Fix null pointer exception\n- Add validation");
 */
export function formatCommitMessage(message) {
  return message.split('\n')[0];
}