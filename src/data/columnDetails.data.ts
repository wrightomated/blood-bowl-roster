import PlayerNumber from '../components/rosterPlayer/playerNumber.svelte';
import PlayerName from '../components/rosterPlayer/playerName.svelte';
import PlayerControls from '../components/rosterPlayer/PlayerControls.svelte';
import PlayerPosition from '../components/rosterPlayer/PlayerPosition.svelte';
import type { ColumnDetails } from '../models/rosterTableColumns.model';

export const columnDetails: ColumnDetails[] = [
    {
        id: 1,
        name: 'Number',
        headerDetails: {
            hideName: true,
        },
        rowDetails: {
            component: PlayerNumber,
        },
    },
    {
        id: 2,
        name: 'Name',
        headerDetails: {
            elementId: 'name-header',
            elementClass: 'left-align',
        },
        rowDetails: {
            tdClass: 'left-align',
            component: PlayerName,
        },
    },
    {
        id: 3,
        name: 'Name',
        headerDetails: {
            hideName: true,
        },
        rowDetails: {
            tdClass: 'left-align',
            component: PlayerControls,
        },
    },
    {
        id: 4,
        name: 'Position',
        headerDetails: {
            elementId: 'position-header',
            elementClass: 'left-align',
        },
        rowDetails: {
            tdClass: 'left-align',
            component: PlayerPosition,
        },
    },
    {
        id: 5,
        name: 'MA',
        title: 'Movement Allowance',
    },
    {
        id: 6,
        name: 'ST',
        title: 'Strength',
    },
    {
        id: 7,
        name: 'AG',
        title: 'Agility',
    },
    {
        id: 8,
        name: 'PA',
        title: 'Passing',
    },
    {
        id: 9,
        name: 'AV',
        title: 'Armour Value',
    },
    {
        id: 10,
        name: 'Skills',
        headerDetails: {
            elementClass: 'skills',
        },
    },
    {
        id: 11,
        name: 'Hiring Fee',
    },
    {
        id: 12,
        name: 'Unspent Spp',
        headerDetails: {
            elementId: 'spp-header',
        },
        disallowedRosterFormats: ['sevens'],
    },
    {
        id: 13,
        name: 'MNG',
        title: 'Miss next game',
        headerDetails: {
            elementId: 'mng-header',
        },
        disallowedRosterModes: ['exhibition'],
    },
    {
        id: 14,
        name: 'NI',
        title: 'Niggling Injury',
        disallowedRosterModes: ['exhibition'],
        disallowedRosterFormats: ['sevens'],
    },
    {
        id: 15,
        name: 'TR',
        title: 'Temporarily Retiring',
        disallowedRosterModes: ['exhibition'],
        disallowedRosterFormats: ['sevens'],
    },
    {
        id: 16,
        name: 'Current Value',
        title: 'Current Value',
    },
];
