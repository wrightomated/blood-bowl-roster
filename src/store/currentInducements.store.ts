import { derived } from 'svelte/store';
import { inducementData } from '../data/inducements.data';
import { roster } from './teamRoster.store';

export const inducementsInRoster = derived(roster, ($roster) =>
    Object.entries($roster.inducements)
);
export const inducementAndStarsInRoster = derived(roster, ($roster) => {
    const inducements = Object.entries($roster.inducements).map(
        ([key, number]) => [
            inducementData.inducements.find((i) => i.id === key).displayName,
            number,
        ]
    );
    const starPlayers = $roster.players
        .filter((p) => p.starPlayer)
        .map((p) => [p.playerName, 1]);
    return starPlayers.concat(inducements).filter((i) => i[1] > 0);
});
export const inducementsSummary = derived(
    inducementsInRoster,
    ($inducements) => {
        return $inducements.map(([key, number]) => {
            return (
                (number > 1 ? `${number} x ` : ``) +
                inducementData.inducements.find((i) => i.id === key).displayName
            );
        });
    }
);
