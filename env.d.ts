/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PLATFORM: string;
  // add other env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
