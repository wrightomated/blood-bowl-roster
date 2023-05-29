import { derived, readable } from 'svelte/store';
import type { CustomTeam } from '../customisation/types/CustomiseTeamList.type';
import { filteredTeamData } from '../helpers/teamDataFilter';
import { teamFormat } from '../store/teamFormat.store';
import { customisationRules } from '../customisation/customisation.store';

export const availableTeams = derived(
    [customisationRules, teamFormat],
    ([$customisationRules, $teamFormat]) => {
        return $customisationRules
            ? filteredTeamData({ tournamentCustomisation: $customisationRules })
            : filteredTeamData({ format: $teamFormat });
    }
);
