<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { formatNumberInThousands } from '../helpers/formatTotalToThousands';
    import type { StarPlayer } from '../models/player.model';

    import SkillElement from './skillElement.svelte';

    export let starPlayer: StarPlayer;
</script>

<tr>
    <td class="left-align">{$_(`stars.${starPlayer.id}.name`)}</td>
    <td
        >{starPlayer.cost > 0
            ? formatNumberInThousands(starPlayer.cost)
            : '-'}</td
    >
    {#each starPlayer.playerStats as stat, index}
        <td>{`${stat === 0 ? '-' : index > 1 ? `${stat}+` : stat}`}</td>
    {/each}
    <td class="left-align">
        <SkillElement playerSkillIds={starPlayer.skills} />
    </td>
    <td class="left-align">{$_(`stars.${starPlayer.id}.rule`)}</td>
</tr>
