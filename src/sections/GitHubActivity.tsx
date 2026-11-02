import stats from '../data/github-stats.json';
import { profile } from '../data/profile';

type ContributionDay = { d: string; c: number; l: number };
type GitHubStats = {
  updatedAt: string | null;
  login?: string;
  followers?: number;
  publicRepos?: number;
  totalContributions?: number;
  weeks?: ContributionDay[][];
  languages?: { name: string; count: number; percent: number }[];
};

const githubStats = stats as GitHubStats;

// Opacity of each contribution level (0 = none).
const LEVEL = [0, 28, 50, 75, 100];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

// Renders data written by scripts/fetch-github.mjs. Hides itself until that file has real data.
export default function GitHubActivity() {
  if (!githubStats.updatedAt || !Array.isArray(githubStats.weeks) || githubStats.weeks.length === 0) return null;

  const langs = (githubStats.languages || []).slice(0, 5);
  const langColors = ['var(--purple)', 'var(--blue)', 'var(--mint)', 'var(--red)', 'var(--muted)'];

  return (
    <div className="reveal mt-20 rounded-3xl border border-line bg-surface/60 p-6 backdrop-blur sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="font-display text-4xl font-bold uppercase tracking-tight">GitHub activity</h3>
          <p className="mt-1 text-muted">
            {githubStats.totalContributions?.toLocaleString('en-US') ?? 0} contributions in the last year
          </p>
        </div>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-neo-blue hover:underline"
        >
          @{githubStats.login || profile.githubUser}
        </a>
      </div>

      <div className="mt-6 overflow-x-auto pb-2" role="img" aria-label={`Contribution calendar: ${githubStats.totalContributions ?? 0} contributions in the last year`}>
        <div className="flex w-max gap-[3px]" aria-hidden="true">
          {githubStats.weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day) => (
                <span
                  key={day.d}
                  title={`${day.c} contribution${day.c === 1 ? '' : 's'} on ${formatDate(day.d)}`}
                  className="size-[11px] rounded-[3px] border border-line/60"
                  style={{
                    background:
                      day.l === 0
                        ? 'var(--surface2)'
                        : `color-mix(in srgb, var(--purple) ${LEVEL[day.l]}%, transparent)`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
        <dl className="flex gap-8">
          <div>
            <dt className="text-sm text-muted">Public repos</dt>
            <dd className="font-display text-3xl font-bold">{githubStats.publicRepos ?? 0}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Followers</dt>
            <dd className="font-display text-3xl font-bold">{githubStats.followers ?? 0}</dd>
          </div>
        </dl>

        {langs.length > 0 && (
          <div>
            <div className="flex h-2 overflow-hidden rounded-full bg-surface2" aria-hidden="true">
              {langs.map((lang, i) => (
                <span key={lang.name} style={{ width: `${lang.percent}%`, background: langColors[i] }} />
              ))}
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
              {langs.map((lang, i) => (
                <li key={lang.name} className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-2 rounded-full" style={{ background: langColors[i] }} />
                  {lang.name} {lang.percent}%
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="mt-5 text-xs text-muted">Updated daily. Last refresh {formatDate(githubStats.updatedAt)}.</p>
    </div>
  );
}
