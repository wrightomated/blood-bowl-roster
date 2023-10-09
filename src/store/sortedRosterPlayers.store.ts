import { derived, writable } from 'svelte/store';
import { roster } from './teamRoster.store';
import type { ColumnDetails } from '../models/rosterTableColumns.model';

export const sortedColumn = writable<ColumnDetails>(undefined);
export const columnSortOrder = writable<'asc' | 'desc'>(undefined);

export const sortedRosterPlayers = derived(
    [roster, sortedColumn, columnSortOrder],
    ([$roster, $sortedColumn, $sortOrder]) => {
        console.log({ $sortedColumn, $sortOrder });

        const sortFunction = $sortedColumn?.sortFunction;
        const players = $roster?.players.filter((p) => !p.deleted);
        if (sortFunction) {
            const sorted =
                $sortOrder === 'desc'
                    ? players.sort(sortFunction).reverse()
                    : players.sort(sortFunction);
            console.log({ sorted });
            return sorted;
        }
        return players;
    }
);
