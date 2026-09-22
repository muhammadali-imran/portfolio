import { FolderIcon, HomeIcon, LayersIcon, MailIcon, UserIcon } from '../ui/Icons';

// One entry per page section. `id` must match the section's id attribute.
export const NAV = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'about', label: 'About', Icon: UserIcon },
  { id: 'stack', label: 'Stack', Icon: LayersIcon },
  { id: 'projects', label: 'Projects', Icon: FolderIcon },
  { id: 'contact', label: 'Contact', Icon: MailIcon },
];

export const SECTION_IDS = NAV.map((item) => item.id);
