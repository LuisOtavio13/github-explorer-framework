# 🤝 Contributing Guide

Thank you for your interest in contributing to the **GitHub Framework**!  
We welcome pull requests, suggestions, and improvements of all kinds.

---

## 🧭 Table of Contents

- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Code Style Guide](#code-style-guide)
- [Testing & Coverage](#testing--coverage)
- [Documentation Updates](#documentation-updates)
- [Security Policy](#security-policy)
- [Code of Conduct](#code-of-conduct)

---

## ✅ How to Contribute

1. **Fork** the repository.
2. Create a **new branch**:
   ```bash
   git checkout -b feature/my-feature
   ```
3. **Make your changes** and write tests if needed.
4. Run tests locally to verify.
5. **Commit** using clear, conventional messages:
   ```
   feat: add support for GitHub reactions
   fix: handle 404 errors on repo fetch
   ```
6. Push to your fork and **create a pull request**.

---

## 🧪 Development Workflow

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

Please ensure that your PR passes **all tests and lint checks**.

---

## 🎨 Code Style Guide

- Language: **TypeScript**
- Format: Prettier + ESLint
- Naming: camelCase for variables, PascalCase for classes
- Folder structure follows `src/`, `adapters/`, and `types/`
- Comments are encouraged for complex logic

Use:
```bash
npm run lint
npm run format
```

---

## 🧪 Testing & Coverage

We use **Jest** for testing.

- Place unit tests in `__tests__/`
- Test coverage goal: **80%+**
- Test new features and edge cases

Run:
```bash
npm run test
```

---

## 📘 Documentation Updates

If your contribution affects how the framework is used, update the relevant docs in:

- [`README.md`](../README.md)
- [`/docs/USAGE.md`](./USAGE.md)
- [`/docs/API.md`](./API.md)

Use clear, concise language and include code examples where useful.

---

## 🔐 Security Policy

If you discover a security vulnerability, **do not** open a public issue.  
Instead, contact us directly:  
✉️ `roberdoogarcia@gmail.com`

---

## 🌐 Code of Conduct

We follow the [Contributor Covenant](https://www.contributor-covenant.org/) Code of Conduct.

- Be respectful and inclusive
- Assume good intent
- No harassment or abuse of any kind

---

Thank you for making this project better!  
Every contribution, large or small, helps move it forward 🚀
