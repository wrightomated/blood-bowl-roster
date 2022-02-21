<script lang="ts">
    import { roster } from '../../store/teamRoster.store';
    import AddSkill from '../addSkill.svelte';
    import { characteristics } from '../../data/statOrder.data';
    import { showSkillButtons } from '../../store/showSkillButtons.store';
    import { filteredTableColumns } from '../../store/filteredTableColumns.store';
    import type { TableColumnName } from '../../models/rosterTableColumns.model';

    export let index: number;

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

    const propsForComponent = (column: TableColumnName) => {
        if (characteristics.includes(column)) {
            return {
                index,
                charIndex: characteristics.indexOf(column),
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
                            ? `${rosterPlayer.player.cost},000`
                            : '-',
                },
                'Current Value': {
                    text: `${currentCost}${currentCost > 0 ? ',000' : ''}`,
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
</style>
