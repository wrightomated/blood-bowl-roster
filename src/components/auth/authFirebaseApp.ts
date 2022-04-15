import { initializeApp } from '@firebase/app';

const firebaseConfig = {
    apiKey: '__bbroster.env.FIREBASE_API_KEY',
    authDomain: '__bbroster.env.FIREBASE_AUTH_DOMAIN',
    projectId: '__bbroster.env.FIREBASE_PROJECT_ID',
    storageBucket: '__bbroster.env.FIREBASE_STORAGE_BUCKET',
    messagingSenderId: '__bbroster.env.FIREBASE_MESSAGING_SENDER_ID',
    appId: '__bbroster.env.FIREBASE_APP_ID',
};

export const app = initializeApp(firebaseConfig);
