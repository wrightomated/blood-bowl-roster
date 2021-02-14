<script lang="ts">
    import { skillCatalogue } from '../data/skills.data';

    export let playerSkillIds: number[];
    export let extraSkillIds: number[] = [];

    const getSkill = (id: number) => {
        return skillCatalogue.find((s) => s.id === id).name;
    };
</script>

<span class="skills">
    {#each playerSkillIds as skillId}<span>{getSkill(skillId)}</span>{/each}
    {#each extraSkillIds as skillId}<span class="extra"
            >{getSkill(skillId)}</span
        >{/each}
</span>

<style lang="scss">
    @import '../styles/colour';
    .skills {
        span {
            &:nth-child(even) {
                color: $main-colour;
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
