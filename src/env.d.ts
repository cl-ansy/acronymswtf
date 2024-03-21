/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
type Runtime = import("@astrojs/cloudflare").DirectoryRuntime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}

interface ImportMetaEnv {
  readonly SUPABASE_URL: string;
  readonly SUPABASE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
