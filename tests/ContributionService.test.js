// Import the ContributionService module to be tested
import ContributionService from '../src/services/ContributionService.js';

// Define the test suite for ContributionService
describe('ContributionService', () => {
  // Configuration object with a public GitHub username and no token (suitable for public data)
  const config = { githubUsername: 'octocat', githubToken: '' };
  let service;

  // Initialize the service instance once before all tests
  beforeAll(() => {
    service = new ContributionService(config);
  });

  // Test: Verifies that contribution data can be successfully loaded
  test('should load contributions data', async () => {
    await service.loadContributionsData(); // Fetch contribution data from GitHub
    expect(typeof service.contributionsData).toBe('object'); // Ensure result is an object
  });
});
