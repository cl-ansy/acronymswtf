/// <reference types="astro/client" />
type Runtime = import("@astrojs/cloudflare").DirectoryRuntime<Env>;

declare namespace App {
	interface Locals extends Runtime {}
}

interface ImportMetaEnv {
	readonly FIREBASE_PUBLIC_API_KEY: string;
	readonly FIREBASE_AUTH_DOMAIN: string;
	readonly FIREBASE_PROJECT_ID: string;
	readonly FIREBASE_STORAGE_BUCKET: string;
	readonly FIREBASE_MESSAGING_SENDER_ID: string;
	readonly FIREBASE_APP_ID: string;
	readonly FIREBASE_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
