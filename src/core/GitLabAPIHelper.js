// src/core/GitLabAPIHelper.js
import BaseAPIHelper from './BaseAPIHelper.js';
import GitLabUserService from '../services/gitlab/GitLabUserService.js';
import GitLabRepoService from '../services/gitlab/GitLabRepoService.js';
import GitLabActivityService from '../services/gitlab/GitLabActivityService.js';
import GitLabLanguageService from '../services/gitlab/GitLabLanguageService.js';
import GitLabCommitService from '../services/gitlab/GitLabCommitService.js';
import GitLabContributionService from '../services/gitlab/GitLabContributionService.js';

class GitLabAPIHelper extends BaseAPIHelper {
    constructor(config) {
    super({
      username: config.username,
      token: config.token,
      baseUrl: config.baseUrl || 'https://gitlab.com/api/v4'
    });

    // Inicializa serviços do GitLab
    this.userService = new GitLabUserService(this.config);
    this.repoService = new GitLabRepoService(this.config);
    this.activityService = new GitLabActivityService(this.config);
    this.languageService = new GitLabLanguageService(this.config);
    this.commitService = new GitLabCommitService(this.config);
    this.contributionService = new GitLabContributionService(this.config);
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
      console.error('Erro ao carregar dados do GitLab:', err);
      throw err;
    }
  }
}

export default GitLabAPIHelper;