# ⚙️ Advanced Usage Guide

This guide provides practical examples and advanced techniques for using the `GitHubAPIHelper` class effectively in real-world applications.

---

## 📥 Initialization

```ts
import GitHubAPIHelper from '@luisotavio13/github-framework';

const apiHelper = new GitHubAPIHelper({
  username: 'your-username',
  token: 'your-token' // optional
});

await apiHelper.loadAllData();
```

The `loadAllData()` method fetches:

- `userData` — profile and statistics
- `reposData` — all public (and private, if token is provided) repositories
- `languagesData` — aggregated language usage

---

## 📌 Filtering Repositories

You can filter and sort repositories by language, stars, forks, etc.

```ts
const jsRepos = apiHelper.reposData.filter(
  repo => repo.language === 'JavaScript'
);

const topStarred = [...apiHelper.reposData].sort(
  (a, b) => b.stars - a.stars
).slice(0, 5);
```

---

## 📈 Language Statistics

```ts
const topLanguages = Object.entries(apiHelper.languagesData)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 3)
  .map(([lang, count]) => `${lang}: ${count}`);
```

This is useful for UI dashboards, charts, and custom reports.

---

## 📊 Rendering UI Components

The framework includes built-in methods for rendering components as HTML or strings:

```ts
const profileHTML = apiHelper.renderProfile();
const reposHTML = apiHelper.renderRepos('stars'); // 'forks', 'name', etc.
const chartsHTML = apiHelper.renderCharts();
```

These methods return raw HTML. You can inject them directly into your app or static site:

```js
document.getElementById('profile').innerHTML = profileHTML;
```

---

## 📅 Contribution History

```ts
const contributions = apiHelper.contributionsData;

Object.entries(contributions).forEach(([month, count]) => {
  console.log(`${month}: ${count} commits`);
});
```

The object returned is keyed by `YYYY-MM` with number of commits.

---

## 🧩 Using With Frameworks

### React Example:

```tsx
import { useEffect, useState } from 'react';
import GitHubAPIHelper from '@luisotavio13/github-framework';

export function ProfileWidget() {
  const [html, setHtml] = useState('');

  useEffect(() => {
    const api = new GitHubAPIHelper({ username: 'devuser' });
    api.loadAllData().then(() => {
      setHtml(api.renderProfile());
    });
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

---

## ⚠️ Error Handling

Wrap async usage in `try/catch` to handle:

```ts
try {
  await apiHelper.loadAllData();
} catch (err) {
  console.error('Failed to load data:', err);
}
```

---

## 🧪 Extending Integrations

You can extend the framework to support more platforms (e.g., Bitbucket):

- Create a new adapter in `src/adapters/bitbucketAdapter.ts`
- Implement the same methods used in `githubAdapter` and `gitlabAdapter`
- Register the adapter via factory pattern

---

## 💬 Have Questions?

Open an issue or [contact support](mailto:luisotavio@example.com).  
Check `/docs/TROUBLESHOOTING.md` if something isn’t working as expected.

---
