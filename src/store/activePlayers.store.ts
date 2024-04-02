import { derived } from 'svelte/store';
import { roster } from './teamRoster.store';

export const activePlayers = derived(roster, ($roster) => {
    return $roster.players.filter((x) => x.deleted !== true);
});
