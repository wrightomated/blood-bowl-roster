import { derived } from 'svelte/store';
import { roster } from './teamRoster.store';

import { getGameTypeSettings } from '../helpers/gameSettings';

export const gameSettings = derived(roster, ($roster) => {
    return getGameTypeSettings($roster.format);
});
