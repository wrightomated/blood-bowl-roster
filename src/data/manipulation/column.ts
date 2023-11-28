const fs = require('fs');

const jsonObject = {};
[
    {
        id: 1,
        name: 'Number',
        customName: '#',
        orderByPropertyPath: 'alterations.playerNumber',
        sortFunction: (a, b) => {
            if (!a.alterations.playerNumber || !b.alterations.playerNumber)
                return -1;

            return a.alterations.playerNumber - b.alterations.playerNumber;
        },
    },
    {
        id: 2,
        name: 'Name',
        headerDetails: {
            elementId: 'name-header',
            elementClass: 'left-align',
        },
        orderByPropertyPath: 'playerName',
        sortFunction: (a, b) => {
            if (!a.playerName || !b.playerName) return -1;

            return a.playerName.localeCompare(b.playerName);
        },
    },
    {
        id: 3,
        name: 'Controls',
        headerDetails: {
            elementClass: 'left-align no-print position',
        },
    },
    {
        id: 4,
        name: 'Position',
        headerDetails: {
            elementId: 'position-header',
            elementClass: 'left-align position',
        },

        orderByPropertyPath: 'player.position',
        sortFunction: (a, b) => {
            if (!a.player.position || !b.player.position) return -1;

            return a.player.position.localeCompare(b.player.position);
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
        rowDetails: {
            tdClass: 'left-align',
        },
    },
    {
        id: 11,
        name: 'Hiring Fee',
        rowDetails: {},
    },
    {
        id: 12,
        name: 'Unspent Spp',
        headerDetails: {
            elementId: 'spp-header',
        },
        rowDetails: {},
        disallowedRosterFormats: ['sevens'],
        orderByPropertyPath: 'alterations.spp',
        sortFunction: (a, b) => {
            if (!a.alterations.spp || !b.alterations.spp) return -1;

            return a.alterations.spp - b.alterations.spp;
        },
    },
    {
        id: 13,
        name: 'MNG',
        title: 'Miss next game',
        headerDetails: {
            elementId: 'mng-header',
        },
        rowDetails: {},
        disallowedRosterModes: ['exhibition'],
    },
    {
        id: 14,
        name: 'NI',
        title: 'Niggling Injury',
        rowDetails: {},
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
        rowDetails: {},
        disallowedRosterModes: ['exhibition'],
        disallowedRosterFormats: ['sevens'],
    },
    {
        id: 16,
        name: 'Current Value',
        title: 'Current Value',
        rowDetails: {},
        disallowedRosterModes: ['exhibition'],
    },
].forEach((team) => {
    jsonObject[team.id + ''] = team.name;
});

// Convert the JSON object into a string
const jsonString = JSON.stringify(jsonObject, null, 2);

// Write the string to a new file
fs.writeFileSync('columnNames.json', jsonString);
