import type { CustomTeam } from '../customisation/types/CustomiseTeamList.type';
import type { Roster } from '../models/roster.model';
import { extrasTotalCost } from './extrasForTeam';

export function teamValue(
    roster: Roster,
    currentTeam: CustomTeam,
    dedicatedFansCostIncluded = false
) {
    const playerCosts = roster.players
        .filter((x) => !x.deleted && !x.starPlayer)
        .map(
            (x) =>
                x.player.cost +
                (roster.mode === 'exhibition'
                    ? 0
                    : x?.alterations?.valueChange ?? 0)
        );
    const playersTotal = playerCosts.reduce((a, b) => a + b, 0);
    const extraTotal = extrasTotalCost(
        roster,
        currentTeam,
        dedicatedFansCostIncluded
    );
    return playersTotal + extraTotal;
}

export function currentTeamValue(roster: Roster, currentTeam: CustomTeam) {
    const playerCost = roster.players
        // Exclude players with mng or tr as they are not in the current team
        // Exclude star players as they are included in inducements
        .filter(
            (p) => !p?.alterations?.tr && !p?.alterations?.mng && !p.starPlayer
        )
        .map(
            (x) =>
                // Exclude gnoblars and snotlings from the cost calculation (low cost linemen)
                // Underworld snotlings have a different id and are not excluded.
                ((x.player.id === 56 || x.player.id === 73) &&
                roster.mode !== 'exhibition' &&
                roster.format !== 'dungeon bowl'
                    ? 0
                    : x.player.cost) +
                (roster.mode === 'exhibition'
                    ? 0
                    : x?.alterations?.valueChange || 0)
        )
        .reduce((a, b) => a + b, 0);
    const extraTotal = extrasTotalCost(roster, currentTeam, false);
    return playerCost + extraTotal;
}
