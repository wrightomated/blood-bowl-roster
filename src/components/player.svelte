<script lang="ts">
    import type { Player } from "../models/player.model";
    import { roster } from "../store/teamRoster.store";
    import { skills } from "../data/skills.data";
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

    const getSkill = (id: number) => {
        return skills.find((s) => s.id === id).name;
    };

    const getSkills = (ids: number[]) => {
        return ids.map((id) => getSkill(id)).join(", ");
    };

    // const unsubscribe = roster.subscribe((r) => {
    //     playerTypeCount = r.players.filter((x) => x.player.id === player.id)
    //         .length;
    // });

    // $roster.players.filter((x) => x.player.id === player.id).length;
</script>

<style>
    .danger {
        color: #970f0c;
    }
    .skills {
        text-transform: capitalize;
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
        <td>{`${stat}${index > 1 ? '+' : ''}`}</td>
    {/each}
    <td class="skills left-align">{getSkills(player.skills)}</td>
    <td>{player.primary}</td>
    <td>{player.secondary}</td>
</tr>
