import { writable } from 'svelte/store';
import FootballSpinner from '../components/uiComponents/footballSpinner.svelte';
import ModalText from '../components/uiComponents/modalText.svelte';

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
        modalLoading: (loadingText: string) =>
            update((store) => {
                return {
                    ...store,
                    isOpen: true,
                    canClose: false,
                    component: FootballSpinner,
                    componentProps: { loadingText },
                };
            }),
        modalError: (text: string) =>
            update((store) => {
                return {
                    ...store,
                    isOpen: true,
                    canClose: true,
                    component: ModalText,
                    componentProps: { text },
                };
            }),
        modalMessage: (text: string) =>
            update((store) => {
                return {
                    ...store,
                    isOpen: true,
                    canClose: true,
                    component: ModalText,
                    componentProps: { text },
                };
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
