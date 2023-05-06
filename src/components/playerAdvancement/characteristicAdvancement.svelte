<script lang="ts">
    import {
        characteristicCostIncrease,
        characteristics,
        CharacteristicType,
    } from '../../data/statOrder.data';
    import type {
        RosterPlayerRecord,
        SpecificAdvancement,
    } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';
    import Die from '../dice/die.svelte';
    import Button from '../uiComponents/button.svelte';

    export let index: number;
    export let rosterPlayer: RosterPlayerRecord;
    export let sppCost: number;

    let enabled = characteristics;

    function rolled(event) {
        const roll = event.detail.result;
        enabled = {
            1: ['MA', 'AV'],
            2: ['MA', 'AV'],
            3: ['MA', 'AV'],
            4: ['MA', 'AV'],
            5: ['MA', 'AV'],
            6: ['MA', 'AV'],
            7: ['MA', 'AV'],
            8: ['MA', 'PA', 'AV'],
            9: ['MA', 'PA', 'AV'],
            10: ['MA', 'PA', 'AV'],
            11: ['MA', 'PA', 'AV'],
            12: ['MA', 'PA', 'AV'],
            13: ['MA', 'PA', 'AV'],
            14: ['AG', 'PA'],
            15: ['ST', 'AG'],
            16: characteristics,
        }[roll];
    }

    function addCharacteristic(
        charIndex: number,
        advancementValue: CharacteristicType
    ) {
        const statChange = rosterPlayer.alterations.statChange || [
            0, 0, 0, 0, 0,
        ];
        statChange[charIndex]++;
        const specificAdvancement: SpecificAdvancement = {
            type: 'characteristic',
            sppCost,
            advancementValue,
        };
        const newPlayer: RosterPlayerRecord = {
            ...rosterPlayer,
            alterations: {
                ...rosterPlayer.alterations,
                statChange,
                spp: rosterPlayer.alterations.spp - sppCost,
                advancements: (rosterPlayer.alterations?.advancements || 0) + 1,
                valueChange:
                    (rosterPlayer.alterations?.valueChange || 0) +
                    characteristicCostIncrease[charIndex],
                specificAdvancements: rosterPlayer.alterations
                    ?.specificAdvancements
                    ? rosterPlayer.alterations.specificAdvancements.concat([
                          specificAdvancement,
                      ])
                    : [specificAdvancement],
            },
        };
        roster.updatePlayer(newPlayer, index);
    }
</script>

<fieldset>
    <legend> Characteristic - {sppCost} SPP </legend>

    <Die faces={16} on:rolled={rolled} />
    {#each characteristics as chara, i}
        <Button
            disabled={!enabled.includes(chara)}
            clickFunction={() => addCharacteristic(i, chara)}>{chara}</Button
        >
    {/each}
</fieldset>

<style lang="scss">
    fieldset {
        border-radius: 12px;
        border: 2px solid;
        border-color: var(--secondary-colour);
        margin-top: 1em;
        legend {
            color: var(--secondary-colour);
        }
    }
</style>
