import { derived } from 'svelte/store';
import { filteredTeamData } from '../helpers/teamDataFilter';
import { teamFormat } from '../store/teamFormat.store';
import { customisationRules } from '../customisation/customisation.store';
import { secretTeams } from '../modules/secret-league/secretTeams.store';
import { getBaseTeamData } from '../helpers/baseTeamData';

export const availableTeams = derived(
    [customisationRules, teamFormat, secretTeams],
    ([$customisationRules, $teamFormat, $secretTeams]) => {
        let isDungeonBowl = !!$teamFormat && $teamFormat === 'dungeon bowl';
        let teams = [...getBaseTeamData(isDungeonBowl), ...$secretTeams];
        return $customisationRules
            ? filteredTeamData({
                  teams,
                  tournamentCustomisation: $customisationRules,
              })
            : filteredTeamData({ teams });
    }
);
