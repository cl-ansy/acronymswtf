import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import {
  getFirestore,
 } from "firebase-admin/firestore";


const activeApps = getApps();

const serviceAccount = {
  type: "service_account",
  project_id: import.meta.env.FIREBASE_PROJECT_ID,
  private_key_id: import.meta.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: import.meta.env.FIREBASE_PRIVATE_KEY,
  client_email: import.meta.env.FIREBASE_CLIENT_EMAIL,
  client_id: import.meta.env.FIREBASE_CLIENT_ID,
  auth_uri: import.meta.env.FIREBASE_AUTH_URI,
  token_uri: import.meta.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: import.meta.env.FIREBASE_AUTH_CERT_URL,
  client_x509_cert_url: import.meta.env.FIREBASE_CLIENT_CERT_URL,
};

interface Acronym {
  documentId: string;
  abbr: string;
  meaning: number;
  tags: Array<string>;
}

export const app = activeApps.length === 0 ? initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
}) : activeApps[0];
export const firestore = getFirestore(app);

export const getAcronymData = async (acronym: string) => {
  const acronymsRef = firestore.collection("acronyms");
  const acronymSnapshot = await acronymsRef.where("abbr", "==", acronym).get();
  return acronymSnapshot.docs.map((doc) => {
    return { documentId: doc.id, ...doc.data() };
  }) as Array<Acronym>;
}
