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
    import type { StarPlayer } from '../../models/player.model';
    import { customisationRules } from '../../customisation/customisation.store';
    import { starPlayers } from '../../data/starPlayer.data';
    import { playerIsMegaStar } from '../../customisation/customisationHelpers';

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
    //   CHAOS CUP
    $: starPlayerCost = $customisationRules?.starPlayerSettings?.starPlayerCost;
    $: sppText = rosterPlayer?.starPlayer
        ? getSppForPlayer(starPlayerCost)
        : rosterPlayer?.alterations?.spp * -1 || '-';

    $: cici = rosterPlayer.player.id === 402 || rosterPlayer.player.id === 403;
    $: otherCici = cici
        ? starPlayers.starPlayers.find((p) => {
              const otherId = rosterPlayer.player.id === 402 ? 403 : 402;
              return p.id === otherId;
          })
        : null;

    function getSppForPlayer(starPlayerCost?: {
        star: number;
        megaStar: number;
    }) {
        const starPlayer = rosterPlayer.player as StarPlayer;
        const isMegaStar = playerIsMegaStar($customisationRules, starPlayer);

        if (!!starPlayer?.twoForOne && starPlayer.twoForOne < starPlayer.id) {
            return '-';
        }
        if (isMegaStar) {
            return starPlayerCost?.megaStar || '-';
        } else {
            return starPlayerCost?.star || '-';
        }
    }

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
                    text: sppText,
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
    const propsForOtherCici = (
        column: TableColumnName | CharacteristicType
    ) => {
        if (characteristics.includes(column as CharacteristicType)) {
            return {
                rosterPlayer: { player: otherCici },
                charIndex: characteristics.indexOf(
                    column as CharacteristicType
                ),
            };
        }
        return (
            {
                Skills: {
                    playerSkillIds: otherCici?.skills,
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
                    text: '-',
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
                Name: {
                    text: otherCici?.position,
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

{#if otherCici}
    <tr>
        {#each $filteredTableColumns as c}
            <td class={c.rowDetails?.tdClass}>
                {#if c.name === 'Name'}
                    {otherCici?.position}
                {:else if c.rowDetails?.component}
                    <svelte:component
                        this={c.rowDetails?.component}
                        {...propsForOtherCici(c.name)}
                    />
                {/if}
            </td>
        {/each}
    </tr>
{/if}

<style>
    .no-wrap {
        white-space: nowrap;
    }
</style>
