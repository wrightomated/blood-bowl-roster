import { writable } from 'svelte/store';
import RosterPlayerCard from '../components/rosterPlayer/rosterPlayerCard.svelte';

function createModalState() {
    const { subscribe, set, update } = writable<ModalState>({
        isOpen: false,
        component: '',
        canClose: true,
        componentProps: {},
    });

    return {
        update,
        set,
        subscribe,
        enableClose: (canClose: boolean) =>
            update((store) => {
                return { ...store, canClose };
            }),
        close: () =>
            update((store) => {
                return {
                    ...store,
                    isOpen: false,
                    canClose: true,
                    component: undefined,
                    componentProps: {},
                    compact: false,
                };
            }),
        // This is to prevent a circular dependency
        editPlayer: (index: number) =>
            update((store) => {
                return {
                    ...store,
                    isOpen: true,
                    canClose: true,
                    compact: true,
                    component: RosterPlayerCard,
                    componentProps: {
                        index,
                        editMode: true,
                    },
                };
            }),
    };
}

export const modalState = createModalState();

export interface ModalState {
    isOpen: boolean;
    component: any;
    componentProps: any;
    canClose: boolean;
    compact?: boolean;
}
