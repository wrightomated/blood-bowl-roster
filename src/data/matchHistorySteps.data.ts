import GameDetails from '../components/gameHistory/individualControls/gameDetails.svelte';
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
    { title: 'Player Events', component: PlayerEvents, status: 'future' },
];
