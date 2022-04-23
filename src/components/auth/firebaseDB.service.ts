import {
    doc,
    Firestore,
    getFirestore,
    writeBatch,
    getDoc,
    deleteDoc,
    updateDoc,
    deleteField,
    DocumentSnapshot,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';
import {
    getRosterPreview,
    Roster,
    RosterPreviews,
} from '../../models/roster.model';
import { get as getValueFromStore } from 'svelte/store';
import { rosterCache } from '../../store/rosterCache.store';

let db: Firestore;
let auth, app;

export async function initDb() {
    if (db) return;
    await import('./firebaseAuth.service').then((service) => {
        app = service.app;
        auth = service.auth;
    });
    db = getFirestore(app);
}

export async function getRoster(rosterId: string) {
    const rosterRef = getRosterRef(rosterId);
    return getDoc(rosterRef);
}

export async function gerRosterPreviews(): Promise<
    DocumentSnapshot<RosterPreviews>
> {
    const rosterIndexRef = getRosterIndexRef();
    return getDoc(rosterIndexRef);
}

export async function uploadRoster(inputRoster: Roster) {
    const roster: Roster = addIdToRoster(inputRoster);

    const rosterIndexRef = getRosterIndexRef();
    const rosterRef = getRosterRef(roster.rosterId.toString());
    const rosterPreview = getRosterPreview(roster);

    const batch = writeBatch(db);

    if (
        getValueFromStore(rosterCache)?.rosterPreviews?.cachedItem?.[
            roster.rosterId
        ] !== rosterPreview
    ) {
        batch.set(
            rosterIndexRef,
            {
                [roster.rosterId]: rosterPreview,
            },
            { merge: true }
        );
        rosterCache.invalidateRosterPreviews();
    }

    batch.set(rosterRef, roster);
    rosterCache.invalidateRoster(roster.rosterId);

    return batch.commit();
}

export async function uploadRosters(inputRosters: Roster[]) {
    if (inputRosters.length === 0) {
        return;
    }
    const rosters: Roster[] = inputRosters.map((inputRoster) =>
        addIdToRoster(inputRoster)
    );
    const rosterIndexRef = getRosterIndexRef();
    const rosterIndex = {};
    const batch = writeBatch(db);
    rosters.forEach((roster) => {
        rosterIndex[roster.rosterId] = getRosterPreview(roster);
        batch.set(getRosterRef(roster.rosterId), roster);
    });

    batch.set(
        rosterIndexRef,
        {
            ...rosterIndex,
        },
        { merge: true }
    );

    return batch.commit();
}

export async function deleteRoster(rosterId: string) {
    const rosterIndexRef = getRosterIndexRef();
    const rosterRef = getRosterRef(rosterId);

    try {
        await updateDoc(rosterIndexRef, {
            [rosterId]: deleteField(),
        });
        await deleteDoc(rosterRef);
        rosterCache.invalidateRosterPreviews();
    } catch (error) {
        console.error(error);
    }
}

function getRosterIndexRef() {
    return doc(db, 'users', auth.currentUser.uid, 'userData', 'rosterIndex');
}

function getRosterRef(rosterId: string) {
    return doc(db, 'users', auth.currentUser.uid, 'rosters', rosterId);
}

function addIdToRoster(roster: Roster): Roster {
    return roster?.rosterId && roster.rosterId.length === 21
        ? roster
        : { ...roster, rosterId: nanoid() };
}
