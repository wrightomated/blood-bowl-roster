<script lang="ts">
    import type { Player } from '../models/player.model';
    import { roster } from '../store/teamRoster.store';
    import MaterialButton from './materialButton.svelte';
    import SkillElement from './skillElement.svelte';
    import { currentTeam } from '../store/currentTeam.store';
    export let index: number;
    export let player: Player;

    $: numberOfPlayerType = $roster.players.filter(
        (x) => x.player.id === player.id,
    ).length;
    $: maxOfPlayerType =
        $currentTeam.players.find((x) => x.id === player.id)?.max || 0;
    $: danger = numberOfPlayerType > maxOfPlayerType;

    const removePlayer = () => {
        roster.removePlayer(index);
    };
    const moveUp = () => {
        roster.movePlayerUp(index);
    };
    const moveDown = () => {
        roster.movePlayerDown(index);
    };
    const playerCostString = () => {
        return player.cost > 0 ? `${player.cost},000` : '-';
    };
</script>

<style lang="scss">
    @import '../styles/colour';
    td {
        input {
            margin-bottom: 0;
        }
    }
    .left-align {
        text-align: left;
    }
    // .right-align {
    //     text-align: right;
    // }
    .flex-container {
        display: flex;
    }
    .danger {
        color: $main-colour;
        i {
            vertical-align: text-bottom;
        }
    }
</style>

<tr>
    <td>{index + 1}</td>
    <td class="left-align">
        <input
            aria-labelledby="name-header"
            placeholder="Player Name"
            bind:value={$roster.players[index].playerName} />
    </td>
    <td class="left-align">
        <div class="flex-container">
            {#if index > 0}
                <MaterialButton
                    symbol="arrow_circle_up"
                    clickFunction={moveUp} />
            {/if}
            {#if index < $roster.players.length - 1}
                <MaterialButton
                    symbol="arrow_circle_down"
                    clickFunction={moveDown} />
            {/if}
            <MaterialButton
                symbol="delete_forever"
                clickFunction={removePlayer} />
        </div>
    </td>
    <td class="left-align">
        {player.position}
        {#if danger}
            <span class="danger">
                <i class="material-icons">warning</i>
                {numberOfPlayerType}/{maxOfPlayerType}
            </span>
        {/if}
    </td>

    {#each player.playerStats as stat, i}
        <td>{`${stat === 0 ? '-' : i > 1 ? `${stat}+` : stat}`}</td>
    {/each}
    <SkillElement playerSkillIds={player.skills} />
    <td>{playerCostString()}</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>{playerCostString()}</td>
</tr>
