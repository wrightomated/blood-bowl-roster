import { writable } from "svelte/store";

export const rosterMode = writable<RosterMode>('league');

type RosterMode = 'league' | 'exhibition' | 'post';
