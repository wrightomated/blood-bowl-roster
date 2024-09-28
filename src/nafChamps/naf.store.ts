import { writable } from 'svelte/store';

export const nafStoreOption = writable('Option A');

export const optionMap = {
    1: {
        'Option A': {
            primary: 6,
            secondary: 0,
            starPlayers: 0,
        },
        'Option B': {
            primary: 3,
            secondary: 0,
            starPlayers: 1,
        },
    },
    2: {
        'Option A': {
            primary: 6,
            secondary: 1,
            starPlayers: 0,
        },
        'Option B': {
            primary: 3,
            secondary: 1,
            starPlayers: 1,
        },
    },
    3: {
        'Option A': {
            primary: 6,
            secondary: 2,
            starPlayers: 1,
        },
        'Option B': {
            primary: 3,
            secondary: 1,
            starPlayers: 2,
        },
    },
};
