import GitHubAPIHelper from '../src/index.js';

const config = {
  githubUsername: 'octocat', // Use a public test user
  githubToken: '' // Leave blank or use a test token if available
};

describe('GitHubAPIHelper', () => {
  let github;

  beforeAll(() => {
    github = new GitHubAPIHelper(config);
  });

  test('should load all data without throwing', async () => {
    await expect(github.loadAllData()).resolves.toBe(true);
  });

  test('should return user data', () => {
    expect(github.userData).toBeDefined();
    expect(github.userData.login).toBe(config.githubUsername);
  });

  test('should return repositories data', () => {
    expect(Array.isArray(github.reposData)).toBe(true);
  });

  test('should render profile as a string', () => {
    const profile = github.renderProfile();
    expect(typeof profile).toBe('string');
    expect(profile.length).toBeGreaterThan(0);
  });

  test('should render repositories as a string', () => {
    const repos = github.renderRepos();
    expect(typeof repos).toBe('string');
  });

  test('should render activities as a string', () => {
    const activities = github.renderActivities();
    expect(typeof activities).toBe('string');
  });
});
