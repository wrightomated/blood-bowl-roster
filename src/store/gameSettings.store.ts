import { derived } from 'svelte/store';
import { roster } from './teamRoster.store';

import { getGameTypeSettings } from '../helpers/gameSettings';
import { customisationRules } from '../customisation/customisation.store';

export const gameSettings = derived(
    [roster, customisationRules],
    ([$roster, $customisation]) => {
        return getGameTypeSettings($roster.format, $customisation);
    }
);
