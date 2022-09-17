export type InGame = {
    // Take from this before take from treasury.
    pettyCash: number;
    opponentTouchdowns: number;
    // Needed?
    fanFactor: number;
    playerStats: {
        // playerId, amount
        touchdowns: Record<number, number>;
        casualties: Record<number, number>;
        kills: Record<number, number>;
        passes: Record<number, number>;
    };
    weather;
    ball;
    stadium;
};
