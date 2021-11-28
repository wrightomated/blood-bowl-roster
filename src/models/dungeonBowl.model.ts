export interface DungeonBowlCollege {
    name: CollegeName;
    characteristics: CollegeCharacteristics;
    players: {
        linemen: PlayerGroup;
        runners?: PlayerGroup;
        blitzers?: PlayerGroup;
        throwers?: PlayerGroup;
        blockers?: PlayerGroup;
        special?: PlayerGroup;
        bigGuys?: PlayerGroup;
    };
}

export interface PlayerGroup {
    max: number;
    playerIds: number[];
}

export interface CollegeCharacteristics {
    speed: number;
    power: number;
    skill: number;
    aggression: number;
    resilience: number;
}

export type CollegeName =
    | 'Fire'
    | 'Shadow'
    | 'Metal'
    | 'Light'
    | 'Death'
    | 'Life'
    | 'Beasts'
    | 'Heavens';
