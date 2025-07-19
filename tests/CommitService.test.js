// Import the CommitService and RepoService modules for testing
import CommitService from '../src/services/CommitService.js';
import RepoService from '../src/services/RepoService.js';

// Define the test suite for CommitService
describe('CommitService', () => {
  // Configuration object with a public GitHub username
  const config = { githubUsername: 'octocat', githubToken: '' };
  let service;
  let repoService;

  // Before all tests, initialize both services and load repository data
  beforeAll(async () => {
    service = new CommitService(config);
    repoService = new RepoService(config);

    // Fetch repository data required for commit loading
    await repoService.loadReposData();
  });

  // Test: Verifies that commit data is successfully loaded and structured
  test('should load commits data', async () => {
    await service.loadCommitsData(repoService.reposData); // Load commit statistics based on repo data
    expect(typeof service.commitsData).toBe('object'); // Check that result is an object
  });
});
