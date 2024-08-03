<script lang="ts">
    import { _ } from 'svelte-i18n';
    import {
        type AdvancementCombination,
        type AdvancementType,
    } from '../../data/advancementCost.data';
    import type { SpecificAdvancement } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';
    import MaterialButton from '../uiComponents/materialButton.svelte';
    import {
        characteristicCostIncrease,
        characteristicIndex,
        type CharacteristicType,
    } from '../../data/statOrder.data';
    import { formatNumberInThousands } from '../../helpers/formatTotalToThousands';

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
    $: advancementCost =
        advancement.type === 'characteristic'
            ? characteristicCostIncrease[
                  characteristicIndex(
                      advancement.advancementValue as CharacteristicType
                  )
              ]
            : 20;

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
    {#if advancementDetails.type !== 'characteristic'}
        <input
            type="color"
            aria-label={`Select colour for ${advancementValue}`}
            bind:value={$roster.config.customSkillColour[
                +advancement.advancementValue
            ]}
        />
    {/if}
</div>
<div class="advancement-details">
    {advancementDetails.type}
    {#if advancementDetails.isRandom}
        <i class="material-symbols-outlined no-transition"> casino </i>
    {/if}
    <!-- hide for sevens -->
    {#if $roster.format !== 'sevens'}
        <span class="advancement-details__spp"
            >{formatNumberInThousands(advancementCost)}</span
        >
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
    input[type='color'] {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: none;
        border: 0;
        cursor: pointer;
        height: 1.5rem;
        padding: 0;
        width: 1.5rem;
        vertical-align: middle;
        transition: scale 0.2s ease-in-out;
        &:hover {
            scale: 1.1;
        }
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
    }
</style>
