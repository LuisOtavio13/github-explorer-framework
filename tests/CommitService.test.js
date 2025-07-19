import CommitService from '../src/services/CommitService.js';
import RepoService from '../src/services/RepoService.js';

describe('CommitService', () => {
  const config = { githubUsername: 'octocat', githubToken: '' };
  let service;
  let repoService;

  beforeAll(async () => {
    service = new CommitService(config);
    repoService = new RepoService(config);
    await repoService.loadReposData();
  });

  test('should load commits data', async () => {
    await service.loadCommitsData(repoService.reposData);
    expect(typeof service.commitsData).toBe('object');
  });
});
