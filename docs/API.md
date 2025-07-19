# GitHubAPIHelper API Documentation

## Overview
`GitHubAPIHelper` is a modular JavaScript class for fetching and rendering GitHub user data, repositories, activities, languages, commits, and contributions. It uses service classes for each data type and can be used in Node.js or browser environments.

## Constructor
```js
const github = new GitHubAPIHelper({ githubUsername, githubToken });
```
- `githubUsername` (string, required): GitHub username
- `githubToken` (string, optional): Personal access token for higher rate limits

## Methods
- `loadAllData()`: Loads all user, repo, activity, language, commit, and contribution data
- `userData`: Returns user profile data
- `reposData`: Returns array of repositories
- `activitiesData`: Returns array of recent activities
- `languagesData`: Returns language usage object
- `commitsData`: Returns commit stats object
- `contributionsData`: Returns monthly contributions object
- `renderProfile()`: Returns formatted profile string
- `renderRepos(sort)`: Returns formatted repositories string (sort by 'updated', 'stars', 'forks')
- `renderActivities()`: Returns formatted activities string
- `renderCharts()`: Returns chart data for languages, commits, contributions
- `loadRepoCommits(repoName, page, per_page)`: Loads commits for a repository
- `loadRepoFiles(repoName, path)`: Loads files/folders for a repository
- `loadFileContent(repoName, filePath)`: Loads file content
- `loadCommitDetails(repoName, sha)`: Loads commit details

## Example
```js
import GitHubAPIHelper from './src/index.js';
const github = new GitHubAPIHelper({ githubUsername: 'octocat' });
await github.loadAllData();
console.log(github.renderProfile());
```

## Services
- `UserService`: Handles user profile data
- `RepoService`: Handles repositories and files
- `ActivityService`: Handles recent activities
- `LanguageService`: Handles language usage
- `CommitService`: Handles commits and commit details
- `ContributionService`: Handles monthly contributions

## Error Handling
All methods throw errors if data cannot be loaded. Use try/catch for robust scripts.

## License
GPL
