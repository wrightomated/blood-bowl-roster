import { derived } from 'svelte/store';
import { roster } from '../store/teamRoster.store';

export const spentSpp = derived(roster, ($roster) => {
    const spentSpp = $roster.players.reduce((acc, player) => {
        if (player.deleted) return acc;
        return acc + (player?.alterations?.spp || 0);
    }, 0);
    return -1 * spentSpp;
});
