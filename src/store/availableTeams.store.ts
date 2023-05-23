import { readable } from 'svelte/store';
import { teamData } from '../data/teams.data';
import { BigV2023 } from '../customisation/data/bigV2023';
import type { CustomTeam } from '../customisation/types/CustomiseTeamList.type';

export const availableTeams = readable<CustomTeam[]>(filterTeamData());
