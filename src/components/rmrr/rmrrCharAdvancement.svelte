<script lang="ts">
    import {
        characteristicCostIncrease,
        characteristics,
        type CharacteristicType,
    } from '../../data/statOrder.data';
    import type {
        RosterPlayerRecord,
        SpecificAdvancement,
    } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';
    import Button from '../uiComponents/button.svelte';

    export let index: number;
    export let rosterPlayer: RosterPlayerRecord;
    export let sppCost: number;

    $: enabled = characteristics.map((chara, i) => {
        return (
            rosterPlayer.alterations.specificAdvancements.filter(
                (advancement) =>
                    advancement.type === 'characteristic' &&
                    advancement.advancementValue === chara
            ).length < 2
        );
    });

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
    <legend> Characteristic </legend>

    {#each characteristics as chara, i}
        <Button
            disabled={!enabled[i]}
            clickFunction={() => addCharacteristic(i, chara)}
            >{chara} {characteristicCostIncrease[i]}k</Button
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
