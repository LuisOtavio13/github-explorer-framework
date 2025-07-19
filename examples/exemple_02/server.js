/**
 * GitHub Dashboard Server - Modern ES Modules Version
 * 
 * Provides API endpoints for GitHub data and serves the frontend
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

// Configure __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// Middleware Configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// GitHub API Configuration
const githubConfig = {
  githubUsername: 'TylorSwift2',
  githubToken: 'YOUR_TOKEN'
};

// API Endpoints

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Main GitHub Data Endpoint
app.get('/api/github-data', async (req, res) => {
  try {
    console.log('Fetching GitHub data...');
    
    const services = {
      user: new UserService(githubConfig),
      repo: new RepoService(githubConfig),
      activity: new ActivityService(githubConfig),
      language: new LanguageService(githubConfig),
      commit: new CommitService(githubConfig),
      contribution: new ContributionService(githubConfig)
    };

    // Load independent data in parallel
    await Promise.all([
      services.user.loadUserData(),
      services.repo.loadReposData(),
      services.activity.loadActivities(),
      services.contribution.loadContributionsData()
    ]);

    // Load dependent data
    await services.language.loadLanguagesData(services.repo.reposData);
    await services.commit.loadCommitsData(services.repo.reposData);

    const response = {
      user: formatUserProfile(services.user.userData),
      repositories: formatRepositories(services.repo.reposData),
      activities: formatActivities(services.activity.activitiesData),
      languages: services.language.languagesData,
      commits: formatCommits(services.commit.commitsData),
      contributions: formatContributions(services.contribution.contributionsData),
      lastUpdated: new Date().toISOString()
    };

    console.log('GitHub data fetched successfully');
    res.json(response);

  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch GitHub data',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Serve Frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Data Formatting Functions
function formatUserProfile(userData) {
  if (!userData) return null;
  
  return {
    avatarUrl: userData.avatar_url || '',
    name: userData.name || userData.login || 'GitHub User',
    bio: userData.bio || 'No bio available',
    followers: userData.followers || 0,
    following: userData.following || 0,
    publicRepos: userData.public_repos || 0,
    location: userData.location || 'Unknown',
    profileUrl: userData.html_url || '#'
  };
}

function formatRepositories(reposData) {
  if (!reposData || !reposData.length) return [];
  
  return reposData.map(repo => ({
    name: repo.name || 'Unnamed repository',
    fullName: repo.full_name || '',
    description: repo.description || 'No description',
    language: repo.language || 'Not specified',
    stars: repo.stargazers_count || 0,
    forks: repo.forks_count || 0,
    updatedAt: repo.updated_at || new Date().toISOString(),
    url: repo.html_url || '#',
    openIssues: repo.open_issues_count || 0
  })).sort((a, b) => b.stars - a.stars);
}

function formatActivities(activitiesData) {
  if (!activitiesData || !activitiesData.length) return [];
  
  return activitiesData.map(activity => {
    const repoName = activity.repo?.name || 'Unknown repository';
    
    let icon, text;
    switch(activity.type) {
      case 'PushEvent':
        icon = 'fa-code-commit';
        text = `Pushed to ${repoName}`;
        break;
      case 'CreateEvent':
        icon = 'fa-plus-circle';
        text = `Created ${activity.payload.ref_type || 'resource'} in ${repoName}`;
        break;
      case 'WatchEvent':
        icon = 'fa-star';
        text = `Starred ${repoName}`;
        break;
      default:
        icon = 'fa-github-alt';
        text = `Performed ${activity.type} on ${repoName}`;
    }

    return {
      icon,
      text,
      date: activity.created_at || new Date().toISOString(),
      type: activity.type
    };
  });
}

function formatCommits(commitsData) {
  if (!commitsData) return [];
  
  if (Array.isArray(commitsData)) {
    return commitsData.map(commit => ({
      repository: commit.repository || 'Unknown repository',
      commitCount: commit.commitCount || 0,
      message: commit.message || `Made ${commit.commitCount || 0} commits`
    }));
  }
  
  return Object.entries(commitsData).map(([repo, count]) => ({
    repository: repo,
    commitCount: count,
    message: `Made ${count} ${count === 1 ? 'commit' : 'commits'} in ${repo}`
  }));
}

function formatContributions(contributionsData) {
  if (!contributionsData) return [];
  
  return Object.entries(contributionsData).map(([month, count]) => ({
    month: month || 'Unknown month',
    contributionCount: count || 0
  }));
}

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`
  🚀 Server running in ${ENV} mode
  🔗 http://localhost:${PORT}
  📅 ${new Date().toLocaleString()}
  `);
});