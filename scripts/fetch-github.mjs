// Fetches public GitHub stats and writes them to src/data/github-stats.json.
// Run by the "Update GitHub stats" workflow once a day, or manually: GH_TOKEN=... npm run stats
import { readFile, writeFile } from 'node:fs/promises';

const LOGIN = process.env.GH_LOGIN || 'muhammadali-imran';
const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const OUT = new URL('../src/data/github-stats.json', import.meta.url);

if (!TOKEN) {
  console.error('Missing GH_TOKEN. Create a token (or use the default GITHUB_TOKEN in Actions) and try again.');
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: 'application/vnd.github+json',
  'User-Agent': 'portfolio-stats-script',
};

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      followers { totalCount }
      repositories(privacy: PUBLIC, ownerAffiliations: OWNER) { totalCount }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }
    }
  }`;

const LEVELS = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };

async function fetchUser() {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
  });
  if (!res.ok) throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`);
  const json = await res.json();
  if (json.errors) throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  return json.data.user;
}

// Share of public repos by primary language (repo count, not lines of code).
async function fetchLanguages() {
  const res = await fetch(`https://api.github.com/users/${LOGIN}/repos?per_page=100&type=owner`, { headers });
  if (!res.ok) throw new Error(`Repos request failed: ${res.status} ${res.statusText}`);
  const repos = await res.json();
  const counts = new Map();
  for (const repo of repos) {
    if (repo.language) counts.set(repo.language, (counts.get(repo.language) || 0) + 1);
  }
  const total = [...counts.values()].reduce((a, b) => a + b, 0) || 1;
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count, percent: Math.round((count / total) * 100) }));
}

const [user, languages] = await Promise.all([fetchUser(), fetchLanguages()]);
const calendar = user.contributionsCollection.contributionCalendar;

const data = {
  login: LOGIN,
  followers: user.followers.totalCount,
  publicRepos: user.repositories.totalCount,
  totalContributions: calendar.totalContributions,
  // Each day: d = date, c = count, l = level 0-4
  weeks: calendar.weeks.map((week) =>
    week.contributionDays.map((day) => ({
      d: day.date,
      c: day.contributionCount,
      l: LEVELS[day.contributionLevel] ?? 0,
    })),
  ),
  languages,
};

// Skip the write (and the commit that follows) when nothing but the timestamp would change.
let previous = {};
try {
  previous = JSON.parse(await readFile(OUT, 'utf8'));
} catch {
  /* first run */
}
const { updatedAt: _old, ...previousData } = previous;
if (JSON.stringify(previousData) === JSON.stringify(data)) {
  console.log('No changes in GitHub stats.');
} else {
  await writeFile(OUT, `${JSON.stringify({ updatedAt: new Date().toISOString(), ...data })}\n`);
  console.log(`Updated stats: ${data.totalContributions} contributions, ${data.publicRepos} repos.`);
}
