import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { CustomColumns } from '../models/customColumn.model';

function createCustomColumns() {
    const { subscribe, update }: Writable<CustomColumns> = writable({});

    return {
        subscribe,
        addCustomColumn: (columnId: number) =>
            update((store) => {
                return {
                    ...store,
                    [columnId]: Array(16).fill(''),
                };
            }),
    };
}

export const customColumnData = createCustomColumns();
