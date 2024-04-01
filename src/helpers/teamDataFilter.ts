import type { TournamentCustomisation } from '../customisation/types/TournmentCustomisation.type';
import { dungeonBowlColleges } from '../data/dungeonBowlColleges.data';
import { teamData } from '../data/teams.data';
import { dbCollegeToTeam } from '../models/dungeonBowl.model';
import type { Team } from '../models/team.model';
import type { TeamFormat } from '../types/teamFormat';

export function filteredTeamData(options: {
    format?: TeamFormat;
    tournamentCustomisation?: TournamentCustomisation;
}) {
    if (!options.tournamentCustomisation) {
        return getBaseTeamData(options?.format || 'elevens');
    }
    const customisation = options.tournamentCustomisation;
    let baseTeamData = getBaseTeamData(customisation.format);

    const filteredTeams = baseTeamData.filter((team) => {
        return !customisation.tournamentTeamList?.excludedIds.includes(team.id);
    });
    return [
        ...filteredTeams,
        ...customisation.tournamentTeamList.additionalTeams,
    ];
}

function getBaseTeamData(format?: TeamFormat): Team[] {
    if (format === 'dungeon bowl') {
        return dungeonBowlColleges.colleges.map((x) => dbCollegeToTeam(x));
    }
    return teamData.teams;
}
