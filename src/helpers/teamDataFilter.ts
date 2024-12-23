import type { CustomTeam } from '../customisation/types/CustomiseTeamList.type';
import type { TournamentCustomisation } from '../customisation/types/TournmentCustomisation.type';
import { teamData } from '../data/teams.data';

export function filteredTeamData(options: {
    teams: CustomTeam[];
    tournamentCustomisation?: TournamentCustomisation;
}) {
    if (!options.tournamentCustomisation) {
        return options.teams;
    }
    const customisation = options.tournamentCustomisation;
    let baseTeamData = teamData.teams;

    const filteredTeams = baseTeamData.filter((team) => {
        return !customisation.tournamentTeamList?.excludedIds.includes(team.id);
    });
    const alteredTiersTeams = filteredTeams.map((team) => {
        const tier = customisation?.updatedTierMap?.[team.name];
        return tier ? { ...team, tier } : team;
    });

    const additionalTeams =
        customisation?.tournamentTeamList?.additionalTeams || [];
    return [...alteredTiersTeams, ...additionalTeams];
}
