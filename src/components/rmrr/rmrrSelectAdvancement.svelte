<script lang="ts">
    import { customisationRules } from '../../customisation/customisation.store';
    import {
        type AdvancementCombination,
        advancementCostsMap,
        type AdvancementType,
        type SelectionType,
        skillIncreaseCost,
    } from '../../data/advancementCost.data';
    import type { AdvancementSetting } from '../../models/gameType.model';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import type { SkillCategory } from '../../models/skill.model';
    import { roster } from '../../store/teamRoster.store';
    import ToggleButton from '../uiComponents/toggleButton.svelte';
    import RmrrCharAdvancement from './rmrrCharAdvancement.svelte';
    import RmrrSelectSkillAdvancement from './rmrrSelectSkillAdvancement.svelte';

    export let rosterPlayer: RosterPlayerRecord;
    export let index: number;

    const advancementSettings: AdvancementSetting[] = [
        {
            type: 'primary',
            selectionTypes: ['select'],
        },
        {
            type: 'characteristic',
            selectionTypes: ['select', 'random'],
        },
    ];
    const advancementTypes = Object.values(advancementSettings).map(
        (setting) => setting.type
    );
    let advancementType: AdvancementType =
        advancementTypes[0] as AdvancementType;

    const selectionTypes: SelectionType[] = advancementSettings.find(
        (setting) => setting.type === advancementType
    ).selectionTypes as SelectionType[];
    let selectionType: SelectionType = selectionTypes[0];

    let advancementCombination: AdvancementCombination;
    $: advancementCombination = (advancementType +
        (advancementType === 'characteristic'
            ? ''
            : selectionType)) as AdvancementCombination;

    let sppCost: number = 0;

    // Skill category toggle
    let options: SkillCategory[];
    $: options = rosterPlayer.player?.[advancementType] || [];
    $: selectedCategory = options?.[0] || undefined;

    function selectAdvancementType(type: AdvancementType) {
        advancementType = type;
    }
    function selectSelectionType(type: SelectionType) {
        selectionType = type;
    }
    /**
     * ST = 80k
    AG = 40k
    PA/MA = 20k
    AV = 10
    Cost of Skill Upgrades for Ringer:
    Primary Skill = 20k

     */

    function selectSkill(skillId: number) {
        if (!$roster.config.customSkillColour[skillId]) {
            $roster.config.customSkillColour[skillId] = '#970f0c';
        }
        const extraSkills = (rosterPlayer.alterations.extraSkills || []).concat(
            [skillId]
        );

        const specificAdvancement = {
            type: advancementCombination,
            sppCost,
            advancementValue: skillId,
        };
        const newPlayer: RosterPlayerRecord = {
            ...rosterPlayer,
            alterations: {
                ...rosterPlayer.alterations,
                extraSkills: extraSkills,
                spp: rosterPlayer.alterations.spp - sppCost,
                advancements: (rosterPlayer.alterations?.advancements || 0) + 1,
                valueChange:
                    (rosterPlayer.alterations?.valueChange || 0) +
                    skillIncreaseCost[advancementType + selectionType],
                specificAdvancements: rosterPlayer.alterations
                    ?.specificAdvancements
                    ? rosterPlayer.alterations.specificAdvancements.concat([
                          specificAdvancement,
                      ])
                    : [specificAdvancement],
            },
        };
        roster.updatePlayer(newPlayer, index);
    }
</script>

<ToggleButton options={advancementTypes} selected={selectAdvancementType} />

{#if selectionTypes?.length > 1}
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
{#if selectedCategory && advancementType !== 'characteristic'}
    <RmrrSelectSkillAdvancement
        {selectedCategory}
        {rosterPlayer}
        {selectSkill}
        {sppCost}
        randomSelection={selectionType === 'random'}
    />
{:else if advancementType === 'characteristic'}
    <RmrrCharAdvancement {index} {sppCost} {rosterPlayer} />
{/if}

<style lang="scss">
    .spp {
        display: inline-block;
        &__input {
            width: 60px;
            margin-bottom: 12px;
            margin-left: 4px;
        }
    }
</style>
