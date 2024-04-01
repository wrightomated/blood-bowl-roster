<script lang="ts">
    import { roster } from '../../store/teamRoster.store';
    import {
        characteristics,
        type CharacteristicType,
    } from '../../data/statOrder.data';
    import { filteredTableColumns } from '../../store/filteredTableColumns.store';
    import type { TableColumnName } from '../../models/rosterTableColumns.model';
    import { formatNumberInThousands } from '../../helpers/formatTotalToThousands';
    import type { RosterPlayerRecord } from '../../models/roster.model';

    export let index: number;
    let rosterPlayer: RosterPlayerRecord;
    $: rosterPlayer = $roster.players[index];

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
                Spp: {
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

<style>
    .no-wrap {
        white-space: nowrap;
    }
</style>
