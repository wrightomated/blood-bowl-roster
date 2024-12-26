import { derived, writable } from 'svelte/store';
import type { Readable } from 'svelte/store';

import type { Player } from '../models/player.model';
import { filteredTeamData } from '../helpers/teamDataFilter';
import { customisationRules } from '../customisation/customisation.store';
import type { CustomTeam } from '../customisation/types/CustomiseTeamList.type';
import { updateOldTeamId } from '../helpers/rosterVersionCheck';
import { playerCatalogue } from './playerCatalogue.store';
import { secretTeams } from '../modules/secret-league/secretTeams.store';
import { dungeonBowlColleges } from '../data/dungeonBowlColleges.data';
import { dbCollegeToTeam } from '../models/dungeonBowl.model';
import { teamData } from '../data/teams.data';
import type { Team } from '../models/team.model';

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

export function getBaseTeamData(isDungeonBowl: boolean): Team[] {
    if (isDungeonBowl) {
        return dungeonBowlColleges.colleges.map((x) => dbCollegeToTeam(x));
    }
    return teamData.teams;
}

export const currentTeamId = writable(updateOldTeamId(getTeamId()));

export const currentTeam: Readable<CustomTeam> = derived(
    [currentTeamId, customisationRules, secretTeams],
    ([$id, $customisation, $secretTeams]) => {
        let teamFromStorage = getTeamFromStorage();

        if (teamFromStorage?.id !== '0' && teamFromStorage?.id === $id) {
            return teamFromStorage;
        }

        let isDungeonBowl = !!$id && $id?.toString()?.includes('db');
        let teams = [...getBaseTeamData(isDungeonBowl), ...$secretTeams];
        let customisationOptions = {
            teams,
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

export const playerTypes: Readable<Player[]> = derived(
    [currentTeam, playerCatalogue.findById],
    ([$currentTeam, $findById]) => {
        return $currentTeam?.players?.map((player) => {
            return $findById(player.id);
        });
    }
);

export const journeymenTypes: Readable<(Player & { journeyman: boolean })[]> =
    derived(
        [currentTeam, playerCatalogue.findById],
        ([$currentTeam, $findById]) => {
            const journeyMen = $currentTeam.players
                .filter((p) => p.max === 16 || p.max === 12)
                .map((player) => {
                    const journeymanPlayer = $findById(player.id);
                    return {
                        ...journeymanPlayer,
                        journeyman: true,
                    };
                });
            return journeyMen;
        }
    );
export const specialistIds = derived(currentTeam, ($currentTeam) =>
    $currentTeam.players
        .filter((p) => p.max !== 16 && p.max !== 12)
        .map((player) => player.id)
);

export const isSecretTeam = derived(currentTeam, ($currentTeam) =>
    $currentTeam?.id?.toString()?.includes('st')
);
