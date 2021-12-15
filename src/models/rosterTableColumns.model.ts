import type { RosterMode } from '../store/rosterMode.store';
import type { TeamFormat } from '../store/teamFormat.store';

export type TableColumnName =
    | 'Number'
    | 'Name'
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
    colspan?: number;
    customName?: string;
    title?: string;
    hideColumn?: boolean;
    hideName?: boolean;
    elementId?: string;
    elementClass?: string;
    disallowedRosterModes?: RosterMode[];
    disallowedRosterFormats?: TeamFormat[];
}
