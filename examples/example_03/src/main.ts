/**
 * GitHub Profile Explorer
 * 
 * This script demonstrates the usage of GitHubAPIHelper class to fetch, process,
 * and display GitHub profile data including repositories, activities, and charts.
 */

// Import the GitHubAPIHelper class and ChartData type from the source directory
// (3 levels up: example_03 → examples → github-explorer-framework → src)
import GitHubAPIHelper from '../../../src';
import { ChartData } from '../../../src/types';

/**
 * Configuration object for GitHub API access
 * @type {Object}
 * @property {string} githubUsername - GitHub username to analyze
 * @property {string} githubToken - Personal access token for private data access
 * 
 * Note: In production, the token should be stored securely (environment variables)
 * and not hardcoded in the source.
 */
const config = {
  githubUsername: 'your-github-username-here',
  githubToken: 'your-github-token-here' // Optional: For accessing private data
};

// Create an instance of GitHubAPIHelper with the configuration
const githubHelper = new GitHubAPIHelper(config);

/**
 * Main asynchronous function to load and display GitHub data
 * Handles the complete workflow from data loading to display
 */
async function loadAndDisplayData() {
  try {
    console.log(' Loading GitHub data...');

    // Load all GitHub data (profile, repos, activities, etc.)
    await githubHelper.loadAllData();

    // Display basic profile information
    displayProfileInfo();

    // Display top repositories sorted by stars
    displayTopRepositories();

    // Display recent user activities
    displayRecentActivities();

    // Prepare and display chart data
    displayChartData();

  } catch (error) {
    console.error(' Error loading data:', error instanceof Error ? error.message : error);
  }
}

/**
 * Displays basic profile information
 */
function displayProfileInfo() {
  const profile = githubHelper.renderProfile();
  console.log('\n=== PROFILE ');
  console.log(` Name: ${profile.name}`);
  console.log(` Bio: ${profile.bio}`);
  console.log(` Followers: ${profile.followers}`);
  console.log(` Public Repositories: ${profile.publicRepos}`);
}

/**
 * Displays top 3 repositories sorted by star count
 */
function displayTopRepositories() {
  const repos = githubHelper.renderRepos('stars');
  console.log('\nTOP 3 REPOSITORIES');
  repos.slice(0, 3).forEach(repo => {
    console.log(`⭐ ${repo.name} - ${repo.stars} stars`);
    console.log(`   ${repo.description || 'No description'}`);
    console.log(`   ${repo.url}`);
  });
}

/**
 * Displays 5 most recent activities
 */
function displayRecentActivities() {
  const activities = githubHelper.renderActivities();
  console.log('\nRECENT ACTIVITIES ');
  activities.slice(0, 5).forEach(activity => {
    console.log(`[${activity.date}] ${activity.text}`);
  });
}

/**
 * Prepares and displays chart data for languages and commits
 */
function displayChartData() {
  const charts = githubHelper.renderCharts();
  console.log('\nCHART DATA');
  logChartData('Most used languages', charts.languages);
  logChartData('Commits by repository', charts.commits);
}

/**
 * Helper function to display chart data in console
 * @param {string} title - Chart title
 * @param {ChartData} chartData - Data to display (labels and values)
 */
function logChartData(title: string, chartData: ChartData) {
  console.log(`\n📊 ${title}:`);
  chartData.labels.forEach((label, i) => {
    console.log(`   ${label}: ${chartData.data[i]}`);
  });
}

// Execute the main function
loadAndDisplayData();