<div align="center">

# Muhammad Ali · Portfolio

</div>

<!-- Add a screenshot at docs/preview.png and uncomment the line below -->
<!-- ![Portfolio preview](docs/preview.png) -->

---

## Tech stack

| Area | Choice |

| --- | --- |
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`, CSS-first theme tokens) |
| Animation | GSAP 3 + `@gsap/react` (ScrollTrigger, SplitText, TextPlugin, ScrambleTextPlugin) |
| Fonts | Barlow Condensed (display), Outfit (body), JetBrains Mono (code), self-hosted via Fontsource |
| Icons | Inline SVG icons and `react-icons` for brand logos |
| Forms | Web3Forms |
| Hosting | Vercel |

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env        # then fill in the values (see below)

# 3. Start the dev server
npm run dev
```

| Script | What it does |

| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run stats` | Fetch GitHub stats now (needs `GH_TOKEN`) |

## GitHub activity

The Projects section can show your contribution heatmap, repo count, followers and top languages. It stays hidden until real data exists.

1. Push the project to GitHub. The workflow in `.github/workflows/github-stats.yml` runs every day at 03:17 UTC and can also be started from the **Actions** tab.
2. It runs `scripts/fetch-github.mjs`, writes `src/data/github-stats.json` and commits it only when the numbers changed. That commit triggers a normal Vercel deployment.
3. By default it uses the built-in `GITHUB_TOKEN`, so only **public** activity is counted. To include private contributions, add a repository secret named `GH_STATS_TOKEN` (a personal access token with `read:user`).

```bash
GH_TOKEN=your_token npm run stats
```

## Project structure

├── .github/workflows/github-stats.yml   # daily stats refresh
├── public/                              # favicon, og-image.png, robots.txt, your CV PDF
├── scripts/fetch-github.mjs             # GitHub stats fetcher
├── src/
│   ├── App.jsx                          # page shell, intro, command palette shortcut
│   ├── main.jsx                         # entry, fonts
│   ├── styles/index.css                 # Tailwind import, theme tokens, keyframes
│   ├── lib/                             # gsap registration, motion helpers
│   ├── data/                            # profile, projects, skills, experience, github-stats.json
│   ├── hooks/                           # useTheme, useScrollSpy, useMagnetic, useTilt, useBatchReveal
│   ├── components/
│   │   ├── layout/                      # Sidebar, TopBar, MobileMenu, Footer, Background, Loader, CommandPalette
│   │   └── ui/                          # Button, Tag, SectionHeading, TerminalCard, icons, social links
│   └── sections/                        # Hero, About, Stack, Projects, GitHubActivity, Contact
├── index.html                           # SEO tags and the no-flash theme script
└── vite.config.js

## License

Personal portfolio. All content © Muhammad Ali. You are welcome to learn from the code structure.
