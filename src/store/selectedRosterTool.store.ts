import { writable } from 'svelte/store';

export const selectedRosterTool = writable<
    'match.records' | 'common.notes' | 'match.setups'
>('match.records');
