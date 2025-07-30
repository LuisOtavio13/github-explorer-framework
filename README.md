<!-- GitHub Framework - Unified Interface for Repository APIs -->

<h1 align="center" style="font-family:'Segoe UI',sans-serif;font-size:2.8em;color:#00fff7;animation: glow 1.5s ease-in-out infinite alternate;">
  🌌 GitHub Framework 🌌<br>
  <small style="font-size:0.5em;color:#aaaaaa;">One Interface. All Repositories. Infinite Possibilities.</small>
</h1>

<p align="center">
  <a href="https://www.gnu.org/licenses/gpl-3.0" target="_blank">
    <img src="https://img.shields.io/badge/License-GPLv3-blue.svg" alt="License">
  </a>
  <a href="./docs/document.html" target="_blank">
    <img src="https://img.shields.io/badge/Documentation-Online-blue" alt="Docs">
  </a>
</p>

<p align="center" style="color:#a0f0ff;font-size:1.1em;">
  A futuristic framework that connects GitHub, GitLab, and more — all in one place.<br>
  Seamlessly transform raw API calls into elegant, UI-ready visual data with TypeScript and full analytics.
</p>

---

📘 <strong>Full Documentation:</strong>  
🔗 [Read the full guide here](https://luisotavio13.github.io/github-framework-documentation/)

---

## 📚 INDEX

1️⃣ [Installation](#1-installation)  
2️⃣ [Features](#2-features)  
3️⃣ [Basic Usage](#3-basic-usage)  
4️⃣ [Detailed Docs](#4-detailed-docs)  
5️⃣ [Advanced Examples](#5-advanced-examples)  
6️⃣ [Troubleshooting](#6-troubleshooting)  
7️⃣ [Contributing](#7-contributing)  
8️⃣ [Changelog](#8-changelog)  
9️⃣ [License](#9-license)

---

## 1️⃣ INSTALLATION

```bash
npm install @luisotavio13/github-framework@1.0.0
```

---

## 2️⃣ FEATURES

✨ Unified APIs for GitHub, GitLab & more  
✨ Full user and repository data  
✨ Dynamic sorting for repositories  
✨ Language usage graphs  
✨ Contribution history & commit stats  
✨ Ready-to-render UI components  
✨ Strong TypeScript typing  

---

## 3️⃣ BASIC USAGE

```javascript
import GitHubAPIHelper from '@luisotavio13/github-framework';

const config = {
  username: 'your-username',
  token: 'your-token' // optional
};

const apiHelper = new GitHubAPIHelper(config);

await apiHelper.loadAllData();

console.log(apiHelper.userData);
console.log(apiHelper.reposData);
console.log(apiHelper.languagesData);

const profile = apiHelper.renderProfile();
const repos = apiHelper.renderRepos('stars');
const charts = apiHelper.renderCharts();
```

---

## 4️⃣ DETAILED DOCS

Documentation lives in the [`/docs`](./docs) folder:

- 📘 [API Reference](./docs/API.md)  
- 📘 [GitLab Integration](./docs/gitlab.md)  
- 📘 [TypeScript Models](./docs/ts-github-models.md)  
- 📘 [Advanced Usage Guide](./docs/USAGE.md)  
- 📘 [Troubleshooting](./docs/TROUBLESHOOTING.md)  
- 📘 [Contributing](./docs/CONTRIBUTING.md)  
- 📘 [Changelog](./docs/CHANGELOG.md)  
- 📘 [Legal & Compliance](./docs/LEGAL.md)  

---

## 5️⃣ ADVANCED EXAMPLES

📈 **Contribution Monitoring:**

```javascript
const monthlyContributions = apiHelper.contributionsData;
```

🧪 **Top Used Languages:**

```javascript
const topLanguages = Object.entries(apiHelper.languagesData)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 3);
```

---

## 6️⃣ TROUBLESHOOTING

See [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) for help with:

- 🔐 Authentication errors  
- 🚫 API rate limit exceeded  
- 🔒 Private repositories  
- 🌐 Proxy configuration  

---

## 7️⃣ CONTRIBUTING

We welcome contributions! Please read [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for:

- Git workflow  
- Code standards  
- Test automation  
- Documentation guidelines  

---

## 8️⃣ CHANGELOG

Track version history in:  
📜 [CHANGELOG.md](./docs/CHANGELOG.md)

---

## 9️⃣ LICENSE

Licensed under the **GNU GPL v3.0**.  
Read the [LICENSE](./LICENSE) file.  
For API legal info, see: [LEGAL.md](./docs/LEGAL.md)

---

## 📬 SUPPORT

For issues, suggestions or bug reports:  
📮 Open an issue or contact: ✉️ roberdoogarcia@gmail.com

---

<style>
@keyframes glow {
  from {
    text-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 15px #0ff;
  }
  to {
    text-shadow: 0 0 20px #0ff, 0 0 30px #0ff, 0 0 40px #0ff;
  }
}
</style>
