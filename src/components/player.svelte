<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { formatNumberInThousands } from '../helpers/formatTotalToThousands';
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
    <td class="left-align"
        >{$_('players.' + player.id, { default: player.position })}</td
    >
    <td>{formatNumberInThousands(player.cost)}</td>
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
        color: #970f0c;
    }
</style>
