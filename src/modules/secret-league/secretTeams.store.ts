import { writable } from 'svelte/store';
import type { CustomTeam } from '../../customisation/types/CustomiseTeamList.type';

export const secretTeams = writable<CustomTeam[]>([]);
