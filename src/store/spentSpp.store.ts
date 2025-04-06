import { derived } from 'svelte/store';
import { roster } from '../store/teamRoster.store';

export const spentSpp = derived(roster, ($roster) => {
    let spentSpp = $roster.players.reduce((acc, player) => {
        if (player.deleted) return acc;
        return acc + (player?.alterations?.spp || 0);
    }, 0);
    const hasGiant = $roster.inducements?.['i52'] >= 1;
    spentSpp -= hasGiant ? 24 : 0;
    return -1 * spentSpp;
});
