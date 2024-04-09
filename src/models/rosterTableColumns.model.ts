import type { RosterMode } from '../store/rosterMode.store';
import type { TeamFormat } from '../types/teamFormat';
import type { RosterPlayerRecord } from './roster.model';

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
    | 'Spp'
    | 'MNG'
    | 'NI'
    | 'TR'
    | 'Current Value'
    | 'Custom'
    | 'Seasons'
    | 'Cost'
    | 'Redraft';

export interface ColumnDetails {
    id?: number;
    name?: TableColumnName;
    headerDetails?: HeaderDetails;
    rowDetails?: RowDetails;
    colspan?: number;
    customName?: string;
    title?: string;
    hideColumn?: boolean;
    orderByPropertyPath?: string;
    disallowedRosterModes?: RosterMode[];
    disallowedRosterFormats?: TeamFormat[];
    sortFunction?: (a: RosterPlayerRecord, b: RosterPlayerRecord) => number;
    redraft?: 'only' | 'yes';
}

interface HeaderDetails {
    elementId?: string;
    elementClass?: string;
    hideName?: boolean;
}

interface RowDetails {
    component: any;
    redraftComponent?: any;
    tdClass?: string;
    cyData?: string;
}
