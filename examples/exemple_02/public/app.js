/**
 * GitHub Dashboard - Frontend Application
 */
document.addEventListener('DOMContentLoaded', async () => {
  // DOM Elements
  const elements = {
    loading: document.getElementById('loading'),
    error: document.getElementById('error'),
    userProfile: document.getElementById('user'),
    repos: document.getElementById('repos'),
    activities: document.getElementById('activities'),
    languages: document.getElementById('languages'),
    commits: document.getElementById('commits'),
    contributions: document.getElementById('contributions'),
    refreshBtn: document.getElementById('refresh-btn'),
    lastUpdated: document.getElementById('last-updated')
  };

  // State management
  const state = {
    data: null,
    loading: false,
    error: null,
    lastUpdated: null
  };

  // Initialize the application
  init();

  // Event listeners
  if (elements.refreshBtn) {
    elements.refreshBtn.addEventListener('click', fetchData);
  }

  // Initialize function
  function init() {
    const cachedData = localStorage.getItem('githubDashboardData');
    const lastUpdated = localStorage.getItem('githubDashboardLastUpdated');
    
    if (cachedData && lastUpdated) {
      try {
        state.data = JSON.parse(cachedData);
        state.lastUpdated = new Date(lastUpdated);
        renderData(state.data);
        updateLastUpdatedDisplay();
      } catch (e) {
        console.error('Error parsing cached data:', e);
        localStorage.removeItem('githubDashboardData');
        localStorage.removeItem('githubDashboardLastUpdated');
      }
    }
    
    fetchData();
  }

  // Main data fetching function
  async function fetchData() {
    try {
      setLoadingState(true);
      clearErrorState();
      hideContentSections();

      const response = await fetch('/api/github-data', {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      state.data = data;
      state.lastUpdated = new Date();
      state.error = null;
      
      localStorage.setItem('githubDashboardData', JSON.stringify(data));
      localStorage.setItem('githubDashboardLastUpdated', state.lastUpdated.toISOString());
      
      renderData(data);
      updateLastUpdatedDisplay();
      document.body.classList.add('data-loaded');
      
    } catch (err) {
      handleError(err);
    } finally {
      setLoadingState(false);
    }
  }

  function setLoadingState(isLoading) {
    state.loading = isLoading;
    elements.loading.style.display = isLoading ? 'block' : 'none';
    document.body.classList.toggle('loading', isLoading);
  }

  function clearErrorState() {
    state.error = null;
    elements.error.style.display = 'none';
    elements.error.innerHTML = '';
  }

  function hideContentSections() {
    Object.values(elements).forEach(el => {
      if (el !== elements.loading && el !== elements.error) {
        el.style.display = 'none';
      }
    });
  }

  function handleError(error) {
    console.error('Error:', error);
    state.error = error;
    
    elements.error.innerHTML = `
      <div class="error-content">
        <i class="fas fa-exclamation-triangle"></i>
        <div>
          <strong>Error loading data</strong>
          <p>${error.message}</p>
          ${state.data ? '<p>Showing cached data from ' + formatDate(state.lastUpdated) + '</p>' : ''}
        </div>
      </div>
      <button class="retry-btn">Retry</button>
    `;
    
    elements.error.style.display = 'flex';
    
    const retryBtn = elements.error.querySelector('.retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', fetchData);
    }
    
    if (state.data) {
      renderData(state.data);
    }
  }

  function updateLastUpdatedDisplay() {
    if (elements.lastUpdated && state.lastUpdated) {
      elements.lastUpdated.textContent = `Last updated: ${formatRelativeTime(state.lastUpdated)}`;
    }
  }

  function renderData(data) {
    if (!data) return;
    
    renderUserProfile(data.user);
    renderRepositories(data.repositories);
    renderActivities(data.activities);
    renderLanguages(data.languages);
    renderCommits(data.commits);
    renderContributions(data.contributions);
    
    setTimeout(() => {
      Object.values(elements).forEach(el => {
        if (el !== elements.loading && el !== elements.error) {
          el.style.display = 'block';
        }
      });
    }, 100);
  }

  function renderUserProfile(user) {
    if (!user) {
      elements.userProfile.innerHTML = '<p class="no-data">No user data available</p>';
      return;
    }
    
    elements.userProfile.innerHTML = `
      <div class="profile-card">
        <img src="${user.avatarUrl}" alt="${user.name}" class="profile-avatar" />
        <div class="profile-info">
          <h1>${user.name}</h1>
          <p class="profile-bio">${user.bio}</p>
          <div class="profile-stats">
            <div class="stat">
              <i class="fas fa-users"></i>
              <span>${formatNumber(user.followers)} followers</span>
            </div>
            <div class="stat">
              <i class="fas fa-user-friends"></i>
              <span>${formatNumber(user.following)} following</span>
            </div>
            <div class="stat">
              <i class="fas fa-book"></i>
              <span>${formatNumber(user.publicRepos)} repos</span>
            </div>
            ${user.location ? `
            <div class="stat">
              <i class="fas fa-map-marker-alt"></i>
              <span>${user.location}</span>
            </div>` : ''}
          </div>
          <a href="${user.profileUrl}" target="_blank" class="profile-link">
            View on GitHub <i class="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
    `;
  }

  function renderRepositories(repos) {
    if (!repos || !repos.length) {
      elements.repos.innerHTML = '<p class="no-data">No repositories found</p>';
      return;
    }
    
    elements.repos.innerHTML = `
      <h2 class="section-title">Repositories</h2>
      <div class="repos-grid">
        ${repos.map(repo => `
          <div class="repo-card">
            <h3>
              <a href="${repo.url}" target="_blank" rel="noopener noreferrer">
                ${repo.name}
              </a>
            </h3>
            <p class="repo-description">${repo.description}</p>
            <div class="repo-meta">
              ${repo.language ? `<span class="repo-language">
                <span class="language-color" style="background-color: ${getLanguageColor(repo.language)}"></span>
                ${repo.language}
              </span>` : ''}
              <span class="repo-stars">
                <i class="fas fa-star"></i> ${formatNumber(repo.stars)}
              </span>
              <span class="repo-forks">
                <i class="fas fa-code-branch"></i> ${formatNumber(repo.forks)}
              </span>
              <span class="repo-updated">
                <i class="fas fa-clock"></i> ${formatDate(repo.updatedAt)}
              </span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderActivities(activities) {
    if (!activities || !activities.length) {
      elements.activities.innerHTML = '<p class="no-data">No recent activity</p>';
      return;
    }
    
    elements.activities.innerHTML = `
      <h2 class="section-title">Recent Activity</h2>
      <ul class="activity-list">
        ${activities.slice(0, 10).map(activity => `
          <li class="activity-item">
            <div class="activity-icon">
              <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-content">
              <p>${activity.text}</p>
              <small>${formatDate(activity.date)}</small>
            </div>
          </li>
        `).join('')}
      </ul>
    `;
  }

  function renderLanguages(languages) {
    if (!languages || !Object.keys(languages).length) {
      elements.languages.innerHTML = '<p class="no-data">No language data available</p>';
      return;
    }
    
    const totalBytes = Object.values(languages).reduce((sum, val) => sum + val, 0);
    const sortedLanguages = Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
    
    elements.languages.innerHTML = `
      <h2 class="section-title">Top Languages</h2>
      <div class="languages-chart">
        ${sortedLanguages.map(([lang, bytes]) => {
          const percent = ((bytes / totalBytes) * 100).toFixed(1);
          return `
            <div class="language-item">
              <div class="language-info">
                <span class="language-name">${lang}</span>
                <span class="language-percent">${percent}%</span>
              </div>
              <div class="language-bar-container">
                <div class="language-bar" style="width: ${percent}%; background-color: ${getLanguageColor(lang)}"></div>
              </div>
              <div class="language-size">${formatBytes(bytes)}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderCommits(commits) {
    if (!commits || !commits.length) {
      elements.commits.innerHTML = '<p class="no-data">No commit data available</p>';
      return;
    }
    
    elements.commits.innerHTML = `
      <h2 class="section-title">Recent Commits</h2>
      <div class="commits-container">
        ${commits.slice(0, 5).map(commit => `
          <div class="commit-card">
            <div class="commit-icon">
              <i class="fas fa-code-commit"></i>
            </div>
            <div class="commit-details">
              <p class="commit-message">${commit.message}</p>
              <div class="commit-meta">
                <span class="commit-repo">
                  <i class="fas fa-book"></i> ${commit.repository}
                </span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderContributions(contributions) {
    if (!contributions || !contributions.length) {
      elements.contributions.innerHTML = '<p class="no-data">No contribution data available</p>';
      return;
    }
    
    elements.contributions.innerHTML = `
      <h2 class="section-title">Monthly Contributions</h2>
      <div class="contributions-container">
        <div class="contributions-chart">
          ${contributions.slice(0, 12).map(contrib => `
            <div class="month-contrib" title="${contrib.month}: ${contrib.contributionCount} contributions">
              <div class="contrib-bar" 
                   style="height: ${Math.min(contrib.contributionCount, 10) * 8}px;
                          background: ${getContribColor(contrib.contributionCount)};">
              </div>
              <div class="month">${contrib.month.substring(0, 3)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Helper functions
  function formatRelativeTime(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return interval === 1 ? `${interval} ${unit} ago` : `${interval} ${unit}s ago`;
      }
    }
    
    return 'just now';
  }

  function getLanguageColor(language) {
    const colors = {
      JavaScript: '#f1e05a',
      TypeScript: '#3178c6',
      Python: '#3572A5',
      Java: '#b07219',
      HTML: '#e34c26',
      CSS: '#563d7c',
      PHP: '#4F5D95',
      Ruby: '#701516',
      C: '#555555',
      'C++': '#f34b7d',
      Go: '#00ADD8',
      Rust: '#dea584',
      Shell: '#89e051',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      Default: '#586069'
    };
    
    return colors[language] || colors.Default;
  }

  function formatNumber(num) {
  const safeNum = Number(num);
  if (isNaN(safeNum)) {
    console.warn('⚠️ [formatNumber] Valor inválido:', num);
    return '0';
  }
  return safeNum.toLocaleString(); // formato automático com vírgulas
}


  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  function formatBytes(bytes) {
    if (!bytes) return '0 bytes';
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  }

  function getContribColor(count) {
    if (!count) return '#ebedf0';
    if (count < 5) return '#9be9a8';
    if (count < 10) return '#40c463';
    return '#30a14e';
  }
});