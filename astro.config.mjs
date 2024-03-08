import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "server",
  vite: {
    "process.env.FIREBASE_PROJECT_ID": JSON.stringify(
      process.env.FIREBASE_PROJECT_ID,
    ),
    "process.env.FIREBASE_PRIVATE_KEY_ID": JSON.stringify(
      process.env.FIREBASE_PRIVATE_KEY_ID,
    ),
    "process.env.FIREBASE_PRIVATE_KEY": JSON.stringify(
      process.env.FIREBASE_PRIVATE_KEY,
    ),
    "process.env.FIREBASE_CLIENT_EMAIL": JSON.stringify(
      process.env.FIREBASE_CLIENT_EMAIL,
    ),
    "process.env.FIREBASE_CLIENT_ID": JSON.stringify(
      process.env.FIREBASE_CLIENT_ID,
    ),
    "process.env.FIREBASE_AUTH_URI": JSON.stringify(
      process.env.FIREBASE_AUTH_URI,
    ),
    "process.env.FIREBASE_TOKEN_URI": JSON.stringify(
      process.env.FIREBASE_TOKEN_URI,
    ),
    "process.env.FIREBASE_AUTH_CERT_URL": JSON.stringify(
      process.env.FIREBASE_AUTH_CERT_URL,
    ),
    "process.env.FIREBASE_CLIENT_CERT_URL": JSON.stringify(
      process.env.FIREBASE_CLIENT_CERT_URL,
    ),
    "process.env.FIREBASE_PUBLIC_API_KEY": JSON.stringify(
      process.env.FIREBASE_PUBLIC_API_KEY,
    ),
    "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(
      process.env.FIREBASE_AUTH_DOMAIN,
    ),
    "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(
      process.env.FIREBASE_STORAGE_BUCKET,
    ),
    "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
      process.env.FIREBASE_MESSAGING_SENDER_ID,
    ),
    "process.env.FIREBASE_APP_ID": JSON.stringify(process.env.FIREBASE_APP_ID),
    "process.env.FIREBASE_MEASUREMENT_ID": JSON.stringify(
      process.env.FIREBASE_MEASUREMENT_ID,
    ),
  },
  adapter: cloudflare(),
  integrations: [tailwind()],
});
