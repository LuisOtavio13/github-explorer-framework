
# GitHub Explorer

GitHub Explorer is a modern web dashboard and Node.js API helper for exploring GitHub user profiles, repositories, activities, languages, commits, and contributions. It provides a beautiful UI and a modular API for developers.

---

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [FAQ](#faq)
- [License](#license)

---

## Features
- View GitHub user profile, avatar, bio, followers, following, and repository count
- Explore repository details: description, language, stars, forks, license, homepage
- List and view commits, commit stats, and file diffs
- Browse repository files and folders, view file content with syntax highlighting
- Visualize language usage, commit stats, and monthly contributions with interactive charts
- Copy file contents to clipboard
- Responsive design with Bootstrap and custom styles
- Modular API helper for Node.js scripts and automation

---

## Architecture

**Frontend:**
- `index.html`: Main dashboard UI
- `style.css`: Custom styles for dark mode and responsive layout
- Uses Bootstrap, FontAwesome, Chart.js, Highlight.js

**Backend/API Helper:**
- `src/`: Main source code
  - `core/GitHubAPIHelper.js`: Main class, orchestrates all services
  - `services/`: Modular service classes for user, repo, activity, language, commit, and contribution data
  - `utils/`: Helper functions and formatters

**Examples & Tests:**
- `examples/`: Example usage scripts for Node.js
- `tests/`: Jest test files for all modules
- `docs/`: Documentation files

---

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/github-explorer.git
   cd github-explorer
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

---

## Configuration
Edit `config.json` with your GitHub username and (optionally) a personal access token:

```json
{
  "githubUsername": "octocat",
  "githubToken": "your_github_token"
}
```

Tokens are optional for public data but recommended for higher rate limits and private repositories.

---

## Usage

### Web Dashboard
1. Open `index.html` in your browser
2. Explore your profile, repositories, activities, languages, commits, and contributions visually

### Node.js Example
See `examples/basic-usage.js`:
```js
import GitHubAPIHelper from '../src/index.js';
const config = { githubUsername: 'octocat', githubToken: '' };
const github = new GitHubAPIHelper(config);
await github.loadAllData();
console.log(github.renderProfile());
console.log(github.renderRepos('stars'));
console.log(github.renderActivities());
```

### API Reference
See [`docs/API.md`](API.md) for full details on all classes and methods.

---

## Testing

Run all tests with Jest:
```sh
npx jest
```
Test files are located in the `tests/` folder and cover all main modules and services.

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

Please write clear commit messages and add tests for new features.

---

## FAQ

**Q: Do I need a GitHub token?**
A: No, but it is recommended for higher rate limits and private data.

**Q: Can I use this as a library in my own Node.js scripts?**
A: Yes! Import `GitHubAPIHelper` from `src/index.js` and use its methods.

**Q: How do I customize the dashboard UI?**
A: Edit `style.css` and `index.html` as needed. The code is modular and easy to extend.

**Q: What browsers are supported?**
A: All modern browsers (Chrome, Firefox, Edge, Safari).

---

## License

GPL
