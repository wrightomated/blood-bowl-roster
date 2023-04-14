<script lang="ts">
    import {
        dungeonBowlSkillIds,
        skillCatalogue,
    } from '../../data/skills.data';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import {
        categoryToName,
        Skill,
        SkillCategory,
    } from '../../models/skill.model';
    import { roster } from '../../store/teamRoster.store';
    import Button from '../uiComponents/button.svelte';

    export let rosterPlayer: RosterPlayerRecord;
    export let selectedCategory: SkillCategory;
    export let selectSkill: (skillId) => unknown;
    export let sppCost: number;
    export let randomSelection: boolean = false;

    let availableSkills: Skill[];
    $: availableSkills = skillCatalogue
        .filter((x) =>
            $roster.format === 'dungeon bowl'
                ? !dungeonBowlSkillIds.excluded.includes(x.id)
                : !dungeonBowlSkillIds.included.includes(x.id)
        )
        .filter(
            (x) =>
                !rosterPlayer.alterations?.extraSkills?.includes(x.id) &&
                !rosterPlayer.player.skills.includes(x.id) &&
                x.category === selectedCategory
        );
    $: legendText = `${categoryToName.get(selectedCategory)}${
        $roster.format !== 'sevens' ? ` - ${sppCost} SPP` : ''
    }`;

    function addRandomSkill() {
        const randomSkill =
            availableSkills[Math.floor(Math.random() * availableSkills.length)];

        selectSkill(randomSkill.id);
    }
</script>

{#if selectedCategory}
    <fieldset>
        <legend>
            {legendText}
        </legend>
        {#if randomSelection}
            <Button clickFunction={() => addRandomSkill()}>Random</Button>
        {/if}
        {#each availableSkills as skill}
            <Button clickFunction={() => selectSkill(skill.id)}
                >{skill.name}</Button
            >
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
