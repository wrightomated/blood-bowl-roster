<script lang="ts">
    import { getStat } from '../../helpers/statHelpers';
    import type { RosterPlayerRecord } from '../../models/roster.model';

    export let rosterPlayer: RosterPlayerRecord;
    export let charIndex: number;

    $: alteredStat =
        (rosterPlayer?.alterations?.statChange?.[charIndex] || 0) -
        (rosterPlayer?.alterations?.injuries?.[charIndex] || 0);
</script>

<span class:improved={alteredStat > 0} class:degraded={alteredStat < 0}
    >{getStat(
        rosterPlayer.player.playerStats[charIndex],
        charIndex,
        rosterPlayer
    )}</span
>

<style lang="scss">
    .improved {
        color: green;
        text-decoration: underline;
    }
    .degraded {
        color: var(--error);
        text-decoration: underline;
    }
</style>
