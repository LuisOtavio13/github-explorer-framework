import {
  GitLabUserService,
  GitLabRepoService,
  GitLabLanguageService,
  GitLabContributionService,
  GitLabActivityService,
  GitLabCommitService
} from '../../src/index.js'; 

// Configuration for the GitLab API
const config = {
  username: 'your_gitlab_username',
  token: '', // Can be left empty if public access is sufficient
  baseUrl: 'https://gitlab.com/api/v4'
};

async function buildGitLabDashboard() {
  try {
    // 1. Fetch basic user profile info (e.g., name, avatar, bio)
    const userService = new GitLabUserService(config);
    await userService.loadUserData();
    const profile = userService.renderProfile();
    console.log('User Profile:', profile);

    // 2. Fetch user repositories and sort by a specific criteria
    const repoService = new GitLabRepoService(config);
    await repoService.loadReposData('updated'); // Sort options: 'updated', 'stars', 'forks'
    const repositories = repoService.renderRepos();
    console.log('Repositories:', repositories);

    // 3. Analyze programming languages used in those repositories
    const languageService = new GitLabLanguageService(config);
    await languageService.loadLanguagesData(repoService.reposData);
    const languages = languageService.languagesData;
    console.log('Languages Used:', languages);

    // 4. Retrieve recent activities like issues, merge requests, etc.
    const activityService = new GitLabActivityService(config);
    await activityService.loadActivities();
    const activities = activityService.renderActivities();
    console.log('Recent Activities:', activities);

    // 5. Fetch commit statistics for each repository
    const commitService = new GitLabCommitService(config);
    await commitService.loadCommitsData(repoService.reposData);
    const commitsByRepo = commitService.commitsData;
    console.log('Commits by Repository:', commitsByRepo);

    // 6. Retrieve user contributions grouped by month for the current year
    const contributionService = new GitLabContributionService(config);
    await contributionService.loadContributionsData(); // Defaults to the current year
    const monthlyContributions = contributionService.contributionsData;
    console.log('Monthly Contributions:', monthlyContributions);

  } catch (error) {
    console.error('Error building GitLab dashboard:', error);
  }
}

buildGitLabDashboard();
