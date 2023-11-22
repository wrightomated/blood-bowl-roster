<script lang="ts">
    import { onMount } from 'svelte';
    import { getSkill } from '../helpers/getSkill';
    import { roster } from '../store/teamRoster.store';

    let defaultColour = '#970f0c';

    export let playerSkillIds: number[];
    export let extraSkillIds: number[] = [];
    export let cyData: string = undefined;

    onMount(() => {
        extraSkillIds.forEach((skillId) => {
            if (!$roster.config.customSkillColour[skillId]) {
                $roster.config.customSkillColour[skillId] = defaultColour;
            }
        });
    });
</script>

<span class="skills" data-cy={cyData}>
    {#each playerSkillIds as skillId}<span>{getSkill(skillId)}</span>{/each}
    {#each extraSkillIds as skillId, index}
        <div
            class="extra"
            style:color={$roster.config.customSkillColour[skillId] ||
                defaultColour}
        >
            <input
                type="color"
                aria-label={`Select colour for ${getSkill(skillId)}`}
                bind:value={$roster.config.customSkillColour[skillId]}
            />
            {getSkill(skillId) + (index < extraSkillIds.length - 1 ? ', ' : '')}
        </div>
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
        .extra {
            padding: 0;
            position: relative;
            display: inline-block;
            font-weight: bold;
            margin-right: 0.25rem;

            input {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                background: none;
                cursor: pointer;
                border: 0;

                &::-webkit-color-swatch {
                    border: none;
                    border-radius: 0;
                    height: 0;
                    padding: 0;
                    margin: 0;
                }
                &::-moz-color-swatch {
                    display: none;
                }
            }
        }
    }
</style>
