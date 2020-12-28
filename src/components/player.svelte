<script lang="ts">
    import type { Player } from "../models/player.model";
    import { roster } from "../store/teamRoster.store";
    import { teamSelectionOpen } from "../store/teamSelectionOpen.store";
    import SkillElement from "./skillElement.svelte";
    export let player: Player;
    export let max: number;
    $: playerTypeCount = $teamSelectionOpen
        ? 0
        : $roster.players.filter((x) => x.player.id === player.id).length;

    const addPlayer = () => {
        if ($teamSelectionOpen) {
            return;
        }
        const newPlayer = {
            player: player,
            playerName: "",
        };
        roster.addPlayer(newPlayer);
    };
</script>

<style>
    .danger {
        color: #970f0c;
    }
    .left-align {
        text-align: left;
    }
</style>

<tr>
    <td class:danger={playerTypeCount > max} on:click={addPlayer}>
        {playerTypeCount}/{max}
    </td>
    <td class="left-align">{player.position}</td>
    <td>{player.cost},000</td>
    {#each player.playerStats as stat, index}
        <td>{`${stat === 0 ? '-' : index > 1 ? `${stat}+` : stat}`}</td>
    {/each}
    <SkillElement playerSkillIds={player.skills} />
    <td>{player.primary.join('')}</td>
    <td>{player.secondary.join('')}</td>
</tr>
