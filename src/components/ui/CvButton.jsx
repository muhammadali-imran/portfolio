import { profile } from '../../data/profile';
import Button from './Button';
import { DownloadIcon } from './Icons';

// railLabel: hide the text below the xl breakpoint (used by the icon-only sidebar rail).
export default function CvButton({ variant = 'ghost', railLabel = false, className = '' }) {
  const { enabled, url, fileName } = profile.cv;
  const label = enabled ? 'Download CV' : 'CV coming soon';
  const text = <span className={railLabel ? 'hidden xl:inline' : ''}>{label}</span>;

  if (enabled) {
    return (
      <Button as="a" href={url} download={fileName} variant={variant} className={className} aria-label={label}>
        <DownloadIcon className="size-4" />
        {text}
      </Button>
    );
  }
  return (
    <Button variant={variant} disabled className={className} aria-label={label} title={label}>
      <DownloadIcon className="size-4" />
      {text}
    </Button>
  );
}
