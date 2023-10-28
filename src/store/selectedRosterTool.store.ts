import { writable } from 'svelte/store';

export const selectedRosterTool = writable<
    'Match Records' | 'Notes' | 'Setups'
>('Match Records');
