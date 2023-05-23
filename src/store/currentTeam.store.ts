import { derived, writable } from 'svelte/store';
import { teamData } from '../data/teams.data';
import type { Writable, Readable } from 'svelte/store';
import type { Team } from '../models/team.model';
import { dbCollegeToTeam, DungeonBowlTeam } from '../models/dungeonBowl.model';
import { dungeonBowlColleges } from '../data/dungeonBowlColleges.data';
import type { Player } from '../models/player.model';
import { playerById } from '../helpers/playerCatalogueHelpers';
import { filteredTeamData } from '../helpers/teamDataFilter';

const currentTeamStore = () => {
    const { subscribe, update, set }: Writable<Team | DungeonBowlTeam> =
        writable<Team | DungeonBowlTeam>(getTeam());
    return {
        subscribe,
        set,
        setCurrentTeamWithCode: (code: string) => {
            update((store) => {
                return getTeamFromCode(code) || store;
            });
        },
        setCurrentTeamWithId: (id: string) => {
            update((store) => {
                return getTeamFromId(id) || store;
            });
        },
    };
};

const getTeamFromQuery = () => {
    const code = window.location.search.substring(1).split('=')[1];
    return getTeamFromCode(code);
};

const getTeamFromCode = (code: string) => {
    if (code) {
        const id = parseInt(code.split('t')[1], 10);
        return getTeamFromId(id);
    }
    return null;
};

const getTeamFromId = (id: string) => {
    return filteredTeamData({}).find((x) => x.id === id);
};

const getTeamFromStorage = () => {
    const team = localStorage.getItem('selectedTeam');
    return team ? JSON.parse(team) : '';
};

const getTeam = () => {
    return getTeamFromQuery() || getTeamFromStorage();
};

export const currentTeam = currentTeamStore();
export const currentTeamIsDungeonBowl = derived(currentTeam, ($currentTeam) =>
    $currentTeam.id.includes('db')
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
