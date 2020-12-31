import type { StarPlayer } from "../models/player.model";
import type { Team } from "../models/team.model"

export const filterStarPlayers = (sp: {starPlayers: StarPlayer[]} , currentTeam: Team, extraFilter: number[] = []) =>
    sp.starPlayers
        .filter(
            (x) =>
                x.playsFor.length === 0 ||
                x.playsFor.some((a) => currentTeam.specialRules.includes(a)),
        )
        .filter(
            (p) =>
                !p?.doesNotPlayFor ||
                p.doesNotPlayFor.every(
                    (a) => !currentTeam.specialRules.includes(a),
                ),
        ).filter(
            (p) => !extraFilter.includes(p.id),
        );
