import { writable } from 'svelte/store';
import type { ColumnDetails } from '../models/rosterTableColumns.model';
import { columnDetails } from '../data/coulmnDetails.data';

export const tableColumns = writable<ColumnDetails[]>(columnDetails);
