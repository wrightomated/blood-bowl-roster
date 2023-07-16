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
    setDoc,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';
import {
    getRosterPreview,
    type Roster,
    type RosterPreviews,
} from '../../models/roster.model';
import { get as getValueFromStore } from 'svelte/store';
import { rosterCache } from '../../store/rosterCache.store';
import type { MatchHistoryRecord } from '../../models/matchHistory.model';

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
    Object.keys(roster).forEach(
        (key) => roster[key] === undefined && delete roster[key]
    );

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

export async function addMatchHistory(matchRecord: MatchHistoryRecord) {
    Object.keys(matchRecord).forEach(
        (key) => matchRecord[key] === undefined && delete matchRecord[key]
    );

    const matchRef = getMatchRecordRef(matchRecord.id);
    return setDoc(matchRef, matchRecord);
}

export async function getMatchHistory(
    matchId: string
): Promise<DocumentSnapshot<MatchHistoryRecord>> {
    const matchRef = getMatchRecordRef(matchId);
    return getDoc(matchRef);
}

export async function deleteMatchHistory(matchId: string) {
    const matchRef = getMatchRecordRef(matchId);
    return deleteDoc(matchRef);
}

function getRosterIndexRef() {
    return doc(db, 'users', auth.currentUser.uid, 'userData', 'rosterIndex');
}

function getMatchRecordRef(matchId: string) {
    return doc(db, 'users', auth.currentUser.uid, 'gameRecords', matchId);
}

function getRosterRef(rosterId: string) {
    return doc(db, 'users', auth.currentUser.uid, 'rosters', rosterId);
}

function addIdToRoster(roster: Roster): Roster {
    return roster?.rosterId && roster.rosterId.length === 21
        ? roster
        : { ...roster, rosterId: nanoid() };
}
