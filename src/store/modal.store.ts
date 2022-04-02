import { writable } from 'svelte/store';

export const modalState = writable<ModalState>({
    isOpen: false,
    component: undefined,
});

export interface ModalState {
    isOpen: boolean;
    component: any;
}
