import { writable } from 'svelte/store';
import { teamData } from '../data/teams.data';
import type { Writable } from 'svelte/store';
import type { Team } from '../models/team.model';

const currentTeamStore = () => {
    const { subscribe, update, set }: Writable<Team> = writable<Team>(
        getTeam(),
    );
    return {
        subscribe,
        update,
        set,
        setCurrentTeamWithCode: (code: string) => {
            update((store) => {
                return getTeamFromCode(code) || store;
            });
        },
        setCurrentTeamWithId: (id: number) => {
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

const getTeamFromId = (id: number) => {
    return teamData.teams.find((x) => x.id === id);
};

const getTeamFromStorage = () => {
    const team = localStorage.getItem('selectedTeam');
    return team ? JSON.parse(team) : '';
};

const getTeam = () => {
    return getTeamFromQuery() || getTeamFromStorage();
};

export const currentTeam = currentTeamStore();
