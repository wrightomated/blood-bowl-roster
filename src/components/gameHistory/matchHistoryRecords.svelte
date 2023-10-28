<script lang="ts">
    import { newMatchRecord } from '../../helpers/matchHistoryHelpers';
    import { currentUserStore } from '../../store/currentUser.store';
    import { matchHistorySteps } from '../../store/matchHistorySteps.store';
    import { modalState } from '../../store/modal.store';
    import { selectedRosterTool } from '../../store/selectedRosterTool.store';
    import { roster } from '../../store/teamRoster.store';
    import Button from '../uiComponents/button.svelte';
    import ToggleButton from '../uiComponents/toggleButton.svelte';
    import MatchHistoryCard from './matchHistoryCard.svelte';

    const rosterTools = ['Match Records', 'Notes', 'Setups'];

    async function newMatch() {
        if (!$roster.matchDraft) {
            $roster.matchDraft = newMatchRecord(
                $currentUserStore.displayName,
                $roster.mode === 'league'
            );
            matchHistorySteps.reset($roster.mode, $roster.format);
        }
        modalState.modalLoading('Setting up new match');

        await import('./newMatchRecord.svelte').then((component) => {
            modalState.set({
                ...$modalState,
                isOpen: true,
                canClose: true,
                component: component.default,
            });
        });
    }
</script>

{#if $roster.notes}
    <div class="print-only">
        <strong>Notes</strong>
        <p>{$roster.notes}</p>
    </div>
{/if}

<div class="match-history no-print">
    <h2>Roster Tools</h2>
    <div class="tool-content">
        <!-- Toggle between Match Records, notes and setups -->
        <ToggleButton
            options={['Match Records', 'Notes', 'Setups']}
            selectedIndex={rosterTools.findIndex(
                (x) => x === $selectedRosterTool
            )}
            selected={(option) => {
                selectedRosterTool.set(option);
            }}
        />
        {#if $selectedRosterTool === 'Notes'}
            <textarea
                name="notes"
                class="notes-area"
                id="notes"
                aria-label="notes"
                rows="16"
                maxlength="2048"
                bind:value={$roster.notes}
            />
        {:else if $selectedRosterTool === 'Setups'}
            <p>Coming soon</p>
        {:else if $selectedRosterTool === 'Match Records'}
            {#if $currentUserStore}
                <div class="button-container">
                    {#if !$roster.matchDraft}
                        <Button clickFunction={newMatch}>New Match</Button>
                    {:else}
                        <Button clickFunction={newMatch}>Continue Record</Button
                        >
                        <Button
                            cancel={true}
                            clickFunction={roster.deleteMatchDraft}
                            >Delete Draft</Button
                        >
                    {/if}
                </div>
                {#if $roster?.matchSummary}
                    {#each $roster.matchSummary as matchSummary (matchSummary.id)}
                        <MatchHistoryCard {matchSummary} />
                    {/each}
                {/if}
            {:else}
                <p>You must be logged in to record match history.</p>
            {/if}
        {/if}
    </div>
</div>

<style lang="scss">
    .tool-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 800px;
        margin: 0 auto;
        gap: 24px;
    }
    .match-history {
        h2 {
            font-size: 36px;
            margin-block-end: 8px;
            text-align: center;
        }
        p {
            text-align: center;
        }
    }

    .notes-area {
        width: 100%;
    }
</style>
