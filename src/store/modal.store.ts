import { writable } from 'svelte/store';
import { overlayVisible } from './overlayVisible.store';

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
        close: () =>
            update((store) => {
                overlayVisible.set(false);
                return { ...store, isOpen: false };
            }),
    };
}

export const modalState = createModalState();

export interface ModalState {
    isOpen: boolean;
    component: any;
    canClose: boolean;
}
