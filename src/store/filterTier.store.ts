import { derived, writable } from "svelte/store";
import type { Writable } from 'svelte/store';
import type { TeamTier } from "../models/team.model";

const createToggledTiers = () => {
    const { subscribe, update }: Writable<boolean[]> = writable(
        [true, true, true]
    );
    return {
        subscribe,
        toggleTier: (tier: TeamTier) => {
            update((store) => {
                return store.map((x,i) => tier === i + 1 ? !x : x)
            })
        }
    }
}

export const toggledTiers = createToggledTiers();

export const filteredTiers = derived(
    toggledTiers,
    $toggledTiers => $toggledTiers.map((x,i) => {if(x) return i+1})
);
