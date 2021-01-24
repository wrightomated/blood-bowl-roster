<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import MaterialButton from './materialButton.svelte';
    import SkillElement from './skillElement.svelte';
    import { currentTeam } from '../store/currentTeam.store';
    import type { StarPlayer } from '../models/player.model';
    import AddSkill from './addSkill.svelte';
    import { rosterMode } from '../store/rosterMode.store';

    export let index: number;

    let showAddSkills: boolean = false;

    $: rosterPlayer = $roster.players[index];
    $: numberOfPlayerType = $roster.players.filter(
        (x) => x.player.id === rosterPlayer.player.id,
    ).length;
    $: maxOfPlayerType =
        $currentTeam.players.find((x) => x.id === rosterPlayer.player.id)
            ?.max || 0;
    $: danger = numberOfPlayerType > maxOfPlayerType;
    $: playerSkillIds = rosterPlayer.player.skills.concat(
        rosterPlayer.alterations?.extraSkills || [],
    );

    const removePlayer = () => {
        removeTwoForOne() || roster.removePlayer([index]);
    };
    const moveUp = () => {
        roster.movePlayerUp(index);
    };
    const moveDown = () => {
        roster.movePlayerDown(index);
    };
    const playerCostString = (currentValue: boolean = false) => {
        return rosterPlayer.player.cost > 0
            ? `${
                  rosterPlayer.player.cost +
                  (currentValue
                      ? rosterPlayer.alterations?.valueChange || 0
                      : 0)
              },000`
            : '-';
    };
    const removeTwoForOne = () => {
        if (rosterPlayer.starPlayer) {
            const twoForOne = (rosterPlayer.player as StarPlayer).twoForOne;
            const tfoIndex = $roster.players.findIndex(
                (p) => p.player.id === twoForOne,
            );
            if (twoForOne) {
                roster.removePlayer([index, tfoIndex]);
                return true;
            }
        }
        return false;
    };

    const toggleShowSkills = () => {
        showAddSkills = !showAddSkills;
    };

    const getStat = (stat: number, i: number) => {
        const alteredStat =
            stat +
            (rosterPlayer.alterations?.statChange?.[i] || 0) *
                (i === 2 || i === 3 ? -1 : 1);
        return `${
            alteredStat === 0 ? '-' : i > 1 ? `${alteredStat}+` : alteredStat
        }`;
    };
</script>

<tr>
    <td>{index + 1}</td>
    <td class="player-name left-align">
        {#if rosterPlayer.starPlayer}
            {rosterPlayer.player.position}
        {:else}
            <input
                aria-labelledby="name-header"
                placeholder="Player Name"
                bind:value={$roster.players[index].playerName}
            />
        {/if}
    </td>
    <td class="controls left-align">
        <div class="flex-container">
            {#if index > 0}
                <MaterialButton
                    symbol="arrow_circle_up"
                    clickFunction={moveUp}
                />
            {/if}
            {#if index < $roster.players.length - 1}
                <MaterialButton
                    symbol="arrow_circle_down"
                    clickFunction={moveDown}
                />
            {/if}
            <MaterialButton
                symbol="delete_forever"
                clickFunction={removePlayer}
            />
        </div>
    </td>
    <td class="player-position left-align">
        {#if rosterPlayer.starPlayer}
            Star Player
        {:else}
            {rosterPlayer.player.position}
            {#if danger}
                <span class="danger">
                    <i class="material-icons">warning</i>
                    {numberOfPlayerType}/{maxOfPlayerType}
                </span>
            {/if}
            {#if $rosterMode !== 'league' && (rosterPlayer.alterations?.advancements || 0) < 6}
                <span class="add-skill">
                    <MaterialButton
                        symbol="elevator"
                        clickFunction={toggleShowSkills}
                    />
                </span>
            {/if}
        {/if}
    </td>

    {#each rosterPlayer.player.playerStats as stat, i}
        <td class:improved={rosterPlayer.alterations?.statChange?.[i] > 0}
            >{getStat(stat, i)}</td
        >
    {/each}
    <td class="left-align">
        <SkillElement {playerSkillIds} />
    </td>
    <td>{playerCostString()}</td>
    <td>
        {#if $roster.players[index]?.alterations?.spp !== undefined}
            <input
                class="spp-input"
                type="number"
                aria-labelledby="spp-header"
                placeholder="?"
                bind:value={$roster.players[index].alterations.spp}
            />
        {:else}0{/if}
    </td>
    {#if $rosterMode === 'postGame'}
        <td>0</td>
        <td>0</td>
        <td>0</td>
    {/if}

    <td>{playerCostString(true)}</td>
</tr>
{#if !rosterPlayer.starPlayer && showAddSkills && (rosterPlayer.alterations?.advancements || 0) < 6}
    <tr>
        <td colspan="16">
            <AddSkill {index} />
        </td>
    </tr>
{/if}

<style lang="scss">
    @import '../styles/colour';
    input {
        border: 0;
        border-radius: 0;
        background: none;
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
        color: $main-colour;
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
