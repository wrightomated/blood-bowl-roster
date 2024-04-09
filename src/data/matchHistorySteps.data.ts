import AddMatchInducements from '../components/gameHistory/individualControls/addMatchInducements.svelte';
import GameDetails from '../components/gameHistory/individualControls/gameDetails.svelte';
import MatchToRosterOptions from '../components/gameHistory/individualControls/matchToRosterOptions.svelte';
import PostGameCalculations from '../components/gameHistory/individualControls/postGameCalculations.svelte';
import PreGameCalculations from '../components/gameHistory/individualControls/preGameCalculations.svelte';
import PlayerEvents from '../components/gameHistory/playerEvents.svelte';
import type { StepperStep } from '../models/stepper.model';

export const newMatchRecordSteps: StepperStep[] = [
    { title: 'match.details.title', component: GameDetails, status: 'current' },
    {
        title: 'match.pre.title',
        component: PreGameCalculations,
        status: 'future',
    },
    {
        title: 'match.inducements.title',
        component: AddMatchInducements,
        status: 'future',
    },
    { title: 'match.events.title', component: PlayerEvents, status: 'future' },
    {
        title: 'match.post.title',
        component: PostGameCalculations,
        status: 'future',
    },
    {
        title: 'match.save.title',
        component: MatchToRosterOptions,
        status: 'future',
    },
];
