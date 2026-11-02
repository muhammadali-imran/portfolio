import { useState } from 'react';
import { FaDiscord, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { profile } from '../../data/profile';
import { MailIcon } from './Icons';

type SocialLinksProps = { className?: string; vertical?: boolean };
type SocialLink = {
  id: string;
  label: string;
  href?: string;
  Icon: typeof MailIcon | typeof FaDiscord | typeof FaGithub | typeof FaLinkedinIn;
  onClick?: () => void | Promise<void>;
};

export default function SocialLinks({ className = '', vertical = false }: SocialLinksProps) {
  const [copied, setCopied] = useState(false);

  const copyDiscord = async () => {
    try {
      await navigator.clipboard.writeText(profile.discord);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable; nothing else to fall back to here */
    }
  };

  const links: (SocialLink | false)[] = [
    { id: 'github', label: 'GitHub', href: profile.github, Icon: FaGithub },
    { id: 'linkedin', label: 'LinkedIn', href: profile.linkedin, Icon: FaLinkedinIn },
    profile.discord && { id: 'discord', label: copied ? 'Copied!' : 'Discord', Icon: FaDiscord, onClick: copyDiscord },
    profile.email && { id: 'email', label: 'Email', href: `mailto:${profile.email}`, Icon: MailIcon },
  ];

  return (
    <ul className={`flex items-center gap-2 ${vertical ? 'flex-col' : ''} ${className}`}>
      {links.filter((link): link is SocialLink => link !== false).map(({ id, label, href, Icon, onClick }) => {
        const external = href?.startsWith('http');
        const shared =
          'grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-neo-purple/10 hover:text-neo-purple';
        return (
          <li key={id}>
            {href ? (
              <a
                href={href}
                aria-label={label}
                title={label}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={shared}
              >
                <Icon className="size-[1.15rem]" />
              </a>
            ) : (
              <button type="button" onClick={onClick} aria-label={label} title={label} className={shared}>
                <Icon className="size-[1.15rem]" />
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
