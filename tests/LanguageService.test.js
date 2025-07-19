import LanguageService from '../src/services/LanguageService.js';
import RepoService from '../src/services/RepoService.js';

describe('LanguageService', () => {
  const config = { githubUsername: 'octocat', githubToken: '' };
  let service;
  let repoService;

  beforeAll(async () => {
    service = new LanguageService(config);
    repoService = new RepoService(config);
    await repoService.loadReposData();
  });

  test('should load languages data', async () => {
    await service.loadLanguagesData(repoService.reposData);
    expect(typeof service.languagesData).toBe('object');
  });
});
