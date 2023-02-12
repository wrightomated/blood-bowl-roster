<script lang="ts">
    import {
        characteristicMaxValue,
        characteristics,
    } from '../../data/statOrder.data';
    import { getStat } from '../../helpers/statHelpers';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import StatBlock from './statBlock.svelte';

    export let rosterPlayer: RosterPlayerRecord;
    export let topBorder: boolean = false;

    $: alteredStats = characteristicMaxValue.map(
        (_, i) =>
            (rosterPlayer?.alterations?.statChange?.[i] || 0) -
            (rosterPlayer?.alterations?.injuries?.[i] || 0)
    );
</script>

<div class="player-characteristics">
    {#each rosterPlayer.player.playerStats as stat, i}
        <StatBlock
            char={characteristics[i]}
            value={getStat(stat, i, rosterPlayer)}
            change={alteredStats[i]}
            {topBorder}
        />
    {/each}
</div>

<style>
    .player-characteristics {
        display: flex;
        position: relative;
        left: -2px;
    }
</style>
