<script lang="ts">
    import { onMount } from 'svelte';
    import { roster } from '../store/teamRoster.store';
    import { _ } from 'svelte-i18n';

    let defaultColour = '#970f0c';

    export let skillId: number | string;
    export let extraContent: string = '';
    export let allowInput: boolean = true;

    onMount(() => {
        if (!$roster.config.customSkillColour[skillId]) {
            $roster.config.customSkillColour[skillId] = defaultColour;
        }
    });
</script>

<div
    class="extra"
    style:color={$roster.config.customSkillColour[skillId] || defaultColour}
>
    {#if allowInput}
        <input
            type="color"
            aria-label={`Select colour for ${$_(`skills.${skillId}`)}`}
            bind:value={$roster.config.customSkillColour[skillId]}
        />
    {/if}
    {$_(`skills.${skillId}`) + extraContent}
</div>

<style lang="scss">
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
</style>
