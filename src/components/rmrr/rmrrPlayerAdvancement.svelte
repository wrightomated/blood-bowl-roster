<script lang="ts">
    import { customisationRules } from '../../customisation/customisation.store';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';
    import CurrentAdvancementList from '../playerAdvancement/currentAdvancementList.svelte';
    import SelectAdvancement from '../playerAdvancement/selectAdvancement.svelte';
    import RmrrCurrentAdvancement from './rmrrCurrentAdvancement.svelte';
    import RmrrSelectAdvancement from './rmrrSelectAdvancement.svelte';

    export let index: number;
    let rosterPlayer: RosterPlayerRecord;
    $: rosterPlayer = $roster.players[index];

    $: skillStackingAllowed = !$customisationRules?.allowances?.noSkillStacking;

    $: isRinger = rosterPlayer?.player?.id === 199;
    $: advancementCount = rosterPlayer?.alterations?.advancements || 0;
</script>

{#if isRinger && advancementCount < 6}
    <RmrrCurrentAdvancement {rosterPlayer} {index} />
    <RmrrSelectAdvancement {rosterPlayer} {index} />
{/if}

{#if !isRinger && ((skillStackingAllowed && advancementCount < 6) || !rosterPlayer.alterations?.advancements)}
    <CurrentAdvancementList {rosterPlayer} {index} />
    <SelectAdvancement {rosterPlayer} {index} />
{/if}
