<div align="center">

# Muhammad Ali · Portfolio

**A neon, animated, light-and-dark developer portfolio built with React, Tailwind CSS v4 and GSAP.**

Responsive · Sidebar navigation on desktop, top bar on mobile · Command palette · Web3Forms contact form · Daily GitHub activity

</div>

<!-- Add a screenshot at docs/preview.png and uncomment the line below -->
<!-- ![Portfolio preview](docs/preview.png) -->

---

## Highlights

- **Two themes, one click.** Light and dark share the same purple, blue, green and red palette. The theme follows the OS on the first visit, is remembered afterwards, and switches with a circular reveal (View Transitions API, with a graceful fallback).
- **Responsive navigation.** A full sidebar on wide screens (≥1280px), an icon rail on laptops (1024–1279px) and a sticky top bar with a full-screen menu on tablets and phones.
- **Five sections plus footer.** Hero, About, Stack and Journey (tools, education and experience), Projects, Contact.
- **GSAP animation.** Intro curtain (first visit only), masked headline reveals, a typing terminal card, scramble-text role switching, a scroll-drawn timeline, project-card tilt and glare, magnetic buttons, a scroll progress bar and a cursor-following spotlight.
- **Accessible motion.** Everything honours `prefers-reduced-motion`; tilt, magnetic and spotlight effects switch off on touch devices.
- **Command palette.** Press <kbd>Ctrl</kbd> + <kbd>K</kbd> (or <kbd>⌘</kbd> + <kbd>K</kbd>) to jump to a section, switch theme, open WhatsApp, copy your email or download your CV.
- **Contact form without a backend.** [Web3Forms](https://web3forms.com) with a honeypot field and a mailto fallback, plus WhatsApp and direct links.
- **GitHub activity that refreshes itself.** A scheduled GitHub Action writes a small JSON file once a day; the site just reads it.
- **SEO ready.** Meta tags, Open Graph and Twitter cards, JSON-LD `Person` data, a favicon and a social preview image.

## Tech stack

| Area | Choice |

| --- | --- |
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`, CSS-first theme tokens) |
| Animation | GSAP 3 + `@gsap/react` (ScrollTrigger, SplitText, TextPlugin, ScrambleTextPlugin) |
| Fonts | Barlow Condensed (display), Outfit (body), JetBrains Mono (code), self-hosted via Fontsource |
| Icons | Inline SVG icons and `react-icons` for brand logos |
| Forms | Web3Forms |
| Hosting | Vercel (or any static host) |

> **Tailwind note:** `@tailwindcss/vite` is the v4 plugin, so `tailwindcss` must also be v4. There is no `tailwind.config.js`, `postcss.config.js` or `autoprefixer` any more. Design tokens live in `src/styles/index.css`.

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

## Environment variables

Copy `.env.example` to `.env`. Only variables starting with `VITE_` reach the browser. Restart the dev server after editing.

| Variable | Purpose |

| --- | --- |
| `VITE_SITE_URL` | Your deployed URL, used for canonical, Open Graph and JSON-LD tags |
| `VITE_WEB3FORMS_KEY` | Access key from [web3forms.com](https://web3forms.com) (free). These keys are meant to be public |
| `VITE_CONTACT_EMAIL` | Shown in the contact section and used as the mailto fallback. Empty hides it |
| `VITE_WHATSAPP_NUMBER` | International format, digits only (for example `923001234567`). Empty hides the WhatsApp button |
| `VITE_CV_AVAILABLE` | Set to `true` once your CV is in `public/` |

On Vercel, add the same variables under **Project → Settings → Environment Variables**.

## Editing your content

All text lives in `src/data/`, so you rarely touch components.

| File | What to edit |
| --- | --- |
| `profile.js` | Name, roles, intro, bio, availability badge, social links |
| `projects.js` | Project cards (`wide: true` makes a card span two columns) |
| `skills.js` | Grouped tech tags and the scrolling marquee |
| `experience.js` | Education, internships, certifications and future jobs |

To add a project, copy an object in `projects.js`, change the fields and save. Add a `{ label: 'Live demo', href: '…' }` entry to `links` when a project has a deployed version.

## GitHub activity

The Projects section can show your contribution heatmap, repo count, followers and top languages. It stays hidden until real data exists.

1. Push the project to GitHub. The workflow in `.github/workflows/github-stats.yml` runs every day at 03:17 UTC and can also be started from the **Actions** tab.
2. It runs `scripts/fetch-github.mjs`, writes `src/data/github-stats.json` and commits it only when the numbers changed. That commit triggers a normal Vercel deployment.
3. By default it uses the built-in `GITHUB_TOKEN`, so only **public** activity is counted. To include private contributions, add a repository secret named `GH_STATS_TOKEN` (a personal access token with `read:user`).

```bash
GH_TOKEN=your_token npm run stats
```

## Deploying to Vercel

1. Push the repo to GitHub and import it in Vercel. The Vite preset is detected automatically (build command `npm run build`, output `dist`).
2. Add the environment variables listed above.
3. Deploy, then set `VITE_SITE_URL` to the final address and redeploy so the social preview and canonical URL are correct.

## Project structure

.
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

## Accessibility checklist

- Skip-to-content link, landmarks and labelled navigation with `aria-current` on the active section
- Visible focus ring on every interactive element
- Mobile menu and command palette trap focus, close on Esc and restore focus
- Animated text (terminal, role switcher) has a static screen-reader equivalent
- Reduced-motion and touch-device fallbacks for all decorative effects

## Before you launch

- [ ] Fill in `.env` (site URL, Web3Forms key, email, WhatsApp) and set the same values on Vercel
- [ ] Add your CV PDF and set `VITE_CV_AVAILABLE=true`
- [ ] Check the projects: statuses, descriptions and links, especially the team projects
- [ ] Confirm the certification and internship wording in `src/data/experience.js`
- [ ] Add screenshots or live links to project cards when you have them
- [ ] Run `npm run build` and `npm run preview`, then test on a phone
- [ ] Replace `public/og-image.png` if you want a custom social preview

## License

Personal portfolio. All content © Muhammad Ali. You are welcome to learn from the code structure.
