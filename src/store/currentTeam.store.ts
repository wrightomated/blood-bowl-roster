import { derived, writable } from 'svelte/store';
import type { Readable } from 'svelte/store';

import type { Player } from '../models/player.model';
import { playerById } from '../helpers/playerCatalogueHelpers';
import { filteredTeamData } from '../helpers/teamDataFilter';
import { customisationRules } from '../customisation/customisation.store';
import type { CustomTeam } from '../customisation/types/CustomiseTeamList.type';
import type { TeamFormat } from '../types/teamFormat';
import { updateOldTeamId } from '../helpers/rosterVersionCheck';

const getTeamIdFromQuery = () => {
    const code = window.location.search.substring(1).split('=')[1];
    return getTeamFromCode(code);
};

const getTeamFromCode = (code: string) => {
    if (code) {
        const id = code.split('t')[1];
        return id;
    }
    return null;
};

const getTeamFromStorage: () => CustomTeam = () => {
    const team = localStorage.getItem('selectedTeam');
    return team ? JSON.parse(team) : '';
};

function getTeamId() {
    return getTeamIdFromQuery() || getTeamFromStorage()?.id;
}

export const currentTeamId = writable(updateOldTeamId(getTeamId()));

export const currentTeam: Readable<CustomTeam> = derived(
    [currentTeamId, customisationRules],
    ([$id, $customisation]) => {
        let customisationOptions = {
            format:
                !!$id && $id?.toString()?.includes('db')
                    ? ('dungeon bowl' as TeamFormat)
                    : undefined,
            tournamentCustomisation: undefined,
        };
        if ($customisation) {
            customisationOptions.tournamentCustomisation = $customisation;
        }
        const team = filteredTeamData(customisationOptions).find(
            (x) => x.id === $id
        );
        return team;
    }
);
export const currentTeamIsDungeonBowl = derived(currentTeam, ($currentTeam) =>
    $currentTeam?.id?.toString()?.includes('db')
);
export const playerTypes = derived(currentTeam, ($currentTeam) =>
    $currentTeam.players.map((player) => playerById(player.id))
);
export const journeymenTypes: Readable<(Player & { journeyman: boolean })[]> =
    derived(currentTeam, ($currentTeam) => {
        const journeyMen = $currentTeam.players
            .filter((p) => p.max === 16 || p.max === 12)
            .map((player) => {
                const journeymanPlayer = playerById(player.id);
                return {
                    ...journeymanPlayer,
                    journeyman: true,
                };
            });
        return journeyMen;
    });
export const specialistIds = derived(currentTeam, ($currentTeam) =>
    $currentTeam.players
        .filter((p) => p.max !== 16 && p.max !== 12)
        .map((player) => player.id)
);
