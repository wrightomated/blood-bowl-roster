<script lang="ts">
    import { _ } from 'svelte-i18n';

    export let playerSkillIds: number[];
    export let extraSkillIds: number[] = [];
    export let cyData: string = undefined;
</script>

<span class="skills" data-cy={cyData}>
    {#each playerSkillIds as skillId}<span>{$_(`skills.${skillId}`)}</span
        >{/each}
    {#each extraSkillIds as skillId}<span class="extra"
            >{$_(`skills.${skillId}`)}</span
        >{/each}
</span>

<style lang="scss">
    .skills {
        span {
            &:nth-child(even) {
                color: var(--main-colour);
            }
            &::after {
                content: ', ';
                color: black;
            }
            &:last-child::after {
                content: '';
            }
            &.extra {
                color: green;
            }
        }
    }
</style>
