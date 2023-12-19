<script lang="ts">
    import { onMount } from 'svelte';
    import {
        advancementCostsMap,
        sevensExtraSkillTax,
        skillIncreaseCost,
    } from '../../data/advancementCost.data';
    import {
        characteristicCostIncrease,
        characteristicIndex,
        characteristics,
        type CharacteristicType,
    } from '../../data/statOrder.data';
    import {
        getSkillType,
        guessSpecificAdvancements,
    } from '../../helpers/advancementOrder';
    import type {
        RosterPlayerRecord,
        SpecificAdvancement,
    } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';
    import AdvancementEntry from './advancementEntry.svelte';

    export let index: number;
    export let rosterPlayer: RosterPlayerRecord;

    let showDisclaimer = false;

    onMount(() => {
        if (
            (rosterPlayer.alterations?.extraSkills?.length > 0 ||
                rosterPlayer.alterations?.statChange?.findIndex(
                    (x) => x !== 0
                ) > -1) &&
            !rosterPlayer.alterations?.specificAdvancements
        ) {
            if ($roster.format === 'sevens') {
                sevensAdvancements();
                return;
            }
            try {
                const specificAdvancements =
                    guessSpecificAdvancements(rosterPlayer);
                roster.updatePlayer(
                    {
                        ...rosterPlayer,
                        alterations: {
                            ...rosterPlayer.alterations,
                            specificAdvancements,
                        },
                    },
                    index
                );
                showDisclaimer = true;
            } catch (error) {}
        }
    });

    function sevensAdvancements() {
        const specificAdvancements: SpecificAdvancement[] = [];
        if (rosterPlayer.alterations?.extraSkills?.length > 0) {
            rosterPlayer.alterations.extraSkills.forEach((skill) => {
                specificAdvancements.push({
                    type: `${getSkillType(skill, rosterPlayer.player)}random`,
                    advancementValue: skill,
                    sppCost: skillIncreaseCost[skill],
                });
            });
        }
        roster.updatePlayer(
            {
                ...rosterPlayer,
                alterations: {
                    ...rosterPlayer.alterations,
                    specificAdvancements,
                },
            },
            index
        );
        showDisclaimer = true;
    }

    function deleteSpecificAdvancement(advancementIndex) {
        const advancement =
            rosterPlayer.alterations.specificAdvancements[advancementIndex];
        const startingSpp = currentSppCost(
            rosterPlayer.alterations.specificAdvancements
        );
        let advancementCost =
            advancement.type === 'characteristic'
                ? characteristicCostIncrease[
                      characteristicIndex(
                          advancement.advancementValue as CharacteristicType
                      )
                  ]
                : skillIncreaseCost[advancement.type];
        if (
            $roster.format === 'sevens' &&
            advancement.type !== 'characteristic' &&
            rosterPlayer.alterations.specificAdvancements.length > 1
        ) {
            advancementCost = advancementCost + sevensExtraSkillTax;
        }
        const newSpecificAdvancements =
            rosterPlayer.alterations.specificAdvancements.filter(
                (_, i) => i !== advancementIndex
            );
        const recalculatedSppInAdvancements = newSpecificAdvancements.map(
            (advancement, i) => ({
                ...advancement,
                sppCost: advancementCostsMap[advancement.type][i],
            })
        );
        const endingSpp = currentSppCost(recalculatedSppInAdvancements);
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
                specificAdvancements: recalculatedSppInAdvancements,
                spp: rosterPlayer.alterations.spp + startingSpp - endingSpp,
                statChange,
                valueChange:
                    rosterPlayer.alterations.valueChange - advancementCost,
            },
        };
        roster.updatePlayer(newPlayer, index);
    }

    /**
     * The current spp cost of the player's specific advancements
     */
    function currentSppCost(advancements: SpecificAdvancement[]) {
        return advancements.reduce((acc, cur) => acc + cur.sppCost, 0);
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
