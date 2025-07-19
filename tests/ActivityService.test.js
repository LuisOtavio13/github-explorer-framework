import ActivityService from '../src/services/ActivityService.js';

describe('ActivityService', () => {
  const config = { githubUsername: 'octocat', githubToken: '' };
  let service;

  beforeAll(() => {
    service = new ActivityService(config);
  });

  test('should load activities data', async () => {
    await service.loadActivities();
    expect(Array.isArray(service.activitiesData)).toBe(true);
  });

  test('should render activities as a string', () => {
    const activities = service.renderActivities();
    expect(typeof activities).toBe('string');
  });
});
