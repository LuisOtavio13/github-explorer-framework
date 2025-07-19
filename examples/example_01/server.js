/**
 * GitHub API Explorer Server
 * 
 * This Express server provides an API endpoint to fetch GitHub user data
 * and serves a frontend dashboard to display the information.
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  UserService,
  RepoService,
  ActivityService,
  LanguageService,
  CommitService,
  ContributionService
} from '../../src/index.js';

// Configure __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express application
const app = express();

// ======================
// Middleware Configuration
// ======================

/**
 * CORS middleware - Allows cross-origin requests
 * JSON middleware - Parses incoming JSON requests
 * Static files - Serves files from the 'public' directory
 */
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ======================
// Configuration
// ======================

/**
 * GitHub API configuration
 * WARNING: In production, use environment variables for sensitive data
 */
const config = {
  githubUsername: 'TylorSwift2',
  githubToken: 'TOKEN' // Replace with process.env.GITHUB_TOKEN
};

// ======================
// Utility Functions
// ======================

/**
 * Async handler wrapper for route controllers
 * @param {Function} fn - Async route handler function
 * @returns {Function} Wrapped function with error handling
 */
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ======================
// Route Handlers
// ======================

/**
 * Serve frontend index.html
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * Main API endpoint - Fetches and aggregates GitHub data
 * @returns {Object} Comprehensive GitHub user data including:
 *   - User profile
 *   - Repositories
 *   - Activities
 *   - Language statistics
 *   - Commit history
 *   - Contribution data
 */
app.get('/api/github-data', asyncHandler(async (req, res) => {
  try {
    // Initialize all GitHub data services
    const services = {
      user: new UserService(config),
      repo: new RepoService(config),
      activity: new ActivityService(config),
      language: new LanguageService(config),
      commit: new CommitService(config),
      contribution: new ContributionService(config)
    };

    // Load basic data in parallel for better performance
    await Promise.all([
      services.user.loadUserData(),
      services.repo.loadReposData(),
      services.activity.loadActivities(),
      services.contribution.loadContributionsData()
    ]);

    // Load dependent data (requires results from previous calls)
    await services.language.loadLanguagesData(services.repo.reposData);
    await services.commit.loadCommitsData(services.repo.reposData);

    // Format the complete response object
    const response = {
      user: formatUserData(services.user.userData),
      repos: formatReposData(services.repo.reposData),
      activities: formatActivitiesData(services.activity.activitiesData),
      languages: services.language.languagesData,
      commits: formatCommitsData(services.commit.commitsData),
      contributions: formatContributionsData(services.contribution.contributionsData)
    };

    res.json(response);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}));

// ======================
// Data Formatting Functions
// ======================

/**
 * Formats GitHub user data for the frontend
 * @param {Object} userData - Raw GitHub API user data
 * @returns {Object} Formatted user data
 */
function formatUserData(userData) {
  return {
    avatarUrl: userData.avatar_url,
    name: userData.name || userData.login,
    bio: userData.bio || 'No bio available',
    followers: userData.followers,
    following: userData.following,
    publicRepos: userData.public_repos,
    location: userData.location
  };
}

/**
 * Formats repositories data
 * @param {Array} reposData - Raw GitHub API repos data
 * @returns {Array} Formatted repositories data
 */
function formatReposData(reposData) {
  return reposData.map(repo => ({
    name: repo.name,
    description: repo.description || 'No description',
    language: repo.language || 'N/A',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.updated_at,
    url: repo.html_url
  }));
}

/**
 * Formats activities data with appropriate icons and text
 * @param {Array} activitiesData - Raw GitHub API activities data
 * @returns {Array} Formatted activities data
 */
function formatActivitiesData(activitiesData) {
  return activitiesData.map(activity => ({
    icon: getActivityIcon(activity.type),
    text: getActivityText(activity),
    date: activity.created_at
  }));
}

/**
 * Formats commits data handling different input formats
 * @param {Object|Array} commitsData - Raw commits data
 * @returns {Array} Formatted commits data
 */
function formatCommitsData(commitsData) {
  if (!commitsData) return [];
  if (Array.isArray(commitsData)) return commitsData;
  if (typeof commitsData === 'object') {
    return Object.entries(commitsData).map(([repo, count]) => ({
      repo,
      count,
      message: `${count} commits in repository ${repo}`
    }));
  }
  return [];
}

/**
 * Formats contributions data by month
 * @param {Object} contributionsData - Raw contributions data
 * @returns {Array} Formatted contributions data by month
 */
function formatContributionsData(contributionsData) {
  return Object.entries(contributionsData).map(([month, count]) => ({
    month,
    count
  }));
}

/**
 * Gets appropriate Font Awesome icon for activity type
 * @param {String} type - GitHub activity type
 * @returns {String} Font Awesome icon class
 */
function getActivityIcon(type) {
  const icons = {
    PushEvent: 'fa-code-commit',
    CreateEvent: 'fa-plus-circle',
    IssuesEvent: 'fa-exclamation-circle',
    PullRequestEvent: 'fa-code-branch'
  };
  return icons[type] || 'fa-code';
}

/**
 * Generates human-readable text for activities
 * @param {Object} activity - GitHub activity object
 * @returns {String} Descriptive activity text
 */
function getActivityText(activity) {
  switch(activity.type) {
    case 'PushEvent':
      return `Pushed to ${activity.repo.name}`;
    case 'CreateEvent':
      return `Created ${activity.payload.ref_type} in ${activity.repo.name}`;
    default:
      return `${activity.type} on ${activity.repo.name}`;
  }
}

// ======================
// Utility Routes
// ======================

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// ======================
// Error Handlers
// ======================

/**
 * 404 Handler - For undefined routes
 */
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ======================
// Server Initialization
// ======================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
