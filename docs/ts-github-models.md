# GitHub Integration Types (TypeScript)

## Core Types

interface GitHubConfig {
  githubUsername: string;
  githubToken?: string;
}

interface Repository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface FormattedRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  url: string;
}

## Activity Types

type ActivityType = 
  | 'PushEvent'
  | 'CreateEvent'
  | 'PullRequestEvent'
  | 'IssuesEvent';

interface Activity {
  id: string;
  type: ActivityType;
  repo: {
    name: string;
  };
  created_at: string;
  payload: {
    action?: string;
    ref?: string;
  };
}

interface FormattedActivity {
  text: string;
  icon: string;
  date: string;
}

## User Types

interface UserProfile {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

interface FormattedProfile {
  avatarUrl: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos: number;
}

## Utility Types

interface Helpers {
  getAuthHeaders(token?: string | null): Record<string, string>;
  formatFileSize(bytes: number): string;
  formatDate(date: Date | string): string;
}

interface Formatters {
  formatCommitMessage(message: string): string;
  formatDateTime(date: Date | string): string;
}
