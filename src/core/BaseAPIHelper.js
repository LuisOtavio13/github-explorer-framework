/**
 * Classe base para API Helpers
 */
export class BaseAPIHelper {
  constructor(config) {
    if (!config || !config.username) {
      throw new Error('Nome de usuário é obrigatório');
    }

    this.config = {
      username: config.username,
      token: config.token || null,
      baseUrl: config.baseUrl || null
    };

    // Serviços que serão implementados
    this.userService = null;
    this.repoService = null;
    this.activityService = null;
    this.languageService = null;
    this.commitService = null;
    this.contributionService = null;

    // Estado atual
    this.currentRepo = null;
    this.currentPath = '';
    this.currentCommit = null;
  }

  async loadAllData() {
    throw new Error('Método loadAllData() deve ser implementado');
  }

  // Getters
  get userData() { return this.userService?.userData; }
  get reposData() { return this.repoService?.reposData; }
  get activitiesData() { return this.activityService?.activitiesData; }
  get languagesData() { return this.languageService?.languagesData; }
  get commitsData() { return this.commitService?.commitsData; }
  get contributionsData() { return this.contributionService?.contributionsData; }

  // Métodos de renderização
  renderProfile() { return this.userService?.renderProfile(); }
  renderActivities() { return this.activityService?.renderActivities(); }
  renderRepos(sort) { return this.repoService?.renderRepos(sort); }

  renderCharts() {
    return {
      languages: {
        labels: Object.keys(this.languagesData || {}),
        data: Object.values(this.languagesData || {})
      },
      commits: {
        labels: Object.keys(this.commitsData || {}).slice(0, 10),
        data: Object.values(this.commitsData || {}).slice(0, 10)
      },
      contributions: {
        labels: Object.keys(this.contributionsData || {}),
        data: Object.values(this.contributionsData || {})
      }
    };
  }
}

export default BaseAPIHelper;