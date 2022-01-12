<script lang="ts">
    import { roster } from '../../store/teamRoster.store';
    import MaterialButton from '../uiComponents/materialButton.svelte';
    import SkillElement from '../skillElement.svelte';
    import { currentTeam } from '../../store/currentTeam.store';
    import type { StarPlayer } from '../../models/player.model';
    import AddSkill from '../addSkill.svelte';
    import {
        characteristicMaxValue,
        characteristicMinValue,
    } from '../../data/statOrder.data';
    import { showSkillButtons } from '../../store/showSkillButtons.store';
    import { blurOnEscapeOrEnter } from '../../helpers/blurOnEscapeOrEnter';
    import { filteredTableColumns } from '../../store/filteredTableColumns.store';
    import PlayerNumber from './playerNumber.svelte';
    import type { TableColumnName } from '../../models/rosterTableColumns.model';

    export let index: number;

    $: rosterPlayer = $roster.players[index];

    $: playerSkillIds = rosterPlayer.player.skills
        .filter((x) => ($roster.format === 'dungeon bowl' ? x : x))
        .concat(rosterPlayer?.alterations?.extraSkills || []);
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
    $: alteredStats = characteristicMaxValue.map(
        (_, i) =>
            (rosterPlayer?.alterations?.statChange?.[i] || 0) -
            (rosterPlayer?.alterations?.injuries?.[i] || 0)
    );

    const propsForComponent = (column: TableColumnName) => {
        return {}[column] || { index };
    };

    const getStat = (stat: number, i: number) => {
        const alteredStat =
            stat +
            (rosterPlayer?.alterations?.statChange?.[i] || 0) *
                (i === 2 || i === 3 ? -1 : 1) -
            (rosterPlayer?.alterations?.injuries?.[i] || 0) *
                (i === 2 || i === 3 ? -1 : 1);
        const boundedStat = stat === 0 ? 0 : getBoundedStat(alteredStat, i);
        return `${
            boundedStat === 0 ? '-' : i > 1 ? `${boundedStat}+` : boundedStat
        }`;
    };

    const getBoundedStat = (alt: number, i: number) => {
        switch (i) {
            case 2:
            case 3:
                return alt > characteristicMinValue[i]
                    ? characteristicMinValue[i]
                    : alt < characteristicMaxValue[i]
                    ? characteristicMaxValue[i]
                    : alt;
            default:
                return alt < characteristicMinValue[i]
                    ? characteristicMinValue[i]
                    : alt > characteristicMaxValue[i]
                    ? characteristicMaxValue[i]
                    : alt;
        }
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

<tr>
    <td>
        <PlayerNumber {index} />
    </td>
    <td class="player-name left-align" />
    <td class="controls left-align" />
    <td class="player-position left-align" />

    {#each rosterPlayer.player.playerStats as stat, i}
        <td
            class:improved={alteredStats[i] > 0}
            class:degraded={alteredStats[i] < 0}>{getStat(stat, i)}</td
        >
    {/each}
    <td class="left-align">
        <SkillElement {playerSkillIds} />
    </td>
    <td
        >{rosterPlayer.player.cost > 0 && !rosterPlayer?.alterations?.journeyman
            ? `${rosterPlayer.player.cost},000`
            : '-'}</td
    >
    {#if $roster.format !== 'sevens'}
        <td>
            {#if $roster.players[index]?.alterations?.spp !== undefined}
                <input
                    class="spp-input"
                    type="number"
                    aria-labelledby="spp-header"
                    placeholder="?"
                    use:blurOnEscapeOrEnter
                    bind:value={$roster.players[index].alterations.spp}
                />
            {:else}0{/if}
        </td>
    {/if}
    {#if $roster.mode !== 'exhibition' && !rosterPlayer.starPlayer}
        <td
            ><input
                type="checkbox"
                aria-labelledby="mng-header"
                bind:checked={$roster.players[index].alterations.mng}
            /></td
        >
        {#if $roster.format !== 'sevens'}
            <td>
                <input
                    class="spp-input"
                    type="number"
                    aria-label="Niggling Injuries"
                    placeholder="?"
                    bind:value={$roster.players[index].alterations.ni}
                />
            </td>

            <td
                ><input
                    type="checkbox"
                    aria-labelledby="tr-header"
                    use:blurOnEscapeOrEnter
                    bind:checked={$roster.players[index].alterations.tr}
                /></td
            >
        {/if}
    {:else if $roster.mode !== 'exhibition' && rosterPlayer.starPlayer}
        <td>-</td>
        <td>-</td>
        <td>-</td>
    {/if}

    <td>{currentCost}{currentCost > 0 ? ',000' : ''}</td>
</tr>
{#if !rosterPlayer.starPlayer && $showSkillButtons[index]}
    <tr>
        <td colspan="16">
            <AddSkill {index} />
        </td>
    </tr>
{/if}

<style lang="scss">
    input {
        border: 0;
        border-radius: 0;
        background: none;

        @media screen and (max-width: 450px) {
            font-size: 16px;
        }
    }
    td {
        input {
            margin-bottom: 0;
        }
    }
    .left-align {
        text-align: left;
    }
    .flex-container {
        display: flex;
    }
    .danger {
        color: var(--main-colour);
        i {
            vertical-align: text-bottom;
        }
    }
    .add-skill {
        vertical-align: middle;
        display: inline-block;
        margin-top: -1px;
    }
    .spp-input {
        width: 60px;
        text-align: center;
        margin-right: -15px;
    }

    .improved {
        color: green;
    }
    .degraded {
        color: var(--main-colour);
    }
    @media print {
        .flex-container {
            display: none;
        }
        .player-name {
            border-right: 0;
        }
        .controls {
            border-left: 0;
        }
        .add-skill {
            display: none;
        }
    }
</style>
