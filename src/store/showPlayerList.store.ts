import { writable } from "svelte/store";

export const showAvailablePlayers = writable<boolean>(true);
export const showAvailableStarPlayers = writable<boolean>(false);
