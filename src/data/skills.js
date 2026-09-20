// Grouped tags instead of percentage bars. tone: purple | blue | green | red
export const skillGroups = [
  { label: 'Front end', tone: 'purple', items: ['React', 'JavaScript', 'HTML', 'CSS', 'Vite'] },
  { label: 'Back end', tone: 'blue', items: ['Node.js', 'Express', 'Django', 'FastAPI', 'Flask'] },
  { label: 'Languages', tone: 'green', items: ['Python', 'JavaScript', 'C++'] },
  { label: 'Databases', tone: 'red', items: ['MongoDB', 'MySQL', 'SQLite'] },
  {
    label: 'AI and machine learning',
    tone: 'purple',
    items: ['LangChain', 'LLM APIs', 'scikit-learn', 'pandas'],
  },
  {
    label: 'DevOps and tools',
    tone: 'blue',
    items: ['Git', 'GitHub', 'GitHub Actions', 'Docker', 'Bash scripting'],
  },
];

export const marqueeItems = [...new Set(skillGroups.flatMap((group) => group.items))];
