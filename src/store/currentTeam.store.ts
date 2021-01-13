import { writable } from 'svelte/store';
import { teamData } from '../data/teams.data';
import type { Writable } from 'svelte/store';
import type { Team } from '../models/team.model';


// export const currentTeam = writable<Team>(getTeam());
const currentTeamStore = () => {
    const { subscribe, update, set }: Writable<Team> = writable<Team>(getTeam())
    return {
        subscribe,
        update,
        set,
        setCurrentTeamWithCode: (code: string) => {
            update((store) => {
                return getTeamFromCode(code) || {} as Team;
            })
        }
    }
}


const getTeamFromQuery = () => {
    const code = window.location.search.substring(1).split('=')[1];
    return getTeamFromCode(code);
};

const getTeamFromCode = (code: string) => {
    if (code) {
        return teamData.teams.find(
            (x) => x.id === parseInt(code.split('t')[1]),
        );
    }
    return null;
};

const getTeamFromStorage = () => {
    const team = localStorage.getItem('selectedTeam');
    return team ? JSON.parse(team) : '';
};

const getTeam = () => {
    return getTeamFromQuery() || getTeamFromStorage();
};

export const currentTeam = currentTeamStore();
