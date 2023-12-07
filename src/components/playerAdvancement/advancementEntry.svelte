<script lang="ts">
    import { _ } from 'svelte-i18n';
    import type {
        AdvancementCombination,
        AdvancementType,
    } from '../../data/advancementCost.data';
    import type { SpecificAdvancement } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';
    import MaterialButton from '../uiComponents/materialButton.svelte';

    export let advancement: SpecificAdvancement;
    export let deleteFunction: () => void;

    $: advancementValue = !isNaN(+advancement.advancementValue)
        ? $_(`skills.${advancement.advancementValue}`)
        : advancement.advancementValue;

    let advancementDetails: {
        type: AdvancementType;
        isRandom: boolean;
    };
    $: advancementDetails = {
        type: advancementCombinationToType(advancement.type),
        isRandom: advancement.type.includes('random'),
    };

    function advancementCombinationToType(
        combination: AdvancementCombination
    ): AdvancementType {
        return combination === 'characteristic'
            ? 'characteristic'
            : (combination.slice(0, -6) as AdvancementType);
    }
</script>

<div>
    {advancementValue}
</div>
<div class="advancement-details">
    {advancementDetails.type}
    {#if advancementDetails.isRandom}
        <i class="material-symbols-outlined no-transition"> casino </i>
    {/if}
    <!-- hide for sevens -->
    {#if $roster.format !== 'sevens'}
        <span class="advancement-details__spp">{advancement.sppCost} SPP</span>
    {/if}
</div>
<!-- <div> -->
<div class="advancement-controls">
    <MaterialButton
        hoverText="Remove advancement"
        symbol="delete"
        clickFunction={deleteFunction}
    />
</div>

<!-- </div> -->
<style lang="scss">
    div {
        flex: 1;
    }
    .advancement-controls {
        display: flex;
        justify-content: flex-end;
    }
    .advancement-details {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 4px;
        align-items: center;
        text-transform: capitalize;
        &__spp {
            font-family: var(--display-font);
            white-space: nowrap;
        }
        /* text-align: center; */
    }
</style>
