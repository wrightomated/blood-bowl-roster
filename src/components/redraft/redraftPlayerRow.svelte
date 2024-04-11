<script lang="ts">
    import {
        characteristics,
        type CharacteristicType,
    } from '../../data/statOrder.data';
    import { formatNumberInThousands } from '../../helpers/formatTotalToThousands';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import type { TableColumnName } from '../../models/rosterTableColumns.model';
    import { redraftTableColumns } from '../../store/filteredTableColumns.store';

    export let rosterPlayer: RosterPlayerRecord;

    $: hireCost =
        rosterPlayer.player.cost +
        (rosterPlayer.alterations?.valueChange || 0) +
        (rosterPlayer.alterations?.seasonsPlayed || 1) * 20;

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
                Name: {
                    text: rosterPlayer?.playerName || '',
                },
                Number: {
                    text: rosterPlayer?.alterations?.playerNumber || '',
                },
                Position: {
                    text: rosterPlayer?.player?.position || '',
                },
                Skills: {
                    playerSkillIds: rosterPlayer?.player?.skills,
                    extraSkillIds: rosterPlayer?.alterations?.extraSkills || [],
                },
                Spp: {
                    text: rosterPlayer?.alterations?.spp || 0,
                },
                NI: {
                    text: rosterPlayer?.alterations?.ni || 0,
                },
                TR: {
                    text: rosterPlayer?.alterations?.tr ? 'yes' : 'no',
                },
                Seasons: {
                    text: rosterPlayer?.alterations?.seasonsPlayed || 1,
                },
                Cost: {
                    text: formatNumberInThousands(hireCost),
                },
                Redraft: {
                    text: 'Button',
                },
            }[column] || {}
        );
    };
</script>

<tr>
    {#each $redraftTableColumns as c}
        <td class={c.rowDetails?.tdClass}>
            {#if c.rowDetails?.component}
                <svelte:component
                    this={c.rowDetails?.redraftComponent ||
                        c.rowDetails?.component}
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
