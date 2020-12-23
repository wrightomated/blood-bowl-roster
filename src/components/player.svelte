<script lang="ts">
    import type { Player } from "../models/player.model";
    import { roster } from "../store/teamRoster";
    export let player: Player;
    export let max: number;
    $: playerTypeCount = $roster.players.filter(
        (x) => x.player.id === player.id
    ).length;

    const addPlayer = () => {
        const newPlayer = {
            player: player,
            playerName: "",
        };
        roster.addPlayer(newPlayer);
    };

    // const unsubscribe = roster.subscribe((r) => {
    //     playerTypeCount = r.players.filter((x) => x.player.id === player.id)
    //         .length;
    // });

    // $roster.players.filter((x) => x.player.id === player.id).length;
</script>

<style>
    th,
    td {
        padding: 0.25rem;
        text-align: left;
        border: 1px solid #ccc;
    }
    .danger {
        color: #970f0c;
    }
</style>

<tr>
    <th>{player.position}</th>
    <td class:danger={playerTypeCount > max} on:click={addPlayer}>
        {playerTypeCount}/{max}
    </td>
    <td>{player.cost},000</td>
    {#each player.playerStats as stat, index}
        <td>{`${stat}${index > 1 ? '+' : ''}`}</td>
    {/each}
    <td>None</td>
    <td>{player.primary}</td>
    <td>{player.secondary}</td>
</tr>
