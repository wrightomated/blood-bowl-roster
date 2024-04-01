<script lang="ts">
    import { gameEventPluralMap } from '../../helpers/matchHistoryHelpers';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';
    import TitleWithResult from '../gameHistory/matchCardComponents/titleWithResult.svelte';

    export let index: number;
    let rosterPlayer: RosterPlayerRecord;
    $: rosterPlayer = $roster.players[index];
</script>

{#if !!rosterPlayer.alterations?.gameRecords}
    <div class="records">
        {#each Object.entries(rosterPlayer.alterations.gameRecords) as gameRecord}
            <TitleWithResult
                title={gameEventPluralMap[gameRecord[0]] || gameRecord[0]}
                result={gameRecord[1]}
                background="none"
            />
        {/each}
    </div>
{/if}

<style>
    .records {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        gap: 8px;
    }
</style>
