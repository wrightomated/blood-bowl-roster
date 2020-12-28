import type { Roster } from './roster.model';

export interface SavedRoster {
    id: number;
    roster: Roster;
}
export interface RosterIndex {
    count: number;
    currentIndex: number;
    index: { id: number; name: string }[];
}
