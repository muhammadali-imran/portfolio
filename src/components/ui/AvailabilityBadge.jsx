import { profile } from '../../data/profile';

export default function AvailabilityBadge({ className = '' }) {
  if (!profile.available) return null;
  return (
    <p
      className={`inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 px-4 py-2 text-sm text-ink backdrop-blur-md ${className}`}
    >
      <span className="pulse-dot" aria-hidden="true" />
      {profile.availabilityLabel}
    </p>
  );
}
