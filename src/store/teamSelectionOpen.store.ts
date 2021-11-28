import { writable } from 'svelte/store';

export const teamSelectionOpen = writable<boolean>(false);
export const showNewTeamDialogue = writable<boolean>(false);
