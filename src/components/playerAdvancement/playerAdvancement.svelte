<script lang="ts">
    import type {
        RosterPlayerRecord,
        SpecificAdvancement,
    } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';
    import CurrentAdvancementList from './currentAdvancementList.svelte';

    import SelectAdvancement from './selectAdvancement.svelte';

    export let index: number;
    let rosterPlayer: RosterPlayerRecord;
    $: rosterPlayer = $roster.players[index];

    let specificAdvancements: SpecificAdvancement[];
    $: specificAdvancements =
        rosterPlayer.alterations?.specificAdvancements || [];
    // CHAOS CUP RULE
    $: showSelectAdvancement =
        specificAdvancements.length === 0 ||
        (specificAdvancements.length === 1 &&
            specificAdvancements[0].type.includes('primary'));
</script>

<CurrentAdvancementList {rosterPlayer} {index} />

<!-- CHAOS CUP RULE -->
{#if showSelectAdvancement}
    <SelectAdvancement {rosterPlayer} {index} />
{/if}
