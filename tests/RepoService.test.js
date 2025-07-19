// Import the RepoService class to be tested
import RepoService from '../src/services/RepoService.js';

// Define the test suite for RepoService
describe('RepoService', () => {
  // Configuration object with GitHub username (token optional for public data)
  const config = { githubUsername: 'octocat', githubToken: '' };
  let service;

  // Initialize the service instance before running any tests
  beforeAll(() => {
    service = new RepoService(config);
  });

  // Test: Verifies that repository data is loaded successfully
  test('should load repositories data', async () => {
    await service.loadReposData(); // Fetch repository list from GitHub
    expect(Array.isArray(service.reposData)).toBe(true); // Check if the result is an array
  });

  // Test: Verifies that repository data can be rendered as a string
  test('should render repositories as a string', () => {
    const repos = service.renderRepos(); // Convert repository data to display string
    expect(typeof repos).toBe('string'); // Ensure the output type is string
  });
});
