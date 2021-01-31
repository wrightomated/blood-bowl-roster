import { writable } from "svelte/store";

export const rosterMode = writable<RosterMode>('league');

export type RosterMode = 'league' | 'exhibition' | 'postGame';
