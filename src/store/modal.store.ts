import { writable } from 'svelte/store';

function createModalState() {
    const { subscribe, set, update } = writable<ModalState>({
        isOpen: false,
        component: undefined,
        canClose: true,
    });

    return {
        update,
        set,
        subscribe,
        enableClose: (canClose: boolean) =>
            update((store) => {
                return { ...store, canClose };
            }),
    };
}

export const modalState = createModalState();

export interface ModalState {
    isOpen: boolean;
    component: any;
    canClose: boolean;
}
