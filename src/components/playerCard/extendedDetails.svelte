<script lang="ts">
    import type { RosterPlayerRecord } from '../../models/roster.model';

    export let index: number;
    export let rosterPlayer: RosterPlayerRecord;
</script>

{#if !!rosterPlayer.alterations?.gameRecords}
    {#each Object.entries(rosterPlayer.alterations.gameRecords) as gameRecord}
        <div>{gameRecord[0]}: {gameRecord[1]}</div>
    {/each}
{/if}
