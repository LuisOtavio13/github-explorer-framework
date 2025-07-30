# 🛡️ Legal & API Compliance

This document outlines the legal considerations and API compliance requirements related to the use of the GitHub Framework.

---

## 📑 License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.  
You are free to use, modify, and distribute the framework under the terms of this license.

- Full license text: [LICENSE](../LICENSE)
- SPDX Identifier: `GPL-3.0-only`

---

## 🔐 API Token Handling

- Always store personal access tokens (PATs) in secure environments (e.g., `.env` files, vaults).
- Do **not** commit secrets to your version control system.
- The framework does **not** log or store tokens persistently.
- Using tokens improves rate limits and access to private data.

---

## 🤝 API Terms of Use

By using this framework, you agree to comply with the terms and usage policies of the respective APIs you integrate:

### GitHub
- API Terms: [https://docs.github.com/en/site-policy/github-terms/github-terms-of-service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service)
- Rate limits: 5,000 req/hour with token; 60 req/hour without

### GitLab
- API Terms: [https://about.gitlab.com/terms/](https://about.gitlab.com/terms/)
- Rate limits may vary by instance (GitLab.com or self-hosted)

You are responsible for staying within usage boundaries and respecting rate limits.

---

## 📡 Data Collection and Privacy

- The framework does **not** transmit data to third-party servers.
- All API data is retrieved client-side or server-side based on your environment.
- The developer assumes responsibility for handling user data ethically and legally.

If you build dashboards or store data persistently, ensure you comply with:

- Local data protection laws (e.g., LGPD, GDPR)
- GitHub/GitLab data usage restrictions
- User consent if applicable

---

## 🧪 External Dependencies

This project may use open-source libraries under permissive licenses (MIT, Apache 2.0).  
Ensure that usage and distribution comply with those licenses. All dependencies are listed in `package.json`.

---

## ❗ Disclaimer

This framework is provided **as-is** without warranty.  
You are solely responsible for ensuring that your use of it is compliant with all relevant laws and API provider rules.

For legal concerns, contact the project maintainer or consult a legal advisor.
