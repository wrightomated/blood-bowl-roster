import type { SvelteComponent, SvelteComponentTyped } from 'svelte';
import type { RosterMode } from '../store/rosterMode.store';
import type { TeamFormat } from '../store/teamFormat.store';

export type TableColumnName =
    | 'Number'
    | 'Name'
    | 'Controls'
    | 'Position'
    | 'MA'
    | 'ST'
    | 'AG'
    | 'PA'
    | 'AV'
    | 'Skills'
    | 'Hiring Fee'
    | 'Unspent Spp'
    | 'MNG'
    | 'NI'
    | 'TR'
    | 'Current Value'
    | 'Custom';

export interface ColumnDetails {
    id?: number;
    name: TableColumnName;
    headerDetails?: HeaderDetails;
    rowDetails?: RowDetails;
    colspan?: number;
    customName?: string;
    title?: string;
    hideColumn?: boolean;
    disallowedRosterModes?: RosterMode[];
    disallowedRosterFormats?: TeamFormat[];
}

interface HeaderDetails {
    elementId?: string;
    elementClass?: string;
    hideName?: boolean;
}

interface RowDetails {
    component: any;
    tdClass?: string;
    cyData?: string;
}
