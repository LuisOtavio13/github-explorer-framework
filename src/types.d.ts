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
 * Core Type Definitions for GitHub Explorer Framework
 * 
 * This module contains all TypeScript interfaces and type definitions
 * used throughout the GitHub Explorer Framework.
 * 
 * @module Types
 */

/* ================ Core Configuration ================ */

/**
 * Configuration interface for GitHub API access
 * @interface GitHubConfig
 * @property {string} githubUsername - Required GitHub username
 * @property {string|null} [githubToken] - Optional personal access token for private data
 */
export interface GitHubConfig {
  githubUsername: string;
  githubToken?: string | null;
}

/* ================ Repository Types ================ */

/**
 * Raw repository data from GitHub API
 * @interface Repository
 */
export interface Repository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  url: string;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string | null;
  private: boolean;
  size: number;
  default_branch: string;
  [key: string]: any; // Additional API properties
}

/**
 * Formatted repository data for display
 * @interface FormattedRepo
 */
export interface FormattedRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  url: string;
}

/* ================ Activity Types ================ */

/**
 * Type for GitHub activity event types
 * @type ActivityType
 */
export type ActivityType = 
  | 'PushEvent' 
  | 'CreateEvent' 
  | 'PullRequestEvent'
  | 'IssuesEvent'
  | 'WatchEvent'
  | 'ForkEvent'
  | 'ReleaseEvent'
  | 'DeleteEvent'
  | string;

/**
 * Raw activity data from GitHub API
 * @interface Activity
 */
export interface Activity {
  id: string;
  type: ActivityType;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    ref?: string;
    ref_type?: string;
    action?: string;
    [key: string]: any;
  };
  public: boolean;
  created_at: string;
  [key: string]: any;
}

/**
 * Formatted activity data for display
 * @interface FormattedActivity
 */
export interface FormattedActivity {
  text: string;
  icon: string;
  date: string;
}

/* ================ Language Statistics Types ================ */

/**
 * Language usage statistics
 * @interface LanguageStats
 */
export interface LanguageStats {
  [language: string]: number;
}

/* ================ Commit Types ================ */

/**
 * Raw commit data from GitHub API
 * @interface Commit
 */
export interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
  };
  html_url: string;
  stats?: {
    additions?: number;
    deletions?: number;
    total?: number;
  };
  files?: CommitFile[];
  [key: string]: any;
}

/**
 * Commit file change information
 * @interface CommitFile
 */
export interface CommitFile {
  filename: string;
  status: 'added' | 'removed' | 'modified' | 'renamed';
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
  blob_url: string;
}

/**
 * Formatted commit data for display
 * @interface FormattedCommit
 */
export interface FormattedCommit {
  sha: string;
  message: string;
  author: string;
  date: Date;
  url: string;
  stats?: {
    additions?: number;
    deletions?: number;
    total?: number;
  };
}

/* ================ Contribution Types ================ */

/**
 * Contribution calendar data by month
 * @interface ContributionCalendar
 */
export interface ContributionCalendar {
  Jan: number;
  Feb: number;
  Mar: number;
  Apr: number;
  May: number;
  Jun: number;
  Jul: number;
  Aug: number;
  Sep: number;
  Oct: number;
  Nov: number;
  Dec: number;
}

/* ================ Repository Content Types ================ */

/**
 * File type classification
 * @type FileType
 */
export type FileType = 'file' | 'dir' | 'symlink' | 'submodule';

/**
 * Repository content item from GitHub API
 * @interface RepoContentItem
 */
export interface RepoContentItem {
  name: string;
  type: FileType;
  path: string;
  size?: number;
  html_url: string;
  download_url?: string | null;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

/**
 * Formatted repository content item
 * @interface FormattedContentItem
 */
export interface FormattedContentItem {
  name: string;
  type: FileType;
  path: string;
  size: string;
  url: string;
}

/* ================ User Profile Types ================ */

/**
 * Raw user profile data from GitHub API
 * @interface UserProfile
 */
export interface UserProfile {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

/**
 * Formatted user profile data for display
 * @interface FormattedProfile
 */
export interface FormattedProfile {
  avatarUrl: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos: number;
}

/* ================ Chart Data Types ================ */

/**
 * Data structure for chart visualization
 * @interface ChartData
 */
export interface ChartData {
  labels: string[];
  data: number[];
  backgroundColor?: string[];
}

/* ================ API Response Types ================ */

/**
 * Standardized API response format
 * @interface GitHubAPIResponse
 * @template T - Type of the response data
 */
export interface GitHubAPIResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

/* ================ Utility Function Types ================ */

/**
 * Helper function signatures
 * @interface Helpers
 */
export interface Helpers {
  getAuthHeaders: (githubToken?: string | null) => Record<string, string>;
  formatFileSize: (bytes: number) => string;
  formatDate: (date: string | Date) => string;
  formatDateTime: (date: string | Date) => string;
}

/**
 * Data formatting function signatures
 * @interface Formatters
 */
export interface Formatters {
  formatDate: (date: string | Date) => string;
  formatDateTime: (date: string | Date) => string;
  formatCommitMessage: (message: string) => string;
}