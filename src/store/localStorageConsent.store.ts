import { writable } from "svelte/store";

export const localStorageConsent = writable<boolean>(true);
