// Your personal details. Edit this file to change text across the site.
// Secrets and contact details come from .env (see .env.example).
const env = import.meta.env;
const digits = (value = '') => String(value).replace(/\D/g, '');

export const profile = {
  name: 'Muhammad Ali',
  monogram: 'MA',
  role: 'Full Stack Developer',

  // Cycled in the hero (scramble-text effect)
  roles: [
    'full stack developer',
    'AI automation builder',
    'cybersecurity enthusiast',
    'software engineering student',
  ],

  intro:
    'I build full-stack web apps and AI-powered tools that take repetitive work off people’s plate.',

  bio: [
    'I’m a software engineering student at NUST Islamabad, graduating in May 2027. I build full-stack apps with the MERN stack and Django, and I’m happiest when AI or automation can do the boring part of a job so people can focus on the interesting part.',
    'Lately that means wiring LLM APIs into real products with FastAPI and LangChain, scripting workflows with Python and Bash, and paying attention to security while I build. I’m looking for internships and junior roles where I can ship real features and keep learning from a team.',
  ],

  available: true,
  availabilityLabel: 'Active to work',

  github: 'https://github.com/muhammadali-imran',
  githubUser: 'muhammadali-imran',
  linkedin: 'https://www.linkedin.com/in/muhammadali-imran1972/',

  // Filled from .env. Empty values hide the matching buttons.
  email: (env.VITE_CONTACT_EMAIL || '').trim(),
  whatsapp: digits(env.VITE_WHATSAPP_NUMBER),
  whatsappMessage: 'Hi Muhammad, I found your portfolio and would like to get in touch.',
  web3formsKey: (env.VITE_WEB3FORMS_KEY || '').trim(),

  // Put your PDF in /public with this file name, then set VITE_CV_AVAILABLE=true
  cv: {
    enabled: env.VITE_CV_AVAILABLE === 'true',
    url: '/Muhammad-Ali-CV.pdf',
    fileName: 'Muhammad-Ali-CV.pdf',
  },
};

export const whatsappUrl = () =>
  `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(profile.whatsappMessage)}`;
