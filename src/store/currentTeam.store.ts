import { writable } from "svelte/store";
import type { Team } from "../models/team.model";

const getTeamFromStorage = () => {
    const team = localStorage.getItem("selectedTeam")
    return team ? JSON.parse(team) : ''
}

export const currentTeam = writable<Team>(
    getTeamFromStorage()
);
