import { writable } from 'svelte/store';

export const showSpinner = writable<boolean>(false);
