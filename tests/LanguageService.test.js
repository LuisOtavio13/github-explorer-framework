// Import the LanguageService and RepoService modules for testing
import LanguageService from '../src/services/LanguageService.js';
import RepoService from '../src/services/RepoService.js';

// Define the test suite for LanguageService
describe('LanguageService', () => {
  // Configuration object with a public GitHub username and optional token
  const config = { githubUsername: 'octocat', githubToken: '' };
  let service;
  let repoService;

  // Before all tests, initialize both services and fetch repository data
  beforeAll(async () => {
    service = new LanguageService(config);
    repoService = new RepoService(config);

    // Load repository metadata needed for language analysis
    await repoService.loadReposData();
  });

  // Test: Verifies that language data is successfully calculated and returned
  test('should load languages data', async () => {
    await service.loadLanguagesData(repoService.reposData); // Process languages from repos
    expect(typeof service.languagesData).toBe('object'); // Ensure result is an object
  });
});
