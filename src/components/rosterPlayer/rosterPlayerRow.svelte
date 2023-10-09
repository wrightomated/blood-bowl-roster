<script lang="ts">
    import { roster } from '../../store/teamRoster.store';
    import AddSkill from '../addSkill.svelte';
    import {
        characteristics,
        type CharacteristicType,
    } from '../../data/statOrder.data';
    import { showSkillButtons } from '../../store/showSkillButtons.store';
    import { filteredTableColumns } from '../../store/filteredTableColumns.store';
    import type { TableColumnName } from '../../models/rosterTableColumns.model';
    import { formatNumberInThousands } from '../../helpers/formatTotalToThousands';
    import type { RosterPlayerRecord } from '../../models/roster.model';

    // export let index: number;
    export let rosterPlayer: RosterPlayerRecord;

    $: index = $roster.players.findIndex(
        (p) => p?.playerId === rosterPlayer?.playerId
    );

    $: currentCost =
        rosterPlayer?.alterations?.mng || rosterPlayer?.alterations?.tr
            ? 0
            : ((rosterPlayer.player.id === 56 ||
                  rosterPlayer.player.id === 73) &&
              $roster.mode !== 'exhibition' &&
              $roster.format !== 'dungeon bowl'
                  ? 0
                  : rosterPlayer.player.cost) +
              (rosterPlayer.alterations?.valueChange || 0);

    const propsForComponent = (
        column: TableColumnName | CharacteristicType
    ) => {
        if (characteristics.includes(column as CharacteristicType)) {
            return {
                rosterPlayer,
                charIndex: characteristics.indexOf(
                    column as CharacteristicType
                ),
            };
        }
        return (
            {
                Skills: {
                    playerSkillIds: rosterPlayer?.player?.skills,
                    extraSkillIds: rosterPlayer?.alterations?.extraSkills || [],
                    cyData: `player-${index}-skills`,
                },
                'Hiring Fee': {
                    text:
                        rosterPlayer.player.cost > 0 &&
                        !rosterPlayer?.alterations?.journeyman
                            ? `${formatNumberInThousands(
                                  rosterPlayer.player.cost
                              )}`
                            : '-',
                },
                'Current Value': {
                    text: `${formatNumberInThousands(currentCost)}`,
                },
                'Unspent Spp': {
                    index,
                    alteration: 'spp',
                },
                NI: {
                    index,
                    alteration: 'ni',
                },
                MNG: {
                    index,
                    alteration: 'mng',
                },
                TR: {
                    index,
                    alteration: 'tr',
                },
            }[column] || { index }
        );
    };
</script>

<tr>
    {#each $filteredTableColumns as c}
        <td class={c.rowDetails?.tdClass}>
            {#if c.rowDetails?.component}
                <svelte:component
                    this={c.rowDetails?.component}
                    {...propsForComponent(c.name)}
                />
            {/if}
        </td>
    {/each}
</tr>
{#if !rosterPlayer.starPlayer && $showSkillButtons[index]}
    <tr>
        <td colspan="16">
            <AddSkill {index} />
        </td>
    </tr>
{/if}

<style>
    .left-align {
        text-align: left;
    }
    .no-wrap {
        white-space: nowrap;
    }
</style>
