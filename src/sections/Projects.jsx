import { useRef } from 'react';
import { FaGithub } from 'react-icons/fa';
import { projects } from '../data/projects';
import { profile } from '../data/profile';
import SectionHeading from '../components/ui/SectionHeading';
import Tag from '../components/ui/Tag';
import Button from '../components/ui/Button';
import GitHubActivity from './GitHubActivity';
import { ArrowUpRightIcon } from '../components/ui/Icons';
import { useBatchReveal } from '../hooks/useBatchReveal';
import { useTilt } from '../hooks/useTilt';

const statusTone = {
  'Team project': 'purple',
  'In progress': 'blue',
  'Learning project': 'muted',
  Live: 'green',
};

function ProjectCard({ project }) {
  const ref = useRef(null);
  useTilt(ref, 5);

  return (
    <article
      ref={ref}
      className={`reveal group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface/70 p-7 backdrop-blur transition-[border-color,box-shadow] duration-300 hover:border-neo-purple/60 hover-shadow-glow sm:p-9 ${
        project.wide ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Glare that follows the cursor (see useTilt) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--purple) 16%, transparent), transparent 60%)',
        }}
      />

      <div className="relative flex flex-1 flex-col">
        <Tag tone={statusTone[project.status] || 'muted'} className="self-start">
          {project.status}
        </Tag>

        <h3 className="mt-5 font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-5xl">
          {project.title}
        </h3>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">{project.description}</p>

        {project.highlights && (
          <ul className="mt-5 space-y-2 text-ink">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-neo-mint" />
                {item}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-8">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-neo-blue hover:underline"
            >
              <FaGithub aria-hidden="true" />
              {link.label}
              <span className="sr-only"> for {project.title} (opens in a new tab)</span>
              <ArrowUpRightIcon className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const root = useRef(null);
  useBatchReveal(root, '.reveal');

  return (
    <section id="projects" ref={root} aria-label="Projects" className="relative px-6 py-28 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading>Things I’ve built</SectionHeading>
          <Button as="a" href={`${profile.github}?tab=repositories`} target="_blank" rel="noopener noreferrer" variant="ghost">
            All repositories
            <ArrowUpRightIcon className="size-4" />
          </Button>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <GitHubActivity />
      </div>
    </section>
  );
}
