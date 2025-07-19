// Import the ActivityService module to be tested
import ActivityService from '../src/services/ActivityService.js';

// Define the test suite for ActivityService
describe('ActivityService', () => {
  // Prepare a basic configuration with a public GitHub username
  const config = { githubUsername: 'octocat', githubToken: '' };
  let service;

  // Initialize the service instance once before all tests
  beforeAll(() => {
    service = new ActivityService(config);
  });

  // Test: Verifies that activities can be successfully loaded
  test('should load activities data', async () => {
    await service.loadActivities(); // Fetches activity data from GitHub
    expect(Array.isArray(service.activitiesData)).toBe(true); // Ensures result is an array
  });

  // Test: Verifies that activities can be rendered as a string
  test('should render activities as a string', () => {
    const activities = service.renderActivities(); // Converts data to display format
    expect(typeof activities).toBe('string'); // Checks return type
  });
});
