<script lang="ts">
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';

    export let index: number;
    let rosterPlayer: RosterPlayerRecord;
    $: rosterPlayer = $roster.players[index];
</script>

{#if !!rosterPlayer.alterations?.gameRecords}
    {#each Object.entries(rosterPlayer.alterations.gameRecords) as gameRecord}
        <div>{gameRecord[0]}: {gameRecord[1]}</div>
    {/each}
{/if}
