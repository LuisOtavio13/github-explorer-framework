// Configuration type
interface GitHubConfig {
  githubUsername: string;
  githubToken?: string | null;
}

// Repository type
interface Repository {
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
  // Add other repository properties as needed
}

// Activity/Event types
type ActivityType = 
  | 'PushEvent' 
  | 'CreateEvent' 
  | 'PullRequestEvent' 
  | 'IssuesEvent' 
  | string;

interface Activity {
  type: ActivityType;
  repo: {
    name: string;
  };
  payload: {
    ref_type?: string;
    action?: string;
  };
  created_at: string;
}

// Language statistics
interface LanguageStats {
  [language: string]: number;
}

// Commit types
interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
  stats?: {
    additions?: number;
    deletions?: number;
    total?: number;
  };
  files?: Array<{
    filename: string;
    status: string;
    additions: number;
    deletions: number;
    changes: number;
    patch?: string;
  }>;
}

// Contribution types
interface ContributionCalendar {
  [month: string]: number;
}

// File/directory types
type FileType = 'file' | 'dir';

interface RepoContentItem {
  name: string;
  type: FileType;
  path: string;
  size?: number;
  html_url: string;
}

export {
  GitHubConfig,
  Repository,
  Activity,
  ActivityType,
  LanguageStats,
  Commit,
  ContributionCalendar,
  RepoContentItem,
  FileType
};