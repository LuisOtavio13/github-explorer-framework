/**
 * GitHub Dashboard - Frontend Application
 * 
 * This script handles the dynamic rendering of GitHub user data
 * fetched from the backend API (/api/github-data).
 */

// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
  // Cache DOM elements for better performance
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const userProfileEl = document.getElementById('user');
  const reposEl = document.getElementById('repos');
  const activitiesEl = document.getElementById('activities');
  const languagesEl = document.getElementById('languages');
  const commitsEl = document.getElementById('commits');
  const contributionsEl = document.getElementById('contributions');

  /**
   * Fetches GitHub data from the backend API
   * Handles loading states and error scenarios
   */
  async function fetchData() {
    try {
      // Show loading indicator and hide error message
      loadingEl.style.display = 'block';
      errorEl.style.display = 'none';

      // Hide all content sections before loading new data
      userProfileEl.style.display = 'none';
      reposEl.style.display = 'none';
      activitiesEl.style.display = 'none';
      languagesEl.style.display = 'none';
      commitsEl.style.display = 'none';
      contributionsEl.style.display = 'none';

      // Fetch data from the backend API
      const res = await fetch('/api/github-data');
      if (!res.ok) throw new Error(`HTTP Error! status: ${res.status}`);

      // Parse and render the JSON response
      const data = await res.json();
      renderData(data);
    } catch (err) {
      // Display error message with icon
      errorEl.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <strong>Error loading data:</strong> ${err.message}
      `;
      errorEl.style.display = 'block';
    } finally {
      // Always hide loading indicator when done
      loadingEl.style.display = 'none';
    }
  }

  /**
   * Renders GitHub data to the DOM
   * @param {Object} data - The GitHub data object from the API
   */
  function renderData(data) {
    // 1. Render User Profile Section
    userProfileEl.innerHTML = `
      <img src="${data.user.avatarUrl}" alt="${data.user.name}" />
      <div class="profile-info">
        <h1>${data.user.name}</h1>
        <p>${data.user.bio}</p>
        <div class="stats">
          <div class="stat">
            <i class="fas fa-users"></i> ${formatNumber(data.user.followers)} followers
          </div>
          <div class="stat">
            <i class="fas fa-user-friends"></i> ${formatNumber(data.user.following)} following
          </div>
          <div class="stat">
            <i class="fas fa-book"></i> ${formatNumber(data.user.publicRepos)} repositories
          </div>
          ${data.user.location ? `
          <div class="stat">
            <i class="fas fa-map-marker-alt"></i> ${data.user.location}
          </div>` : ''}
        </div>
      </div>
    `;
    userProfileEl.style.display = 'block';

    // 2. Render Repositories Section
    reposEl.innerHTML = data.repos.map(repo => `
      <li class="repo">
        <h3><a href="${repo.url}" target="_blank">${repo.name}</a></h3>
        <p>${repo.description}</p>
        <div class="repo-meta">
          <span><i class="fas fa-code"></i> ${repo.language}</span>
          <span><i class="fas fa-star"></i> ${formatNumber(repo.stars)}</span>
          <span><i class="fas fa-code-branch"></i> ${formatNumber(repo.forks)}</span>
          <span><i class="fas fa-clock"></i> ${formatDate(repo.updatedAt)}</span>
        </div>
      </li>
    `).join('');
    reposEl.style.display = 'block';

    // 3. Render Activities Section (if available)
    if (data.activities && data.activities.length > 0) {
      activitiesEl.innerHTML = data.activities.map(activity => `
        <li class="activity">
          <i class="fas ${activity.icon}"></i> ${activity.text} <small>(${formatDate(activity.date)})</small>
        </li>
      `).join('');
      activitiesEl.style.display = 'block';
    } else {
      activitiesEl.style.display = 'none';
    }

    // 4. Render Languages Section
    const totalLanguageBytes = Object.values(data.languages).reduce((sum, val) => sum + val, 0);
    languagesEl.innerHTML = Object.entries(data.languages)
      .sort((a, b) => b[1] - a[1])
      .map(([lang, bytes]) => {
        const percent = ((bytes / totalLanguageBytes) * 100).toFixed(1);
        return `
          <li class="language">
            <span>${lang}</span>
            <div class="language-bar-container">
              <div class="language-bar" style="width: ${percent}%"></div>
            </div>
            <small>${percent}% (${formatBytes(bytes)})</small>
          </li>
        `;
      }).join('');
    languagesEl.style.display = 'block';

    // 5. Render Commits Section
    commitsEl.innerHTML = data.commits.map(commit => `
      <li class="commit">
        <i class="fas fa-code-commit"></i>
        <div>
          <p>${commit.message}</p>
          <small>Repository: ${commit.repo}</small>
        </div>
        <span class="commit-count">${commit.count}</span>
      </li>
    `).join('');
    commitsEl.style.display = 'block';

    // 6. Render Contributions Section (GitHub-style calendar)
    contributionsEl.innerHTML = `
      <div class="contributions-chart" style="display:flex; gap: 4px; align-items:flex-end;">
        ${data.contributions.map(contrib => `
          <div class="month-contrib" style="text-align:center;">
            <div class="contrib-bar" 
                 style="height: ${Math.min(contrib.count, 10) * 5}px;
                        width: 20px;
                        margin: 0 auto;
                        background: ${getContribColor(contrib.count)};
                        border-radius: 3px;">
            </div>
            <div class="month" style="font-size: 0.7em;">${contrib.month.substring(0, 3)}</div>
          </div>
        `).join('')}
      </div>
    `;
    contributionsEl.style.display = 'block';
  }

  // ======================
  // Helper Functions
  // ======================

  /**
   * Formats numbers with thousand separators
   * @param {Number} num - The number to format
   * @returns {String} Formatted number with separators
   */
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /**
   * Formats date strings to locale format
   * @param {String} dateString - ISO date string
   * @returns {String} Formatted date
   */
  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  /**
   * Converts bytes to human-readable format
   * @param {Number} bytes - File size in bytes
   * @returns {String} Formatted size with appropriate unit
   */
  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  }

  /**
   * Gets GitHub-style color based on contribution count
   * @param {Number} count - Number of contributions
   * @returns {String} Hex color code
   */
  function getContribColor(count) {
    if (count === 0) return '#ebedf0';  // Light gray
    if (count < 5) return '#9be9a8';    // Light green
    if (count < 10) return '#40c463';   // Medium green
    return '#30a14e';                   // Dark green
  }

  // Initial data fetch when page loads
  fetchData();
});