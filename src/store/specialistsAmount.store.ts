import { derived } from 'svelte/store';

import { specialistIds } from './currentTeam.store';
import { roster } from './teamRoster.store';

export const specialistsAmount = derived(
    [specialistIds, roster],
    ([$specialistIds, $roster]) => {
        return $roster.players.filter((player) =>
            $specialistIds.includes(player.player.id)
        ).length;
    }
);
