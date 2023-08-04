/**
 * Stadium Table: 2d6
 *  -> Category D6
 *      -> Attribute
 */

import type { D6Result, TwoD6Result } from './dice.model';

export type StadiumCategory =
    | 'Unusual Playing Surface'
    | 'Rough & Ready Stadium'
    | 'Nothing out of the Ordinary'
    | 'Luxury Stadium'
    | 'Local Crowd'
    | 'Street Pitch'
    | 'Sewer Pitch';

export type StadiumTable = Record<TwoD6Result, Stadium>;

export type Stadium = {
    category: StadiumCategory;
    attributes?: StadiumAttribute[];
};

export type StadiumAttribute = {
    roll: D6Result;
    attribute: string;
};
