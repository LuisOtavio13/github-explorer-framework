# Usage Guide

## Web Dashboard
- Open `index.html` in your browser
- Configure your GitHub username and token in `config.json`
- Explore profile, repositories, activities, languages, commits, and contributions visually

## Node.js Example
See `examples/basic-usage.js`:
```js
import GitHubAPIHelper from '../src/index.js';
const config = { githubUsername: 'TylorSwift2', githubToken: '' };
const github = new GitHubAPIHelper(config);
await github.loadAllData();
console.log(github.renderProfile());
console.log(github.renderRepos('stars'));
console.log(github.renderActivities());
```

## Testing
- Run `npm install` to install Jest
- Run `npx jest` to execute all tests in the `tests/` folder

## Customization
- Edit `style.css` for custom styles
- Extend service classes in `src/services/` for new features

## Troubleshooting
- Ensure your GitHub token is valid for private data or higher rate limits
- Check browser console or Node.js logs for error messages

GPL
