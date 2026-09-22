import { useRef, useState } from 'react';
import { FaDiscord, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { profile } from '../data/profile';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import CvButton from '../components/ui/CvButton';
import { CheckIcon, MailIcon, SendIcon } from '../components/ui/Icons';
import { useBatchReveal } from '../hooks/useBatchReveal';

const ENDPOINT = 'https://api.web3forms.com/submit';

export default function Contact() {
  const root = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [message, setMessage] = useState('');
  const [discordCopied, setDiscordCopied] = useState(false);
  useBatchReveal(root, '.reveal');

  const copyDiscord = async () => {
    try {
      await navigator.clipboard.writeText(profile.discord);
      setDiscordCopied(true);
      setTimeout(() => setDiscordCopied(false), 1500);
    } catch {
      /* clipboard unavailable; the username is still shown on the page */
    }
  };

  const links = [
    profile.email && { id: 'email', label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon },
    profile.discord && {
      id: 'discord',
      label: 'Discord',
      value: discordCopied ? 'Copied!' : profile.discord,
      onClick: copyDiscord,
      Icon: FaDiscord,
    },
    { id: 'linkedin', label: 'LinkedIn', value: 'muhammadali-imran1972', href: profile.linkedin, Icon: FaLinkedinIn },
    { id: 'github', label: 'GitHub', value: profile.githubUser, href: profile.github, Icon: FaGithub },
  ].filter(Boolean);

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get('botcheck')) return; // honeypot: real people never tick this hidden box

    if (!profile.web3formsKey) {
      setStatus('error');
      setMessage('The contact form is not connected yet.');
      return;
    }

    setStatus('sending');
    setMessage('');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: profile.web3formsKey,
          subject: `Portfolio message from ${data.get('name')}`,
          from_name: 'Portfolio website',
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'The message could not be sent.');
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setMessage(err.message || 'The message could not be sent.');
    }
  }

  return (
    <section id="contact" ref={root} aria-label="Contact" className="relative px-6 py-28 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <SectionHeading className="max-w-3xl">Let’s build something useful</SectionHeading>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          I’m open to internships, junior roles, freelance work and collaboration. Send a message and I’ll reply as soon
          as I can.
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="reveal">
            <ul className="divide-y divide-line border-y border-line">
              {links.map(({ id, label, value, href, Icon, onClick }) => {
                const content = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-neo-purple transition-colors group-hover:bg-neo-purple/10">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-muted">{label}</span>
                      <span className="block truncate font-medium">{value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={id}>
                    {href ? (
                      <a
                        href={href}
                        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="group flex items-center gap-4 py-5 transition-colors hover:text-neo-purple"
                      >
                        {content}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={onClick}
                        className="group flex w-full items-center gap-4 py-5 text-left transition-colors hover:text-neo-purple"
                      >
                        {content}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>

            {import.meta.env.DEV && (!profile.email || !profile.discord) && (
              <p className="mt-4 rounded-xl border border-dashed border-line p-3 text-sm text-muted">
                Dev note: set VITE_CONTACT_EMAIL and VITE_DISCORD_USERNAME in .env to show those links.
              </p>
            )}

            <div className="mt-8">
              <CvButton variant="primary" />
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="reveal space-y-5 rounded-3xl border border-line bg-surface/70 p-6 backdrop-blur sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Your name
                </label>
                <input id="name" name="name" type="text" required maxLength={80} autoComplete="name" className="field" />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Your email
                </label>
                <input id="email" name="email" type="email" required maxLength={120} autoComplete="email" className="field" />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                Message
              </label>
              <textarea id="message" name="message" required rows={6} maxLength={2000} className="field resize-y" />
            </div>

            {/* Honeypot for bots. Hidden from people and screen readers. */}
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
                <SendIcon className="size-4" />
              </Button>

              <p role="status" aria-live="polite" className="text-sm">
                {status === 'success' && (
                  <span className="check-draw flex items-center gap-2 text-neo-green">
                    <CheckIcon className="size-5" />
                    Message sent. Thank you!
                  </span>
                )}
                {status === 'error' && (
                  <span className="text-neo-red">
                    {message}{' '}
                    {profile.email && (
                      <a href={`mailto:${profile.email}`} className="underline">
                        Email me instead
                      </a>
                    )}
                  </span>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
