import RepoService from '../src/services/RepoService.js';

describe('RepoService', () => {
  const config = { githubUsername: 'octocat', githubToken: '' };
  let service;

  beforeAll(() => {
    service = new RepoService(config);
  });

  test('should load repositories data', async () => {
    await service.loadReposData();
    expect(Array.isArray(service.reposData)).toBe(true);
  });

  test('should render repositories as a string', () => {
    const repos = service.renderRepos();
    expect(typeof repos).toBe('string');
  });
});
