import { writable } from 'svelte/store';

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
}
