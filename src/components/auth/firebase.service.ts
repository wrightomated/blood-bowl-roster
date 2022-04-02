// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    User,
    sendEmailVerification,
} from 'firebase/auth';

// Your web app's Firebase configuration
// let __bbroster: any;
const firebaseConfig = {
    apiKey: '__bbroster.env.FIREBASE_API_KEY',
    authDomain: '__bbroster.env.FIREBASE_AUTH_DOMAIN',
    projectId: '__bbroster.env.FIREBASE_PROJECT_ID',
    storageBucket: '__bbroster.env.FIREBASE_STORAGE_BUCKET',
    messagingSenderId: '__bbroster.env.FIREBASE_MESSAGING_SENDER_ID',
    appId: '__bbroster.env.FIREBASE_APP_ID',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function createUser(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function getCurrentUser(): User {
    return auth.currentUser;
}

export async function sendVerificationEmail() {
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
        return sendEmailVerification(user);
    } else {
        console.log('No current user');
        return;
    }
}
