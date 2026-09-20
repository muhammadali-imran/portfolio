import { useRef } from 'react';
import { profile } from '../data/profile';
import SectionHeading from '../components/ui/SectionHeading';
import { useBatchReveal } from '../hooks/useBatchReveal';

const glance = [
  ['Studying', 'BS Software Engineering at NUST Islamabad, graduating May 2027'],
  ['Building', 'Full-stack web apps with the MERN stack and Django'],
  ['Exploring', 'RAG pipelines, AI agents and tool calling'],
  ['Looking for', 'Internships, junior roles, freelance work and collaboration'],
];

const focus = [
  {
    title: 'Full-stack web',
    text: 'React front ends on Node and Express or Django back ends, with MongoDB, MySQL or SQLite behind them. REST APIs, authentication and a tidy project structure.',
  },
  {
    title: 'AI-powered apps',
    text: 'LLM APIs, LangChain and FastAPI services, with scikit-learn and pandas for the data side. Right now I’m digging into RAG pipelines and AI agents.',
  },
  {
    title: 'Automation and security',
    text: 'Python and Bash scripts, GitHub Actions and Docker to remove repetitive work, plus a growing interest in cybersecurity and secure-by-default habits.',
  },
];

export default function About() {
  const root = useRef(null);
  useBatchReveal(root, '.reveal');

  return (
    <section id="about" ref={root} aria-label="About" className="relative px-6 py-28 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading className="lg:sticky lg:top-24">Student by degree, builder by habit</SectionHeading>
          </div>

          <div className="max-w-2xl">
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              {profile.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-10 divide-y divide-line border-y border-line">
              {glance.map(([term, detail]) => (
                <div key={term} className="reveal grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="font-medium text-neo-purple">{term}</dt>
                  <dd className="text-ink">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-3 md:gap-0">
          {focus.map(({ title, text }) => (
            <div key={title} className="reveal md:border-l md:border-line md:px-8 md:first:border-l-0 md:first:pl-0">
              <h3 className="font-display text-3xl font-bold uppercase tracking-tight">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
