<script lang="ts">
    import { customisationRules } from '../../customisation/customisation.store';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';
    import CurrentAdvancementList from './currentAdvancementList.svelte';

    import SelectAdvancement from './selectAdvancement.svelte';

    export let index: number;
    let rosterPlayer: RosterPlayerRecord;
    $: rosterPlayer = $roster.players[index];

    $: skillStackingAllowed = !$customisationRules?.allowances?.noSkillStacking;
</script>

<CurrentAdvancementList {rosterPlayer} {index} />

{#if (skillStackingAllowed && rosterPlayer.alterations?.advancements < 6) || !rosterPlayer.alterations?.advancements}
    <SelectAdvancement {rosterPlayer} {index} />
{/if}
