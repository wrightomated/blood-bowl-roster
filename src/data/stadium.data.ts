import { Stadium, StadiumTable } from '../models/stadia.model';

const unusual: Stadium = {
    category: 'Unusual Playing Surface',
    attributes: [
        {
            roll: 1,
            attribute: 'Ankle-deep Water',
        },
        {
            roll: 2,
            attribute: 'Sloping Pitch',
        },
        {
            roll: 3,
            attribute: 'Ice',
        },
        {
            roll: 4,
            attribute: 'Astrogranite',
        },
        {
            roll: 5,
            attribute: 'Uneven Footing',
        },
        {
            roll: 6,
            attribute: 'Solid Stone',
        },
    ],
};

const rough: Stadium = {
    category: 'Rough & Ready Stadium',
    attributes: [
        {
            roll: 1,
            attribute: 'Apathetic Officials',
        },
        {
            roll: 2,
            attribute: 'Appalling Stands',
        },
        {
            roll: 3,
            attribute: 'Uncovered Trapdoors',
        },
        {
            roll: 4,
            attribute: 'Unclear Markings',
        },
        {
            roll: 5,
            attribute: 'Desperate for Exposure',
        },
        {
            roll: 6,
            attribute: 'Poorly-build Dungeons',
        },
    ],
};

const luxury: Stadium = {
    category: 'Luxury Stadium',
    attributes: [
        {
            roll: 1,
            attribute: 'Integrated Merchandise Stalls',
        },
        {
            roll: 2,
            attribute: 'Reputation for Spectacle',
        },
        {
            roll: 3,
            attribute: 'Broadcast Studio',
        },
        {
            roll: 4,
            attribute: 'On-site Apothecaries',
        },
        {
            roll: 5,
            attribute: 'Enclosed Pitch',
        },
        {
            roll: 6,
            attribute: 'Deluxe Seating',
        },
    ],
};

const localCrowd: Stadium = {
    category: 'Local Crowd',
    attributes: [
        {
            roll: 1,
            attribute: 'Ale-fuelled Maniacs',
        },
        {
            roll: 2,
            attribute: 'Boisterous Rabble',
        },
        {
            roll: 3,
            attribute: 'Know-it-all Hecklers',
        },
        {
            roll: 4,
            attribute: 'Bunch of Pacifists',
        },
        {
            roll: 5,
            attribute: 'Fickle Fans',
        },
        {
            roll: 6,
            attribute: 'Solemn and Silent',
        },
    ],
};

const nothing: Stadium = {
    category: 'Nothing out of the Ordinary',
};

export const StadiumTableData: StadiumTable = {
    2: unusual,
    3: unusual,
    4: rough,
    5: rough,
    6: nothing,
    7: nothing,
    8: nothing,
    9: luxury,
    10: luxury,
    11: localCrowd,
    12: localCrowd,
};
