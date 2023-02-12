<script lang="ts">
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';
    import PlayerCharacteristics from '../playerCard/playerCharacteristics.svelte';
    import PlayerName from '../rosterPlayer/playerName.svelte';
    import SelectAdvancement from './selectAdvancement.svelte';

    export let index: number;
    let rosterPlayer: RosterPlayerRecord;
    $: rosterPlayer = $roster.players[index];
</script>

<!-- <h2>{rosterPlayer.playerName || rosterPlayer.player.position}</h2> -->

<div><PlayerName {index} /></div>
<PlayerCharacteristics {rosterPlayer} topBorder={true} />
<!-- <div>
    <AddSkill {index} />
</div> -->

<SelectAdvancement {rosterPlayer} />

<!-- <div>{JSON.stringify(rosterPlayer, null, 2)}</div> -->

<!-- <StatBlock  -->
<!-- <PlayerCharacteristic {rosterPlayer} charIndex={0} /> -->
