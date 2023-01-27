<script lang="ts">
    import {
        matchSummary,
        newMatchRecord,
    } from '../../helpers/matchHistoryHelpers';
    import { currentUserStore } from '../../store/currentUser.store';
    import { matchHistorySteps } from '../../store/matchHistorySteps.store';
    import { modalState } from '../../store/modal.store';
    import { roster } from '../../store/teamRoster.store';
    import Button from '../uiComponents/button.svelte';
    import FootballSpinner from '../uiComponents/footballSpinner.svelte';
    import MatchHistoryCard from './matchHistoryCard.svelte';

    async function newMatch() {
        if (!$roster.matchDraft) {
            $roster.matchDraft = newMatchRecord($currentUserStore.displayName);
            matchHistorySteps.reset();
        }

        modalState.set({
            ...$modalState,
            isOpen: true,
            canClose: true,
            component: FootballSpinner,
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
    }
</script>

{#if $roster.mode === 'league' && $roster.format !== 'dungeon bowl'}
    <div class="match-history no-print">
        <!-- <NewMatchRecord /> -->
        <h2>Match History</h2>
        {#if $currentUserStore}
            <div class="button-container">
                {#if !$roster.matchDraft}
                    <Button clickFunction={newMatch}>New Match</Button>
                {:else}
                    <Button clickFunction={newMatch}>Continue Record</Button>
                    <Button
                        cancel={true}
                        clickFunction={roster.deleteMatchDraft}
                        >Delete Draft</Button
                    >
                {/if}
            </div>

            {#if $roster?.matchSummary}
                <div class="matches">
                    {#each $roster.matchSummary as matchSummary (matchSummary.id)}
                        <MatchHistoryCard {matchSummary} />
                    {/each}
                </div>
            {/if}
        {:else}
            <p>You must be logged in to record matches.</p>
        {/if}
    </div>
{/if}

<style lang="scss">
    .match-history {
        h2 {
            font-size: 36px;
            text-align: center;
        }
        p {
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
    .button-container {
        text-align: center;
        margin-bottom: 32px;
    }
</style>
