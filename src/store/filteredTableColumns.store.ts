import { derived } from 'svelte/store';
import { tableColumns } from './tableColumns.store';
import { roster } from './teamRoster.store';

export const filteredTableColumns = derived(
    [tableColumns, roster],
    ([$tableColumns, $roster]) =>
        $tableColumns.filter(
            (d) =>
                !d?.hideColumn &&
                !d?.disallowedRosterFormats?.includes($roster.format) &&
                !d?.disallowedRosterModes?.includes($roster.mode)
        )
);
