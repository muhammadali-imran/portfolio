/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_WEB3FORMS_KEY?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_DISCORD_USERNAME?: string;
  readonly VITE_CV_AVAILABLE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
