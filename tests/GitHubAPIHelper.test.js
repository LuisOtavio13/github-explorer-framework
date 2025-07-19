// Import the GitHubAPIHelper module to be tested
import GitHubAPIHelper from '../src/index.js';

// Define the configuration for the test, using the public GitHub user 'octocat'
const config = {
  githubUsername: 'octocat', // Public test account
  githubToken: '' // Optional token (blank for public access)
};

// Define the test suite for GitHubAPIHelper
describe('GitHubAPIHelper', () => {
  let github;

  // Initialize the GitHubAPIHelper instance before running any tests
  beforeAll(() => {
    github = new GitHubAPIHelper(config);
  });

  // Test: Ensure that the helper can load all data successfully
  test('should load all data without throwing', async () => {
    await expect(github.loadAllData()).resolves.toBe(true);
  });

  // Test: Verify that user data is returned and includes the correct login name
  test('should return user data', () => {
    expect(github.userData).toBeDefined();
    expect(github.userData.login).toBe(config.githubUsername);
  });

  // Test: Verify that repository data is returned as an array
  test('should return repositories data', () => {
    expect(Array.isArray(github.reposData)).toBe(true);
  });

  // Test: Ensure that the rendered profile is a non-empty string
  test('should render profile as a string', () => {
    const profile = github.renderProfile();
    expect(typeof profile).toBe('string');
    expect(profile.length).toBeGreaterThan(0);
  });

  // Test: Ensure that the rendered repository list is a string
  test('should render repositories as a string', () => {
    const repos = github.renderRepos();
    expect(typeof repos).toBe('string');
  });

  // Test: Ensure that the rendered activity feed is a string
  test('should render activities as a string', () => {
    const activities = github.renderActivities();
    expect(typeof activities).toBe('string');
  });
});
