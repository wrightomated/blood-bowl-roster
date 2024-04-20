import type { StarPlayer } from '../models/player.model';
import type { TeamSpecialRule } from '../models/team.model';
import { chaosSpecialRules } from '../data/teams.data';

export const filterStarPlayers = (
    sp: { starPlayers: StarPlayer[] },
    /** Special rules of the team */
    specialRules: TeamSpecialRule[],
    /** Player ids not to include */
    extraFilter: number[] = []
) => {
    const spWithExpandedSpecialRules = sp.starPlayers.map((star) =>
        star.playsFor.includes('Favoured of...')
            ? { ...star, playsFor: [...star.playsFor, ...chaosSpecialRules] }
            : star
    );
    const filteredBySpecialRules = spWithExpandedSpecialRules
        .filter(
            (x) =>
                x.playsFor.length === 0 ||
                x.playsFor.some((a) => specialRules.includes(a))
        )
        .filter(
            (p) =>
                !p?.doesNotPlayFor ||
                p.doesNotPlayFor.every((a) => !specialRules.includes(a))
        )
        .filter((p) => {
            if (p.id === 402 || p.id === 403) {
                const other = extraFilter.find((a) => a === 402 || a === 403);
                if (other) {
                    return false;
                }
            }
            return true;
        });
    return filteredBySpecialRules
        .filter((p) => !extraFilter.includes(p.id))
        .sort((a, b) => a.position.localeCompare(b.position));
};
// // CHAOS CUP RULE
// if (x.id === 402 || x.id === 403) {
//     const other = a.find((p) => p.id === 403 || p.id === 404);
//     if (other.id !== undefined) {
//         console.log('other', other.id);
//         return { ...x, displayName: 'ignoreThis' };
//     }
// }
