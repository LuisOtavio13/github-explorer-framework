import {
  UserService,
  RepoService,
  ActivityService,
  LanguageService,
  CommitService,
  ContributionService
} from '../src/index.js';

const config = { githubUsername: 'octocat', githubToken: '' };

async function runAllServices() {
  // UserService
  const userService = new UserService(config);
  await userService.loadUserData();
  console.log('User:', userService.userData);
  console.log('Profile:', userService.renderProfile());

  // RepoService
  const repoService = new RepoService(config);
  await repoService.loadReposData();
  console.log('Repositories:', repoService.reposData);
  console.log('Repos Rendered:', repoService.renderRepos());

  // ActivityService
  const activityService = new ActivityService(config);
  await activityService.loadActivities();
  console.log('Activities:', activityService.activitiesData);
  console.log('Activities Rendered:', activityService.renderActivities());

  // LanguageService
  const languageService = new LanguageService(config);
  await languageService.loadLanguagesData(repoService.reposData);
  console.log('Languages:', languageService.languagesData);

  // CommitService
  const commitService = new CommitService(config);
  await commitService.loadCommitsData(repoService.reposData);
  console.log('Commits:', commitService.commitsData);

  // ContributionService
  const contributionService = new ContributionService(config);
  await contributionService.loadContributionsData();
  console.log('Contributions:', contributionService.contributionsData);
}

runAllServices();
