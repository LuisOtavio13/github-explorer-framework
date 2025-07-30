# 📚 GitLab Integration: Developer Documentation

## ⚙️ Overview
This GitLab integration suite allows you to fetch and display detailed user and repository data using GitLab’s REST API. It’s organized into modular service classes that separate responsibilities for maintainability and clarity.

---

## 🧩 Components

### 1. `GitLabUserService`
**Purpose**: Retrieve GitLab user profile and contribution statistics.

**Key Methods**:
- `loadUserData()` — Fetches user data and contribution stats.
- `renderProfile()` — Formats user profile info for display.

**Returns**:
```json
{
  avatarUrl: "",
  name: "",
  bio: "",
  followers: 0,
  following: 0,
  publicRepos: 0,
  stats: {}
}
```

---

### 2. `GitLabRepoService`
**Purpose**: Manage and explore GitLab repositories.

**Key Methods**:
- `loadReposData(sort, per_page)` — Retrieves repositories.
- `loadRepoFiles(repoId, path, ref)` — Lists files in a repo.
- `loadFileContent(repoId, filePath, ref)` — Gets raw file content.
- `renderRepos(sort)` — Formats repos for display.

**Sort Options**: `stars`, `forks`, `updated`

**Returns**:
```json
{
  id, name, description, language,
  stars, forks, updatedAt, url
}
```

---

### 3. `GitLabActivityService`
**Purpose**: Track user activity (pushes, merges, creations).

**Key Methods**:
- `loadActivities(per_page)` — Gets recent activity.
- `renderActivities()` — Formats it for UI.

**Returns**:
```json
{
  text, icon, date
}
```

---

### 4. `GitLabCommitService`
**Purpose**: Access commit history and details.

**Key Methods**:
- `loadCommitsData(reposData, per_page)` — Commit count per repo.
- `loadRepoCommits(repoId, page, per_page)` — Paginated commits.
- `loadCommitDetails(repoId, sha)` — Extended info.

**Returns**:
```json
{
  sha, message, author, date, url,
  stats: { additions, deletions, total },
  files: []
}
```

---

### 5. `GitLabContributionService`
**Purpose**: Summarize push contributions by month.

**Key Methods**:
- `loadContributionsData(year)` — Count pushes monthly.

**Returns**:
```json
{
  Jan: 0, Feb: 0, ..., Dec: 0
}
```

---

### 6. `GitLabLanguageService`
**Purpose**: Analyze language usage by repo size.

**Key Methods**:
- `loadLanguagesData(reposData)` — Aggregates usage data.

**Returns**:
```json
{
  JavaScript: 123456,
  Python: 78901,
  ...
}
```

---

## 🛠 Required Utilities

From `../../utils/helpers.js`:
- `getAuthHeaders(token)` — Returns headers.
- `formatFileSize(bytes)` — Human-readable size.

---

## 🚀 Getting Started

```js
const config = {
  username: 'yourUsername',
  token: 'yourAccessToken',
  baseUrl: 'https://gitlab.com/api/v4'
};

const userService = new GitLabUserService(config);
await userService.loadUserData();
console.log(userService.renderProfile());
```
s