import { writable } from 'svelte/store';

export const scrollYHistory = writable<number>(0);
