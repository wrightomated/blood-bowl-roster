import PlayerNumber from '../components/rosterPlayer/playerNumber.svelte';
import PlayerName from '../components/rosterPlayer/playerName.svelte';
import PlayerControls from '../components/rosterPlayer/playerControls.svelte';
import PlayerPosition from '../components/rosterPlayer/playerPosition.svelte';
import PlayerCharacteristic from '../components/rosterPlayer/playerCharacteristic.svelte';
import PlayerNumberInput from '../components/rosterPlayer/playerNumberInput.svelte';
import PlayerCheckbox from '../components/rosterPlayer/playerCheckbox.svelte';
import SkillElement from '../components/skillElement.svelte';
import TextElement from '../components/uiComponents/textElement.svelte';
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
        name: 'Controls',
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
            elementClass: 'left-align position',
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
        rowDetails: {
            component: PlayerCharacteristic,
        },
    },
    {
        id: 6,
        name: 'ST',
        title: 'Strength',
        rowDetails: {
            component: PlayerCharacteristic,
        },
    },
    {
        id: 7,
        name: 'AG',
        title: 'Agility',
        rowDetails: {
            component: PlayerCharacteristic,
        },
    },
    {
        id: 8,
        name: 'PA',
        title: 'Passing',
        rowDetails: {
            component: PlayerCharacteristic,
        },
    },
    {
        id: 9,
        name: 'AV',
        title: 'Armour Value',
        rowDetails: {
            component: PlayerCharacteristic,
        },
    },
    {
        id: 10,
        name: 'Skills',
        headerDetails: {
            elementClass: 'skills',
        },
        rowDetails: {
            tdClass: 'left-align',
            component: SkillElement,
        },
    },
    {
        id: 11,
        name: 'Hiring Fee',
        rowDetails: {
            component: TextElement,
        },
    },
    {
        id: 12,
        name: 'Unspent Spp',
        headerDetails: {
            elementId: 'spp-header',
        },
        rowDetails: {
            component: PlayerNumberInput,
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
        rowDetails: {
            component: PlayerCheckbox,
        },
        disallowedRosterModes: ['exhibition'],
    },
    {
        id: 14,
        name: 'NI',
        title: 'Niggling Injury',
        rowDetails: {
            component: PlayerNumberInput,
        },
        disallowedRosterModes: ['exhibition'],
        disallowedRosterFormats: ['sevens'],
    },
    {
        id: 15,
        name: 'TR',
        title: 'Temporarily Retiring',
        headerDetails: {
            elementId: 'tr-header',
        },
        rowDetails: {
            component: PlayerCheckbox,
        },
        disallowedRosterModes: ['exhibition'],
        disallowedRosterFormats: ['sevens'],
    },
    {
        id: 16,
        name: 'Current Value',
        title: 'Current Value',
        rowDetails: {
            component: TextElement,
        },
        disallowedRosterModes: ['exhibition'],
    },
];
