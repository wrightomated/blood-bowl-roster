<script lang="ts">
    import { modalState } from '../../store/modal.store';

    import { roster } from '../../store/teamRoster.store';
    import NewMatchRecord from './newMatchRecord.svelte';

    function addMatch() {
        // roster.addMatch();
        modalState.set({
            ...$modalState,
            isOpen: true,
            canClose: true,
            component: NewMatchRecord,
            // componentProps: {
            //     loadingText: `Loading ${preview?.teamName || 'roster'}`,
            // },
        });
    }

    const keys = [
        'opponent',
        'leagueOrFriendly',
        'fan factor',
        'petty cash',
        'inducements hired',
        'new current team value',
        'w/l/d',
        'score',
        'winnings',
        'league points',
        'notes',
    ];
</script>

{#if $roster.gameHistory}
    <h2>Match History</h2>
    <div class="history__table">
        <table>
            <thead>
                <tr>
                    <td>Opponent</td>
                    <td>League Fixture/<br />Friendly</td>
                    <td>Fan Factor</td>
                    <td>Petty Cash</td>
                    <td>Inducements Hired</td>
                    <td>New Current<br /> Team Value</td>
                    <td>W/L/D</td>
                    <td>Score</td>
                    <td>Winnings</td>
                    <td>League Points</td>
                    <td>Notes</td>
                </tr>
            </thead>
            <tbody>
                {#each $roster.gameHistory as row}
                    <tr>
                        {#each keys as key}
                            <td
                                class="history__cell"
                                contenteditable="true"
                                bind:innerHTML={row[key]}
                            />
                        {/each}
                    </tr>
                {/each}
                <tr class="no-print">
                    <td colspan="11"
                        ><button on:click={addMatch}>Add Match</button></td
                    >
                </tr>
            </tbody>
        </table>
    </div>
{/if}

<style lang="scss">
    .history {
        &__table {
            max-width: 100%;
            overflow-x: auto;
        }
        &__cell {
            border: 1px solid #ccc;
            &:empty {
                &::before {
                    font-family: 'Material Icons';
                    content: 'edit';
                    color: var(--metal);
                    font-size: 16px;
                }
                &:focus::before {
                    content: '';
                }
            }
        }
    }
    @media print {
        h2 {
            page-break-before: always;
        }
        .history {
            &__cell {
                border: 1px solid #ccc;
                &:empty {
                    &::before {
                        content: '';
                    }
                }
            }
        }
    }
</style>
