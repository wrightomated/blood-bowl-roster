<script lang="ts">
    import {
        characteristicCostIncrease,
        characteristicIndex,
        characteristics,
        type CharacteristicType,
    } from '../../data/statOrder.data';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';
    import AdvancementEntry from '../playerAdvancement/advancementEntry.svelte';

    export let index: number;
    export let rosterPlayer: RosterPlayerRecord;

    let showDisclaimer = false;

    function deleteSpecificAdvancement(advancementIndex) {
        const advancement =
            rosterPlayer.alterations.specificAdvancements[advancementIndex];
        let advancementCost =
            advancement.type === 'characteristic'
                ? characteristicCostIncrease[
                      characteristicIndex(
                          advancement.advancementValue as CharacteristicType
                      )
                  ]
                : 20;

        const newSpecificAdvancements =
            rosterPlayer.alterations.specificAdvancements.filter(
                (_, i) => i !== advancementIndex
            );

        const extraSkills = rosterPlayer.alterations?.extraSkills
            ? rosterPlayer.alterations.extraSkills.filter(
                  (skill) =>
                      skill !==
                      rosterPlayer.alterations.specificAdvancements[
                          advancementIndex
                      ]?.advancementValue
              )
            : [];
        const statChange = rosterPlayer.alterations?.statChange
            ? rosterPlayer.alterations.statChange.map(
                  (stat, i) =>
                      stat -
                      (rosterPlayer.alterations.specificAdvancements[
                          advancementIndex
                      ]?.advancementValue === characteristics[i]
                          ? 1
                          : 0)
              )
            : [0, 0, 0, 0, 0];
        const newPlayer: RosterPlayerRecord = {
            ...rosterPlayer,
            alterations: {
                ...rosterPlayer.alterations,
                advancements: rosterPlayer.alterations.advancements - 1,
                extraSkills,
                specificAdvancements: newSpecificAdvancements,
                statChange,
                valueChange:
                    rosterPlayer.alterations.valueChange - advancementCost,
            },
        };
        roster.updatePlayer(newPlayer, index);
    }
</script>

<div class="advancement-list">
    {#if showDisclaimer}
        <p>
            These advancements were added before the order and selection types
            were recorded. The sequence has been inferred.
        </p>
    {/if}
    {#if !!rosterPlayer.alterations?.specificAdvancements}
        {#each rosterPlayer.alterations?.specificAdvancements as advancement, i (i)}
            <div class="advancement-entry">
                <AdvancementEntry
                    {advancement}
                    deleteFunction={() => deleteSpecificAdvancement(i)}
                />
            </div>
        {/each}
    {/if}
</div>

<style lang="scss">
    .advancement-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 12px;
    }
    .advancement-entry {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: var(--secondary-background-colour);
        border-radius: 8px;
        padding: 8px;
        align-items: center;
        justify-content: space-between;
    }
</style>
