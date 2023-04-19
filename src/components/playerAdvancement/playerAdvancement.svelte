<script lang="ts">
    import { blurOnEscapeOrEnter } from '../../helpers/blurOnEscapeOrEnter';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';
    import CurrentAdvancementList from './currentAdvancementList.svelte';

    import SelectAdvancement from './selectAdvancement.svelte';

    export let index: number;
    export let rosterPlayer: RosterPlayerRecord;
</script>

{#if $roster.format !== 'sevens' && $roster.players[index]?.alterations?.spp !== undefined}
    <label
        ><span class="mini-title">SPP:</span>
        <input
            class="spp-input"
            type="number"
            placeholder="?"
            inputmode="numeric"
            use:blurOnEscapeOrEnter
            bind:value={$roster.players[index].alterations.spp}
        />
    </label>
{/if}
<CurrentAdvancementList {rosterPlayer} {index} />

{#if !(rosterPlayer.alterations?.advancements >= 6)}
    <SelectAdvancement {rosterPlayer} {index} />
{/if}

<style lang="scss">
    .spp-input {
        width: 60px;
        margin-bottom: 12px;
        margin-left: 4px;
    }
</style>
