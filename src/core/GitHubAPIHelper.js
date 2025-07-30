import BaseAPIHelper from './BaseAPIHelper.js';
import GitHubUserService from '../services/github/UserService.js';
import GitHubRepoService from '../services/github/RepoService.js';
import GitHubActivityService from '../services/github/ActivityService.js';
import GitHubLanguageService from '../services/github/LanguageService.js';
import GitHubCommitService from '../services/github/CommitService.js';
import GitHubContributionService from '../services/github/ContributionService.js';

class GitHubAPIHelper extends BaseAPIHelper {
  constructor(config) {
    super({
      username: config.username,
      token: config.token
    });

    // Mapeia para os campos esperados pelos serviços internos
    const serviceConfig = {
      githubUsername: config.username,
      githubToken: config.token
    };

    this.userService = new GitHubUserService(serviceConfig);
    this.repoService = new GitHubRepoService(serviceConfig);
    this.activityService = new GitHubActivityService(serviceConfig);
    this.languageService = new GitHubLanguageService(serviceConfig);
    this.commitService = new GitHubCommitService(serviceConfig);
    this.contributionService = new GitHubContributionService(serviceConfig);
  }

  async loadAllData() {
    try {
      await this.userService.loadUserData();
      await this.repoService.loadReposData();
      await this.activityService.loadActivities();
      await this.languageService.loadLanguagesData(this.repoService.reposData);
      await this.commitService.loadCommitsData(this.repoService.reposData);
      await this.contributionService.loadContributionsData();
      return true;
    } catch (err) {
      console.error('Erro ao carregar dados do GitHub:', err);
      throw err;
    }
  }
}

export default GitHubAPIHelper;