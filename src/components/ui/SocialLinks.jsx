import { FaGithub, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { profile, whatsappUrl } from '../../data/profile';
import { MailIcon } from './Icons';

export default function SocialLinks({ className = '', vertical = false }) {
  const links = [
    { label: 'GitHub', href: profile.github, Icon: FaGithub },
    { label: 'LinkedIn', href: profile.linkedin, Icon: FaLinkedinIn },
    profile.whatsapp && { label: 'WhatsApp', href: whatsappUrl(), Icon: FaWhatsapp },
    profile.email && { label: 'Email', href: `mailto:${profile.email}`, Icon: MailIcon },
  ].filter(Boolean);

  return (
    <ul className={`flex items-center gap-2 ${vertical ? 'flex-col' : ''} ${className}`}>
      {links.map(({ label, href, Icon }) => {
        const external = href.startsWith('http');
        return (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-neo-purple/10 hover:text-neo-purple"
            >
              <Icon className="size-[1.15rem]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
