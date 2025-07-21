// Import required modules
import express from 'express'; // Express framework for building the server
import cors from 'cors'; // Cross-Origin Resource Sharing middleware
import path from 'path'; // Path utilities for working with file/directory paths
import { fileURLToPath } from 'url'; // URL utilities for ES modules
import { auth } from 'express-openid-connect'; // Auth0 authentication middleware
import dotenv from 'dotenv'; // Environment variables loader
import {
  UserService,
  RepoService,
  ActivityService,
  LanguageService,
  CommitService,
  ContributionService
} from '../../src/index.js'; // Custom GitHub data services

// 1. Configuration Setup
dotenv.config(); // Load environment variables from .env file

// Get current module path (ES modules alternative to __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of required environment variables
const requiredEnv = [
  'AUTH0_CLIENT_ID', // Auth0 application client ID
  'AUTH0_CLIENT_SECRET', // Auth0 application client secret
  'AUTH0_ISSUER_BASE_URL', // Auth0 domain URL
  'BASE_URL', // Base URL of the application
  'SESSION_SECRET', // Secret for session encryption
  'GITHUB_TOKEN', // GitHub personal access token
  'GITHUB_USERNAME' // GitHub username to fetch data for
];

// Check for missing environment variables
const missing = requiredEnv.filter(k => !process.env[k]);
if (missing.length > 0) {
  console.error('❌ Missing environment variables:', missing);
  process.exit(1); // Exit if any required variables are missing
}

// 2. Auth0 Configuration
const getAuth0Config = () => ({
  authRequired: false, // Authentication not required for all routes
  auth0Logout: true, // Enable Auth0 logout
  secret: process.env.SESSION_SECRET, // Session encryption secret
  baseURL: process.env.BASE_URL, // Base URL of the application
  clientID: process.env.AUTH0_CLIENT_ID, // Auth0 client ID
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL, // Auth0 domain
  clientSecret: process.env.AUTH0_CLIENT_SECRET, // Auth0 client secret
  authorizationParams: {
    response_type: 'code', // Authorization code flow
    scope: 'openid profile email' // Requested user data
  }
});

// 3. Application Initialization
const app = express(); // Create Express application

// Configure middleware
app.use(cors({ 
  origin: process.env.BASE_URL, // Allow requests from frontend
  credentials: true // Allow credentials/cookies
}));
app.use(auth(getAuth0Config())); // Add Auth0 authentication
app.use(express.json()); // Parse JSON request bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// 4. GitHub Authentication Fallback
// Attach GitHub credentials to every request
app.use((req, res, next) => {
  req.githubConfig = {
    githubUsername: process.env.GITHUB_USERNAME,
    githubToken: process.env.GITHUB_TOKEN
  };
  next();
});

// 5. Health Check Endpoint
// Simple endpoint to verify server is running
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    auth: req.oidc.isAuthenticated() ? req.oidc.user : 'unauthenticated'
  });
});

// 6. GitHub Data Endpoint
// Main endpoint that aggregates GitHub data
app.get('/api/github-data', async (req, res) => {
  try {
    const { githubToken, githubUsername } = req.githubConfig;

    // Validate GitHub credentials
    if (!githubToken || !githubUsername) {
      throw new Error('GITHUB_TOKEN and GITHUB_USERNAME are not configured.');
    }

    // Initialize GitHub data services
    const user = new UserService(req.githubConfig);
    const repo = new RepoService(req.githubConfig);
    const activity = new ActivityService(req.githubConfig);
    const contribution = new ContributionService(req.githubConfig);

    // Fetch all primary data in parallel
    const [userData, reposData, activitiesData, contributionsData] = await Promise.all([
      user.loadUserData(), // User profile data
      repo.loadReposData(), // Repository list
      activity.loadActivities(), // User activity
      contribution.loadContributionsData() // Contribution stats
    ]);

    // Validate repositories data
    if (!Array.isArray(reposData)) {
      console.error('❌ reposData is not an array:', reposData);
      throw new Error('Error loading repositories. Check if user exists and token has sufficient permissions.');
    }

    // Initialize services that depend on repositories
    const language = new LanguageService(req.githubConfig);
    const commit = new CommitService(req.githubConfig);

    // Fetch language and commit data for all repositories
    await Promise.all([
      language.loadLanguagesData(reposData), // Repository languages
      commit.loadCommitsData(reposData) // Commit history
    ]);

    // Return complete GitHub data
    res.json({
      user: userData,
      repositories: reposData,
      activities: activitiesData,
      languages: language.languagesData,
      commits: commit.commitsData,
      contributions: contributionsData
    });

  } catch (err) {
    console.error('❌ Error in /api/github-data:', err);
    res.status(500).json({ error: err.message });
  }
});

// 7. Authentication Routes
// Route to initiate Auth0 login
app.get('/login', (req, res) => {
  res.oidc.login({ returnTo: '/dashboard' }); // Redirect to dashboard after login
});

// Route to handle logout
app.get('/logout', (req, res) => {
  res.oidc.logout({ returnTo: process.env.BASE_URL }); // Redirect to base URL after logout
});

// 8. Frontend Fallback Route
// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 9. Server Startup
const PORT = process.env.PORT || 3000; // Use configured port or default to 3000
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${process.env.BASE_URL} (${PORT})`);
});