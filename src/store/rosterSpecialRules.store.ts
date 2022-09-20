import { derived, writable } from 'svelte/store';

import type { TeamSpecialRule } from '../models/team.model';
import { PickedSpecialRule } from '../data/teams.data';
import { currentTeam } from './currentTeam.store';
import { roster } from './teamRoster.store';

export const teamSelectionSpecialRule = writable<TeamSpecialRule | undefined>(
    undefined
);

export const rosterSpecialRules = derived(
    [roster, currentTeam],
    ([$roster, $currentTeam]) => {
        let specialRules = [...$currentTeam.specialRules];
        if ($roster.extra?.special_rule) {
            specialRules.push(
                PickedSpecialRule[$roster.extra.special_rule] as TeamSpecialRule
            );
        }
        return specialRules;
    }
);

export const teamCreationSpecialRules = derived(
    [currentTeam, teamSelectionSpecialRule],
    ([$currentTeam, $picked]) => {
        let specialRules = [...$currentTeam.specialRules];
        if ($picked) {
            specialRules.push($picked);
        }
        return specialRules;
    }
);
