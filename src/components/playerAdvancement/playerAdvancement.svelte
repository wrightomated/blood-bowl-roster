<script lang="ts">
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import StatBlock from '../playerCard/statBlock.svelte';
    import PlayerCharacteristic from '../rosterPlayer/playerCharacteristic.svelte';

    export let rosterPlayer: RosterPlayerRecord;
</script>

<h2>{rosterPlayer.playerName || rosterPlayer.player.position}</h2>

<!-- <StatBlock  -->
<!-- <PlayerCharacteristic {rosterPlayer} charIndex={0} /> -->
