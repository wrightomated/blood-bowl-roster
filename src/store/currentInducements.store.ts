import { derived } from 'svelte/store';
import { roster } from './teamRoster.store';

export const inducementsInRoster = derived(roster, ($roster) =>
    Object.entries($roster.inducements)
);
export const inducementAndStarsInRoster = derived(roster, ($roster) => {
    const inducements = Object.entries($roster.inducements).map(
        ([key, number]) => ({ name: 'inducements.' + key, amount: number })
    );
    const starPlayers = $roster.players
        .filter((p) => p.starPlayer)
        .map((p) => ({ name: 'stars.' + p.player.id + '.name', amount: 1 }));
    return starPlayers.concat(inducements).filter((i) => i.amount > 0);
});
