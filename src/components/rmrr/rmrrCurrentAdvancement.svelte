<script lang="ts">
    import { onMount } from 'svelte';
    import { characteristics } from '../../data/statOrder.data';
    import type {
        RosterPlayerRecord,
        SpecificAdvancement,
    } from '../../models/roster.model';
    import { currentTeam } from '../../store/currentTeam.store';
    import { roster } from '../../store/teamRoster.store';
    import { getRingerBudget, getRingerCost } from './helperFunctions';
    import RmrrAdvancementEntry from './rmrrAdvancementEntry.svelte';

    export let index: number;
    export let rosterPlayer: RosterPlayerRecord;

    $: isRinger = rosterPlayer?.player?.id === 199;

    let showDisclaimer = false;

    onMount(() => {
        if (
            (rosterPlayer.alterations?.extraSkills?.length > 0 ||
                rosterPlayer.alterations?.statChange?.findIndex(
                    (x) => x !== 0
                ) > -1) &&
            !rosterPlayer.alterations?.specificAdvancements
        ) {
            try {
                // const specificAdvancements = rosterPlayer.alterations?.statChange
                //     ? rosterPlayer.alterations.statChange
                //           .map((stat, i) =>
                //               stat > 0
                //                   ? {
                //                         type: 'characteristic',
                //                         sppCost: 0,
                //                         advancementValue: characteristics[i],
                //                     }
                //                   : null
                //           )
                //           .filter((x) => x)
                //     : [];

                let specificAdvancements: SpecificAdvancement[] = [];
                if (rosterPlayer.alterations?.extraSkills?.length > 0) {
                    specificAdvancements =
                        rosterPlayer.alterations.extraSkills.map((skill) => ({
                            type: 'primaryselect',
                            advancementValue: skill,
                            sppCost: 6,
                        }));
                }
                rosterPlayer.alterations.statChange.forEach((stat, i) => {
                    for (let j = 0; j < stat; j++) {
                        specificAdvancements.push({
                            type: 'characteristic',
                            sppCost: 0,
                            advancementValue: characteristics[i],
                        });
                    }
                });
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

    function deleteSpecificAdvancement(advancementIndex) {
        const advancement =
            rosterPlayer.alterations.specificAdvancements[advancementIndex];
        // let advancementCost =
        //     advancement.type === 'characteristic'
        //         ? characteristicCostIncrease[
        //               characteristicIndex(
        //                   advancement.advancementValue as CharacteristicType
        //               )
        //           ]
        //         : 20;

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
            },
        };
        roster.updatePlayer(newPlayer, index);
    }
</script>

<div class="advancement-list">
    {#if isRinger}
        <p>
            <span class="mini-title">Ringer Budget:</span>
            {getRingerCost(rosterPlayer)}k / {getRingerBudget(
                $currentTeam.tier
            )}k
        </p>
    {/if}
    {#if !!rosterPlayer.alterations?.specificAdvancements}
        {#each rosterPlayer.alterations?.specificAdvancements as advancement, i (i)}
            <div class="advancement-entry">
                <RmrrAdvancementEntry
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
