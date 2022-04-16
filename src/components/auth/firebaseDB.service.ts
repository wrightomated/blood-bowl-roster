import {
    doc,
    Firestore,
    getFirestore,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import type { Roster } from '../../models/roster.model';

let db: Firestore;
let auth, app;

export async function initDb() {
    await import('./firebaseAuth.service').then((service) => {
        app = service.app;
        auth = service.auth;
    });
    db = getFirestore(app);
}

export async function uploadRoster(roster: Roster) {
    const rosterRef = doc(
        db,
        'users',
        auth.currentUser.uid,
        'rosters',
        roster.teamId.toString()
    );
    return setDoc(rosterRef, roster);
}
