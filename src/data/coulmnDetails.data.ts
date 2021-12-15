import type { ColumnDetails } from '../models/rosterTableColumns.model';

export const columnDetails: ColumnDetails[] = [
    {
        id: 1,
        name: 'Number',
        hideName: true,
    },
    {
        id: 2,
        name: 'Name',
        elementId: 'name-header',
        elementClass: 'left-align',
        colspan: 2,
    },
    {
        id: 3,
        name: 'Position',
        elementId: 'position-header',
        elementClass: 'left-align',
    },
    {
        id: 4,
        name: 'MA',
        title: 'Movement Allowance',
    },
    {
        id: 5,
        name: 'ST',
        title: 'Strength',
    },
    {
        id: 6,
        name: 'AG',
        title: 'Agility',
    },
    {
        id: 7,
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
        elementClass: 'skills',
    },
    {
        id: 11,
        name: 'Hiring Fee',
    },
    {
        id: 12,
        name: 'Unspent Spp',
        elementId: 'spp-header',
        disallowedRosterFormats: ['sevens'],
    },
    {
        id: 13,
        name: 'MNG',
        title: 'Miss next game',
        elementId: 'mng-header',
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
