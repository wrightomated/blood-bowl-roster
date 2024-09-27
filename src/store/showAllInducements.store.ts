import { writable } from 'svelte/store';

export const showAllInducements = writable<boolean>(false);

export const showInducementBlock = writable({
    common: true,
    infamousCoach: false,
    wizzard: false,
    biasedReferee: false,
    other: false,
});
