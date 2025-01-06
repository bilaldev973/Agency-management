import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n')
};

const apps = getApps();

const adminApp = apps.length === 0 
  ? initializeApp({
      credential: cert(serviceAccount)
    })
  : apps[0];

const adminDb = getFirestore(adminApp);

export { adminDb };