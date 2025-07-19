import UserService from '../src/services/UserService.js';

describe('UserService', () => {
  const config = { githubUsername: 'octocat', githubToken: '' };
  let service;

  beforeAll(() => {
    service = new UserService(config);
  });

  test('should load user data', async () => {
    await service.loadUserData();
    expect(service.userData).toBeDefined();
    expect(service.userData.login).toBe(config.githubUsername);
  });

  test('should render profile as a string', () => {
    const profile = service.renderProfile();
    expect(typeof profile).toBe('string');
  });
});
