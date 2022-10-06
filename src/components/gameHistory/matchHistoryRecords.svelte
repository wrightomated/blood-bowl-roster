<script lang="ts">
    import type { MatchHistorySummary } from '../../models/matchHistory.model';
    import { matchHistoryRecordDraft } from '../../store/matchHistoryRecordDraft.store';
    import { modalState } from '../../store/modal.store';
    import FootballSpinner from '../uiComponents/footballSpinner.svelte';
    import MatchHistoryCard from './matchHistoryCard.svelte';

    let showNewMatch = false;

    const matchSummaries: MatchHistorySummary[] = [
        {
            id: '1',
            opponent: { name: 'Bob', score: 0 },
            playerScores: { touchdowns: 3, casualties: 2, passes: 2, kills: 0 },
            isLeagueMatch: true,
            matchDate: new Date('2022-09-29'),
        },
        {
            id: '2',
            opponent: { name: 'Alfonso', score: 3 },
            playerScores: { touchdowns: 2, casualties: 2, passes: 2, kills: 0 },
            isLeagueMatch: false,
            // matchDate: new Date('2022-09-10'),
        },
        {
            id: '3',
            opponent: { name: 'Alicia', score: 1 },
            playerScores: { touchdowns: 1, casualties: 2, passes: 2, kills: 0 },
            isLeagueMatch: true,
            matchDate: new Date('2022-09-03'),
        },
    ];

    async function newMatch() {
        // Set draft info if no draft
        // matchHistoryRecordDraft.newDraft($currentUserStore.displayName);
        modalState.set({
            ...$modalState,
            isOpen: true,
            canClose: true,
            component: FootballSpinner,
            // componentProps: {
            //     loadingText: `Loading ${preview?.teamName || 'roster'}`,
            // },
        });
        await import('./newMatchRecord.svelte').then((component) => {
            modalState.set({
                ...$modalState,
                isOpen: true,
                canClose: true,
                component: component.default,
                // componentProps: {
                //     loadingText: `Loading ${preview?.teamName || 'roster'}`,
                // },
            });
        });

        // showNewMatch = true;
    }
</script>

<div class="match-history no-print">
    <!-- <NewMatchRecord /> -->
    <h2>Match History</h2>
    <button on:click={newMatch}>New Match</button>
    {#if showNewMatch}
        {#await import('./newMatchRecord.svelte') then c}
            <svelte:component this={c.default} />
        {/await}
    {/if}
    <div class="matches">
        {#each matchSummaries as matchSummary}
            <MatchHistoryCard {matchSummary} open={true} />
        {/each}
        <!--         
        <MatchHistoryCard opponentName="Alberto The Great" open={false} />
        <MatchHistoryCard opponentName="Alfonse" open={false} score={[0, 1]} /> -->
    </div>
    {JSON.stringify($matchHistoryRecordDraft, null, 2)}
</div>

<style lang="scss">
    .match-history {
        h2 {
            font-size: 36px;
            text-align: center;
        }
    }
    .matches {
        display: flex;
        /* flex: 1 1 0px; */
        gap: 20px;
        flex-direction: column;
        align-items: center;
        max-width: 800px;
        margin: 0 auto;
    }
</style>
