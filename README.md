<div align="center">

# Muhammad Ali — Portfolio

[Live Demo](https://portfolio-4xn93jp7k-imranmuhammadali633-5556s-projects.vercel.app/) · [Report Issue](https://github.com/muhammadali-imran/portfolio/issues)

<br />

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)]([https://reactjs.org/](https://reactjs.org/))
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://greensock.com/gsap/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## 🚀 Tech Stack

| Area | Choice |
| :--- | :--- |
| **Framework** | React 18 + Vite 5 |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`, CSS-first theme tokens) |
| **Animation** | GSAP 3 + `@gsap/react` (ScrollTrigger, SplitText, TextPlugin, ScrambleTextPlugin) |
| **Fonts** | Barlow Condensed (display), Outfit (body), JetBrains Mono (code) via Fontsource |
| **Icons** | Inline SVG icons & `react-icons` for brand logos |
| **Forms** | Web3Forms |
| **Hosting** | Vercel |

---

## 🛠️ Getting Started

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env

# 3. Start dev server
npm run dev

```

### Available Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Starts local dev server with hot reload |
| `npm run build` | Builds production bundle into `dist/` |
| `npm run preview` | Previews production build locally |
| `npm run lint` | Runs ESLint check |
| `npm run stats` | Fetches GitHub stats manually (requires `GH_TOKEN`) |

---

## 📊 GitHub Activity Automation

The Projects section dynamically updates your contribution heatmap, repository metrics, followers, and top language stats.

1. **Automation:** The GitHub Action `.github/workflows/github-stats.yml` runs automatically every day at 03:17 UTC or can be manually triggered in the **Actions** tab.
2. **Data Sync:** It executes `scripts/fetch-github.mjs`, writes updated data to `src/data/github-stats.json`, and commits updates back to trigger a Vercel deployment.
3. **Private Contributions:** To count private activity alongside public data, set a repository secret named `GH_STATS_TOKEN` using a Personal Access Token with `read:user` permissions.

```bash
GH_TOKEN=your_token npm run stats

```

---

## 📁 Project Structure

```text
.
├── .github/workflows/github-stats.yml   # Daily stats refresh workflow
├── public/                              # Favicon, OG image, robots.txt, CV PDF
├── scripts/fetch-github.mjs             # GitHub stats fetcher
├── src/
│   ├── App.jsx                          # Page shell, intro, command palette shortcut
│   ├── main.jsx                         # React entrypoint & font setup
│   ├── styles/index.css                 # Tailwind import, theme tokens, keyframes
│   ├── lib/                             # GSAP registration & motion helpers
│   ├── data/                            # Profile, projects, skills, experience, github-stats.json
│   ├── hooks/                           # Custom React hooks (theme, scroll spy, magnetic, tilt)
│   ├── components/
│   │   ├── layout/                      # Sidebar, TopBar, MobileMenu, Footer, CommandPalette
│   │   └── ui/                          # Reusable UI primitives (Button, Tag, TerminalCard)
│   └── sections/                        # Page sections (Hero, About, Stack, Projects, Contact)
├── index.html                           # SEO tags & inline dark theme script
└── vite.config.js                       # Vite configuration

```

Personal portfolio codebase. All design and content © **Muhammad Ali**. Feel free to explore or adapt the architectural patterns.
