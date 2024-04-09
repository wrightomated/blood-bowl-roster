import RedraftBudget from '../components/redraft/redraftBudget.svelte';
import type { StepperStep } from '../models/stepper.model';

export const redraftSteps: StepperStep[] = [
    { title: 'redraft.budget', component: RedraftBudget, status: 'current' },
    { title: 'redraft.players', component: RedraftBudget, status: 'future' },
    // {
    //     title: 'match.pre.title',
    //     component: PreGameCalculations,
    //     status: 'future',
    // },
    // {
    //     title: 'match.inducements.title',
    //     component: AddMatchInducements,
    //     status: 'future',
    // },
    // { title: 'match.events.title', component: PlayerEvents, status: 'future' },
    // {
    //     title: 'match.post.title',
    //     component: PostGameCalculations,
    //     status: 'future',
    // },
    // {
    //     title: 'match.save.title',
    //     component: MatchToRosterOptions,
    //     status: 'future',
    // },
];
