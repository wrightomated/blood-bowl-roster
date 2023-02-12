<script lang="ts">
    import {
        advancementCostsMap,
        AdvancementType,
        SelectionType,
    } from '../../data/advancementCost.data';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import type { SkillCategory } from '../../models/skill.model';
    import ToggleButton from '../uiComponents/toggleButton.svelte';
    import SelectSkillAdvancement from './selectSkillAdvancement.svelte';

    export let rosterPlayer: RosterPlayerRecord;

    const advancementTypes = ['primary', 'secondary', 'characteristic'];
    let advancementType: AdvancementType = 'primary';

    const selectionTypes = ['random', 'select'];
    let selectionType: SelectionType = 'random';

    let sppCost = calculateSpp();

    // Skill category toggle
    let options: SkillCategory[];
    $: options = rosterPlayer.player?.[advancementType] || [];
    $: selectedCategory = options?.[0] || undefined;

    function calculateSpp() {
        const adv = rosterPlayer?.alterations?.advancements || 0;
        const tempSelectionType =
            advancementType === 'characteristic' ? '' : selectionType;
        return advancementCostsMap[advancementType + tempSelectionType][adv];
    }

    function selectAdvancementType(type: AdvancementType) {
        advancementType = type;
        sppCost = calculateSpp();
    }
    function selectSelectionType(type: SelectionType) {
        selectionType = type;
        sppCost = calculateSpp();
    }
</script>

<ToggleButton options={advancementTypes} selected={selectAdvancementType} />

{#if advancementType !== 'characteristic'}
    <ToggleButton options={selectionTypes} selected={selectSelectionType} />
{/if}
{#if options?.length > 1}
    <ToggleButton
        {options}
        selected={(c) => {
            selectedCategory = c;
        }}
    />
{/if}
<!-- <div>Requires {sppCost} SPP</div> -->
{#if selectedCategory}
    <SelectSkillAdvancement {selectedCategory} {rosterPlayer} />
{/if}
