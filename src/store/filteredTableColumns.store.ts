import { derived } from 'svelte/store';
import { tableColumns } from './tableColumns.store';
import { roster } from './teamRoster.store';

export const filteredTableColumns = derived(
    [tableColumns, roster],
    ([$tableColumns, $roster]) =>
        $tableColumns.filter(
            (details) =>
                !details?.hideColumn &&
                !details?.disallowedRosterFormats?.includes($roster.format) &&
                !details?.disallowedRosterModes?.includes($roster.mode) &&
                details?.redraft !== 'only'
        )
);

export const redraftTableColumns = derived(
    [tableColumns, roster],
    ([$tableColumns, $roster]) =>
        $tableColumns.filter(
            (details) =>
                !details?.hideColumn &&
                !details?.disallowedRosterFormats?.includes($roster.format) &&
                !details?.disallowedRosterModes?.includes($roster.mode) &&
                !!details?.redraft
        )
);
