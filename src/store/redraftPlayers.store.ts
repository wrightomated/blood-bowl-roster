import { writable } from 'svelte/store';
import type { RosterPlayerRecord } from '../models/roster.model';

function createRedraftPlayers() {
    const { subscribe, set, update } = writable<RosterPlayerRecord[]>([]);

    return {
        subscribe,
        set,
        update,
        reset: (players: RosterPlayerRecord[]) =>
            set(
                players
                    .filter(
                        (p) =>
                            !p.deleted &&
                            !p.starPlayer &&
                            !p?.alterations?.journeyman
                    )
                    .map((p) => structuredClone(p))
            ),
    };
}

export const availableRedraftPlayers = createRedraftPlayers();
