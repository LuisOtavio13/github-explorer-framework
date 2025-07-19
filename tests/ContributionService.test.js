import ContributionService from '../src/services/ContributionService.js';

describe('ContributionService', () => {
  const config = { githubUsername: 'octocat', githubToken: '' };
  let service;

  beforeAll(() => {
    service = new ContributionService(config);
  });

  test('should load contributions data', async () => {
    await service.loadContributionsData();
    expect(typeof service.contributionsData).toBe('object');
  });
});
