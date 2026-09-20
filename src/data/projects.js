// Add or edit projects here. `wide: true` makes a card span both columns on large screens.
// status: 'Team project' | 'In progress' | 'Learning project' | 'Live'
export const projects = [
  {
    title: 'Digital Logics Studio',
    status: 'Team project',
    wide: true,
    description:
      'A web app for designing and simulating digital circuits, with AI to help simplify the logic. A front-end app handles the design experience while a separate backend provides the APIs and simulation engine.',
    highlights: [
      'Split into a front-end app and a dedicated backend service',
      'Built with the QuantumLogicsLabs team',
    ],
    tags: ['JavaScript', 'APIs', 'AI', 'Circuit simulation'],
    links: [
      { label: 'Front end', href: 'https://github.com/QuantumLogicsLabs/DigitalLogicsStudio' },
      { label: 'Backend', href: 'https://github.com/QuantumLogicsLabs/DigitalLogicsStudio-Backend' },
    ],
  },
  {
    title: 'CircuitMind',
    status: 'Team project',
    description:
      'An AI assistant that turns a logic description into a circuit and explains every connection, so you learn why the circuit works and not only what it looks like.',
    tags: ['Python', 'AI'],
    links: [{ label: 'Source', href: 'https://github.com/QuantumLogicsLabs/CircuitMind' }],
  },
  {
    title: 'ChitChats',
    status: 'In progress',
    description:
      'A full-stack chat app with a Django REST backend and a React (Vite) front end. JWT authentication, user profiles and password recovery are in place; the messaging API and chat UI are next.',
    tags: ['Django', 'React', 'Vite', 'JWT', 'SQLite'],
    links: [{ label: 'Source', href: 'https://github.com/muhammadali-imran/ChitChats' }],
  },
  {
    title: 'Smart Task Manager',
    status: 'Learning project',
    wide: true,
    description:
      'My first Django app: a to-do list built to learn CRUD operations, templates and form handling.',
    tags: ['Django', 'Python', 'HTML', 'CSS'],
    links: [{ label: 'Source', href: 'https://github.com/muhammadali-imran/Smart-Task-Manager' }],
  },
];
