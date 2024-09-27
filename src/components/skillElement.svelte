<script lang="ts">
    import { _ } from 'svelte-i18n';
    import SingleSkillColourPicker from './singleSkillColourPicker.svelte';

    export let playerSkillIds: number[];
    export let extraSkillIds: number[] = [];
    export let cyData: string = undefined;
</script>

<span class="skills" data-cy={cyData}>
    {#each playerSkillIds as skillId}<span>{$_(`skills.${skillId}`)}</span
        >{/each}
    {#each extraSkillIds as skillId, index}
        <SingleSkillColourPicker
            {skillId}
            extraContent={index < extraSkillIds.length - 1 ? ', ' : ''}
        />
    {/each}
</span>

<style lang="scss">
    .skills {
        span {
            &::after {
                content: ', ';
            }
            &:last-child::after {
                content: '';
            }
        }
    }
</style>
