<script lang="ts">
    import type { Player } from "../models/player.model";
    import { roster } from "../store/teamRoster.store";
    import MaterialButton from "./materialButton.svelte";
    import { skills } from "../data/skills.data";
    import SkillElement from "./skillElement.svelte";
    export let index: number;
    export let player: Player;

    const removePlayer = () => {
        roster.removePlayer(index);
    };
    const moveUp = () => {
        roster.movePlayerUp(index);
    };
    const moveDown = () => {
        roster.movePlayerDown(index);
    };
    const getSkill = (id: number) => {
        return skills.find((s) => s.id === id).name;
    };
</script>

<style lang="scss">
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
</style>

<tr>
    <td>{index + 1}</td>
    <td class="left-align">
        <input
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
    <td class="left-align">{player.position}</td>

    {#each player.playerStats as stat, i}
        <td>{`${stat === 0 ? '-' : i > 1 ? `${stat}+` : stat}`}</td>
    {/each}
    <SkillElement playerSkillIds={player.skills} />
    <td>{player.cost}</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>{player.cost}</td>
</tr>
