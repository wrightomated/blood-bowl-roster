<script lang="ts">
    import {
        type AdvancementCombination,
        advancementCostsMap,
        type AdvancementType,
        type SelectionType,
        skillIncreaseCost,
    } from '../../data/advancementCost.data';
    import { blurOnEscapeOrEnter } from '../../helpers/blurOnEscapeOrEnter';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import type { SkillCategory } from '../../models/skill.model';
    import { roster } from '../../store/teamRoster.store';
    import ToggleButton from '../uiComponents/toggleButton.svelte';
    import CharacteristicAdvancement from './characteristicAdvancement.svelte';
    import SelectSkillAdvancement from './selectSkillAdvancement.svelte';

    export let rosterPlayer: RosterPlayerRecord;
    export let index: number;

    const advancementTypes =
        $roster.format === 'sevens'
            ? ['primary', 'secondary']
            : ['primary', 'secondary', 'characteristic'];
    let advancementType: AdvancementType = 'primary';

    const selectionTypes = ['random', 'select'];
    let selectionType: SelectionType = 'random';

    let advancementCombination: AdvancementCombination;
    $: advancementCombination = (advancementType +
        (advancementType === 'characteristic'
            ? ''
            : selectionType)) as AdvancementCombination;

    let sppCost: number;
    $: sppCost =
        advancementCostsMap[advancementCombination][
            rosterPlayer?.alterations?.advancements || 0
        ];

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

    function selectSkill(skillId: number) {
        const extraSkills = (rosterPlayer.alterations.extraSkills || []).concat(
            [skillId]
        );
        const sevensExtraSkillTax =
            $roster.format !== 'sevens' ? 0 : extraSkills.length > 1 ? 10 : 0;

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
                    skillIncreaseCost[advancementType + selectionType] +
                    sevensExtraSkillTax,
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

{#if $roster.format !== 'sevens' && $roster.players[index]?.alterations?.spp !== undefined}
    <label class="spp"
        ><span class="mini-title">SPP:</span>
        <input
            class="spp__input"
            type="number"
            placeholder="?"
            inputmode="numeric"
            use:blurOnEscapeOrEnter
            bind:value={$roster.players[index].alterations.spp}
        />
    </label>
{/if}

<ToggleButton options={advancementTypes} selected={selectAdvancementType} />

{#if $roster.format !== 'sevens' && advancementType !== 'characteristic'}
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
    <SelectSkillAdvancement
        {selectedCategory}
        {rosterPlayer}
        {selectSkill}
        {sppCost}
        randomSelection={selectionType === 'random'}
    />
{:else if advancementType === 'characteristic'}
    <CharacteristicAdvancement {index} {sppCost} {rosterPlayer} />
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
