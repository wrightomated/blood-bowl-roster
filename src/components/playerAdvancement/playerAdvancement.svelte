<script lang="ts">
    import { blurOnEscapeOrEnter } from '../../helpers/blurOnEscapeOrEnter';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';
    import CurrentAdvancementList from './currentAdvancementList.svelte';

    import SelectAdvancement from './selectAdvancement.svelte';

    export let index: number;
    let rosterPlayer: RosterPlayerRecord;
    $: rosterPlayer = $roster.players[index];
</script>

<CurrentAdvancementList {rosterPlayer} {index} />

{#if !(rosterPlayer.alterations?.advancements >= 6)}
    <SelectAdvancement {rosterPlayer} {index} />
{/if}
