export interface GameType {
    teamFormat: TeamFormat;
    maxPlayers: number;
    minPlayers: number;
    startingTreasury: number;
    rerollDetails: { costMultiplier: number; max: number };
    assistantCoaches: RosterExtra;
    cheerleaders: RosterExtra;
    apothecary: RosterExtra;
    dedicatedFans: RosterExtra;
}

type RosterExtra = {
    cost: number;
    max: number;
};

export type TeamFormat = 'sevens' | 'elevens';
