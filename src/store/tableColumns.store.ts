import { writable } from 'svelte/store';
import type { ColumnDetails } from '../models/rosterTableColumns.model';
import { columnDetails } from '../data/columnDetails.data';
import { switchTwoElements } from '../helpers/switchTwoElements';
import CustomText from '../components/uiComponents/customText.svelte';
import { customColumnData } from './customColumnPlayerData.store';

function createTableColumnStore() {
    const { subscribe, set, update } = writable<ColumnDetails[]>(columnDetails);
    return {
        subscribe,
        moveLeft: (index: number) =>
            update((store) => {
                return switchTwoElements(store, index, index - 1);
            }),
        moveRight: (index: number) =>
            update((store) => {
                return switchTwoElements(store, index, index + 1);
            }),
        addColumn: (customName: string) =>
            update((store) => {
                const newId = getNewId(store);
                customColumnData.addCustomColumn(newId);
                return store.concat([
                    {
                        id: newId,
                        name: 'Custom',
                        customName,
                        rowDetails: {
                            component: CustomText,
                        },
                    },
                ]);
            }),
        toggleVisibility: (index: number) =>
            update((store: ColumnDetails[]) => {
                return store.map((x, i) =>
                    i === index ? { ...x, hideColumn: !x.hideColumn } : x
                );
            }),
        resetColumns: () => {
            set(columnDetails);
        },
    };
}

const getNewId = (columnDetails: ColumnDetails[]) =>
    Math.max(...columnDetails.map((x) => x.id)) + 1;

export const tableColumns = createTableColumnStore();
