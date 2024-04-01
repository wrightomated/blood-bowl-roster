<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { newMatchRecord } from '../../helpers/matchHistoryHelpers';
    import { currentUserStore } from '../../store/currentUser.store';
    import { matchHistorySteps } from '../../store/matchHistorySteps.store';
    import { modalState } from '../../store/modal.store';
    import { selectedRosterTool } from '../../store/selectedRosterTool.store';
    import { roster } from '../../store/teamRoster.store';
    import Button from '../uiComponents/button.svelte';
    import ToggleButton from '../uiComponents/toggleButton.svelte';
    import MatchHistoryCard from './matchHistoryCard.svelte';

    const rosterTools = ['match.records', 'common.notes', 'match.setups'];

    async function newMatch() {
        if (!$roster.matchDraft) {
            $roster.matchDraft = newMatchRecord(
                $currentUserStore.displayName,
                $roster.mode === 'league'
            );
            matchHistorySteps.reset($roster.mode, $roster.format);
        }
        modalState.modalLoading($_('loading'));

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
        <strong>{$_('common.notes')}</strong>
        <p>{$roster.notes}</p>
    </div>
{/if}

<div class="match-history no-print">
    <h2>{$_('tools')}</h2>
    <div class="tool-content">
        <!-- Toggle between Match Records, notes and setups -->
        <ToggleButton
            options={rosterTools}
            selectedIndex={rosterTools.findIndex(
                (x) => x === $selectedRosterTool
            )}
            selected={(option) => {
                selectedRosterTool.set(option);
            }}
        />
        {#if $selectedRosterTool === rosterTools[1]}
            <textarea
                name="notes"
                class="notes-area"
                id="notes"
                aria-label="notes"
                rows="16"
                maxlength="2048"
                bind:value={$roster.notes}
            />
        {:else if $selectedRosterTool === rosterTools[2]}
            <p>Coming soon</p>
        {:else if $selectedRosterTool === rosterTools[0]}
            {#if $currentUserStore}
                <div class="button-container">
                    {#if !$roster.matchDraft}
                        <Button clickFunction={newMatch}
                            >{$_('match.new')}</Button
                        >
                    {:else}
                        <Button clickFunction={newMatch}
                            >{$_('match.continue')}</Button
                        >
                        <Button
                            cancel={true}
                            clickFunction={roster.deleteMatchDraft}
                            >{$_('match.delete')}</Button
                        >
                    {/if}
                </div>
                {#if $roster?.matchSummary}
                    {#each $roster.matchSummary as matchSummary (matchSummary.id)}
                        <MatchHistoryCard {matchSummary} />
                    {/each}
                {/if}
            {:else}
                <p>{$_('match.login')}</p>
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
