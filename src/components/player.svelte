<script lang="ts">
    import type { Player } from '../models/player.model';
    import { roster } from '../store/teamRoster.store';
    import { teamSelectionOpen } from '../store/teamSelectionOpen.store';
    import SkillElement from './skillElement.svelte';
    export let player: Player;
    export let max: number;
    $: playerTypeCount = $teamSelectionOpen
        ? 0
        : $roster.players.filter((x) => x.player.id === player.id).length;
</script>

<tr>
    <td class:danger={playerTypeCount > max}>
        {playerTypeCount}/{max}
    </td>
    <td class="left-align">{player.position}</td>
    <td>{player.cost},000</td>
    {#each player.playerStats as stat, index}
        <td>{`${stat === 0 ? '-' : index > 1 ? `${stat}+` : stat}`}</td>
    {/each}
    <td class="left-align">
        <SkillElement playerSkillIds={player.skills} />
    </td>
    <td>{player.primary.join('')}</td>
    <td>{player.secondary.join('')}</td>
</tr>

<style>
    .danger {
        color: var(--main-colour);
    }
    .left-align {
        text-align: left;
    }
</style>
