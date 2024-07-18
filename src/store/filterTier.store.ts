import { derived, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

const createToggledTiers = () => {
    const { subscribe, update, set }: Writable<boolean[]> = writable([
        true,
        true,
        true,
        true,
    ]);
    return {
        subscribe,
        setTiers(tiers: number) {
            set(Array.from({ length: tiers }, () => true));
        },
        toggleTier: (tier: number) => {
            update((store) => {
                return store.map((x, i) => (tier === i + 1 ? !x : x));
            });
        },
    };
};

export const toggledTiers = createToggledTiers();

export const filteredTiers = derived(toggledTiers, ($toggledTiers) =>
    $toggledTiers.map((x, i) => {
        if (x) return i + 1;
    })
);
