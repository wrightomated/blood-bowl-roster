<script lang="ts">
    import type { StarPlayer } from '../models/player.model';

    import SkillElement from './skillElement.svelte';

    export let starPlayer: StarPlayer;
</script>

<style lang="scss">
    .left-align {
        text-align: left;
    }
</style>

<tr>
    <td class="left-align">{starPlayer.position}</td>
    <td>{starPlayer.cost > 0 ? starPlayer.cost + ',000' : '-'}</td>
    {#each starPlayer.playerStats as stat, index}
        <td>{`${stat === 0 ? '-' : index > 1 ? `${stat}+` : stat}`}</td>
    {/each}
    <td>
        <SkillElement playerSkillIds={starPlayer.skills} />
    </td>
    <td class="left-align">{starPlayer.specialRules}</td>
</tr>
