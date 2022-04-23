import { FirebaseApp, initializeApp } from 'firebase/app';
import {
    getAuth,
    User,
    sendEmailVerification,
    Auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { currentUserStore } from '../../store/currentUser.store';
import { rosterCache } from '../../store/rosterCache.store';

const firebaseConfig = {
    apiKey: '__bbroster.env.FIREBASE_API_KEY',
    authDomain: '__bbroster.env.FIREBASE_AUTH_DOMAIN',
    projectId: '__bbroster.env.FIREBASE_PROJECT_ID',
    storageBucket: '__bbroster.env.FIREBASE_STORAGE_BUCKET',
    messagingSenderId: '__bbroster.env.FIREBASE_MESSAGING_SENDER_ID',
    appId: '__bbroster.env.FIREBASE_APP_ID',
    measurementId: '__bbroster.env.FIREBASE_MEASUREMENT_ID',
};

export let app: FirebaseApp;
export let auth: Auth;

// Initialize Firebase
export function init() {
    app = initializeApp(firebaseConfig, {
        name: 'BBRosterAuth',
        automaticDataCollectionEnabled: false,
    });
    auth = getAuth(app);
    if (
        firebaseConfig?.measurementId &&
        // Rollup replace will replace the env variable with the string 'undefined' if not in the env file
        firebaseConfig.measurementId !== 'undefined'
    ) {
        import('../../analytics/firebaseAnalytics').then((service) =>
            service.init(app)
        );
    }

    onAuthStateChanged(auth, (currentUser: User) => {
        rosterCache.clearCache();
        currentUserStore.set(currentUser);
        import('./firebaseDB.service').then((service) => service.initDb());
    });
}

export async function createUser(
    email: string,
    password: string,
    displayName: string
) {
    return createUserWithEmailAndPassword(auth, email, password).then((user) =>
        updateProfile(user.user, { displayName })
    );
}

export async function logout() {
    return signOut(auth);
}

export async function signInWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
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

export async function resetPassword(email: string) {
    return import('./resetPassword').then((service) =>
        service.resetPassword(auth, email)
    );
}
