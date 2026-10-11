interface ImportMetaEnv {
  readonly DEV: boolean;
  readonly VITE_BACKEND_PORT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
