<script lang="ts">
    import { skills } from "../data/skills.data";

    export let playerSkillIds: number[];

    const getSkill = (id: number) => {
        return skills.find((s) => s.id === id).name;
    };
</script>

<style lang="scss">
    @import "../styles/colour";
    .skills {
        text-transform: capitalize;
        text-align: left;

        span {
            &:nth-child(even) {
                color: $main-colour;
            }
            &::after {
                content: ", ";
                color: black;
            }
            &:last-child::after {
                content: "";
            }
        }
    }
</style>

<td class="left-align skills">
    {#each playerSkillIds as skillId}<span>{getSkill(skillId)}</span>{/each}
</td>
