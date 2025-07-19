// Import the UserService module to be tested
import UserService from '../src/services/UserService.js';

// Define the test suite for UserService
describe('UserService', () => {
  // Configuration object with GitHub username and optional token
  const config = { githubUsername: 'octocat', githubToken: '' };
  let service;

  // Initialize the service before running any tests
  beforeAll(() => {
    service = new UserService(config);
  });

  // Test: Verify that user data is successfully fetched
  test('should load user data', async () => {
    await service.loadUserData(); // Load data from GitHub API
    expect(service.userData).toBeDefined(); // Ensure userData exists
    expect(service.userData.login).toBe(config.githubUsername); // Confirm correct user was retrieved
  });

  // Test: Verify that the user profile can be rendered as a string
  test('should render profile as a string', () => {
    const profile = service.renderProfile(); // Convert user data to display format
    expect(typeof profile).toBe('string'); // Ensure the output is a string
  });
});
