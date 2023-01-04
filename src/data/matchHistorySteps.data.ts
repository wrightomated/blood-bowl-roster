import AddMatchInducements from '../components/gameHistory/individualControls/addMatchInducements.svelte';
import GameDetails from '../components/gameHistory/individualControls/gameDetails.svelte';
import MatchToRosterOptions from '../components/gameHistory/individualControls/matchToRosterOptions.svelte';
import PostGameCalculations from '../components/gameHistory/individualControls/postGameCalculations.svelte';
import PreGameCalculations from '../components/gameHistory/individualControls/preGameCalculations.svelte';
import PlayerEvents from '../components/gameHistory/playerEvents.svelte';
import type { MatchHistoryStep } from '../models/matchHistory.model';

export const newMatchRecordSteps: MatchHistoryStep[] = [
    { title: 'Game Details', component: GameDetails, status: 'current' },
    {
        title: 'Pre-game Calculations',
        component: PreGameCalculations,
        status: 'future',
    },
    {
        title: 'Match Inducements',
        component: AddMatchInducements,
        status: 'future',
    },
    { title: 'Player Events', component: PlayerEvents, status: 'future' },
    {
        title: 'Post-game Calculations',
        component: PostGameCalculations,
        status: 'future',
    },
    {
        title: 'Save Match History',
        component: MatchToRosterOptions,
        status: 'future',
    },
];
