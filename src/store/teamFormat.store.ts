import { writable } from 'svelte/store';

export const teamFormat = writable<TeamFormat>('elevens');

export type TeamFormat = 'sevens' | 'elevens' | 'dungeon bowl';
