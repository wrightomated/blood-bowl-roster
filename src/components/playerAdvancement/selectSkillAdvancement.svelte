<script lang="ts">
    import type {
        AdvancementType,
        SelectionType,
    } from '../../data/advancementCost.data';
    import {
        dungeonBowlSkillIds,
        skillCatalogue,
    } from '../../data/skills.data';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import { categoryToName, SkillCategory } from '../../models/skill.model';
    import { roster } from '../../store/teamRoster.store';
    import Button from '../uiComponents/button.svelte';
    import ToggleButton from '../uiComponents/toggleButton.svelte';

    export let rosterPlayer: RosterPlayerRecord;
    export let selectedCategory: SkillCategory;

    $: availableSkills = skillCatalogue
        .filter((x) =>
            $roster.format === 'dungeon bowl'
                ? !dungeonBowlSkillIds.excluded.includes(x.id)
                : !dungeonBowlSkillIds.included.includes(x.id)
        )
        .filter(
            (x) =>
                !rosterPlayer.alterations?.extraSkills?.includes(x.id) &&
                !rosterPlayer.player.skills.includes(x.id)
        );
</script>

{#if selectedCategory}
    <fieldset>
        <legend>
            {categoryToName.get(selectedCategory)}
        </legend>
        {#each availableSkills.filter((s) => s.category === selectedCategory) as skill}
            <!-- <button>{skill.name} -->
            <Button>{skill.name}</Button>
        {/each}
    </fieldset>
{/if}

<style lang="scss">
    fieldset {
        border-radius: 12px;
        border: 2px solid;
        border-color: var(--secondary-colour);
        margin-top: 1em;
        legend {
            color: var(--secondary-colour);
        }
    }
</style>
