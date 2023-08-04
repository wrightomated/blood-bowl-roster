<script lang="ts">
    import { quadInOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';
    import {
        advancementCosts,
        sevensExtraSkillTax,
    } from '../data/advancementCost.data';

    import { dungeonBowlSkillIds, skillCatalogue } from '../data/skills.data';
    import {
        characteristicMaxValue,
        characteristics,
        type CharacteristicType,
    } from '../data/statOrder.data';
    import type { RosterPlayerRecord } from '../models/roster.model';
    import type { SkillCategory } from '../models/skill.model';
    import { categoryToName } from '../models/skill.model';
    import { rosterViewMode } from '../store/rosterDisplayMode.store';
    import { showSkillButtons } from '../store/showSkillButtons.store';
    import { roster } from '../store/teamRoster.store';
    import ToggleButton from './uiComponents/toggleButton.svelte';

    export let index: number;
    let showPrimary: boolean = false;
    let showSecondary: boolean = false;
    let showRandom: boolean = false;
    let showCharacteristics: boolean = false;
    let showInjuries: boolean = false;

    $: die = 0;
    $: enabled = allowedSkills(die)
        .filter((x) => !isAtMax(x))
        .filter((x) => !twoIncrements(rosterPlayer).includes(x));
    $: injuredRoll = injuryRoll(die);

    $: rosterPlayer = $roster.players[index];

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

    $: primarySkills = availableSkills.filter((s) =>
        rosterPlayer.player.primary.includes(s.category)
    );
    $: secondarySkills = availableSkills.filter((s) =>
        rosterPlayer.player.secondary.includes(s.category)
    );
    $: selectedPrimary = rosterPlayer.player.primary[0];
    $: selectedSecondary = rosterPlayer.player.secondary[0];

    const addSkill = (skillId: number) => {
        const extraSkills = (rosterPlayer.alterations.extraSkills || []).concat(
            [skillId]
        );
        const skillTax =
            $roster.format !== 'sevens'
                ? 0
                : extraSkills.length > 1
                ? sevensExtraSkillTax
                : 0;
        const newPlayer: RosterPlayerRecord = {
            ...rosterPlayer,
            alterations: {
                ...rosterPlayer.alterations,
                extraSkills: extraSkills,
                spp: rosterPlayer.alterations.spp - sppCost(),
                advancements: (rosterPlayer.alterations?.advancements || 0) + 1,
                valueChange:
                    (rosterPlayer.alterations?.valueChange || 0) +
                    skillIncreaseCost() +
                    skillTax,
            },
        };
        roster.updatePlayer(newPlayer, index);
        cancel();
        showSkillButtons.set(
            $showSkillButtons.map((x, i) => (i === index ? false : x))
        );
    };

    const addCharacteristic = (charIndex: number) => {
        const stats = rosterPlayer.alterations.statChange || [0, 0, 0, 0, 0];
        stats[charIndex]++;
        const newPlayer: RosterPlayerRecord = {
            ...rosterPlayer,
            alterations: {
                ...rosterPlayer.alterations,
                statChange: stats,
                spp: rosterPlayer.alterations.spp - sppCost(),
                advancements: (rosterPlayer.alterations?.advancements || 0) + 1,
                valueChange:
                    (rosterPlayer.alterations?.valueChange || 0) +
                    charCostIncrease(charIndex),
            },
        };
        roster.updatePlayer(newPlayer, index);
        cancel();
        showSkillButtons.set(
            $showSkillButtons.map((x, i) => (i === index ? false : x))
        );
    };

    const addInjury = (charIndex: number) => {
        const injuries = rosterPlayer.alterations.injuries || [0, 0, 0, 0, 0];
        injuries[charIndex]++;
        const newPlayer: RosterPlayerRecord = {
            ...rosterPlayer,
            alterations: {
                ...rosterPlayer.alterations,
                injuries,
            },
        };
        roster.updatePlayer(newPlayer, index);
        cancel();
        showSkillButtons.set(
            $showSkillButtons.map((x, i) => (i === index ? false : x))
        );
    };

    const cancel = () => {
        showPrimary = false;
        showSecondary = false;
        showRandom = false;
        showCharacteristics = false;
        showInjuries = false;
        die = 0;
    };
    const selectPrimary = () => {
        cancel();
        showPrimary = true;
    };
    const randomPrimary = () => {
        cancel();
        showPrimary = true;
        showRandom = true;
    };
    const selectSecondary = () => {
        cancel();
        showSecondary = true;
    };
    const randomSecondary = () => {
        cancel();
        showSecondary = true;
        showRandom = true;
    };
    const randomCharacteristic = () => {
        cancel();
        showRandom = true;
        showCharacteristics = true;
    };
    const injuries = () => {
        cancel();
        showInjuries = true;
    };
    const roll = (dn: number) => {
        die = Math.floor(Math.random() * Math.floor(dn)) + 1;
    };
    const allowedSkills: (dice: number) => CharacteristicType[] = (dice) => {
        switch (dice) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                return ['MA', 'AV'];
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
                return ['MA', 'PA', 'AV'];
            case 14:
                return ['AG', 'PA'];
            case 15:
                return ['ST', 'AG'];
            case 16:
                return characteristics;
            default:
                return characteristics;
        }
    };

    const injuryRoll = (dice: number) => {
        switch (dice) {
            case 1:
            case 2:
                return 'AV';
            case 3:
                return 'MA';
            case 4:
                return 'PA';
            case 5:
                return 'AG';
            case 6:
                return 'ST';
            default:
                return 'ALL';
        }
    };

    const twoIncrements = (p) => {
        return (p?.alterations?.statChange || [0, 0, 0, 0, 0]).map((x, i) =>
            x >= 2 ? characteristics[i] : x
        );
    };

    const sppCost = () => {
        const advancementLevel = rosterPlayer.alterations?.advancements || 0;
        if (showPrimary) {
            if (showRandom) {
                return advancementCosts.ranPri[advancementLevel];
            }
            return advancementCosts.priOrRanSec[advancementLevel];
        }
        if (showSecondary) {
            if (showRandom) {
                return advancementCosts.priOrRanSec[advancementLevel];
            }
            return advancementCosts.sec[advancementLevel];
        }
        if (showCharacteristics) {
            return advancementCosts.char[advancementLevel];
        }
        return;
    };

    const skillIncreaseCost = () => {
        if (showPrimary) {
            if (showRandom) {
                return 10;
            }
            return 20;
        }
        if (showSecondary) {
            if (showRandom) {
                return 20;
            }
            return 40;
        }
    };

    const charCostIncrease = (index: number) => {
        switch (index) {
            case 4:
                return 10;
            case 0:
            case 3:
                return 20;
            case 2:
                return 40;
            case 1:
                return 80;
            default:
                break;
        }
    };

    const addRandomSkill = (category: SkillCategory) => {
        const skills = availableSkills.filter((s) => s.category === category);
        const randomIndex = Math.floor(Math.random() * skills.length);
        addSkill(skills[randomIndex].id);
    };

    const isAtMax = (characteristic: CharacteristicType) => {
        const i = characteristics.indexOf(characteristic);
        const currentStat =
            rosterPlayer.player.playerStats[i] +
            (rosterPlayer.alterations?.statChange?.[i] || 0) *
                (i === 2 || i === 3 ? -1 : 1);
        return currentStat === characteristicMaxValue[i];
    };
</script>

<div
    class="container"
    class:grid-view={$rosterViewMode === 'grid'}
    transition:slide={{ duration: 300, easing: quadInOut }}
>
    <div>
        {#if (rosterPlayer.alterations?.advancements || 0) < 6}
            <button
                data-cy="random-primary"
                class:selected={showPrimary && showRandom}
                on:click={randomPrimary}
                >Random Primary <span
                    class="spp-font"
                    class:hide={$roster.format === 'sevens'}
                    >{advancementCosts.ranPri[
                        rosterPlayer.alterations?.advancements || 0
                    ]}spp</span
                ></button
            >
            {#if $roster.format !== 'sevens'}
                <button
                    on:click={selectPrimary}
                    class:selected={showPrimary && !showRandom}
                    >Select Primary <span class="spp-font"
                        >{advancementCosts.priOrRanSec[
                            rosterPlayer.alterations?.advancements || 0
                        ]}spp</span
                    ></button
                >
            {/if}
            <button
                on:click={randomSecondary}
                class:selected={showSecondary && showRandom}
                >Random Secondary <span
                    class="spp-font"
                    class:hide={$roster.format === 'sevens'}
                    >{advancementCosts.priOrRanSec[
                        rosterPlayer.alterations?.advancements || 0
                    ]}spp</span
                ></button
            >
            {#if $roster.format !== 'sevens'}
                <button
                    on:click={selectSecondary}
                    class:selected={showSecondary && !showRandom}
                    >Select Secondary <span class="spp-font"
                        >{advancementCosts.sec[
                            rosterPlayer.alterations?.advancements || 0
                        ]}spp</span
                    ></button
                >
                <button
                    on:click={randomCharacteristic}
                    class:selected={showCharacteristics}
                    >Random Characteristic <span class="spp-font"
                        >{advancementCosts.char[
                            rosterPlayer.alterations?.advancements || 0
                        ]}spp</span
                    ></button
                >
            {/if}
        {/if}
        {#if $roster.format !== 'sevens'}
            <button
                on:click={injuries}
                class="injury-button"
                class:selected={showInjuries}
                >Lasting Injury
            </button>
        {/if}
    </div>

    {#if showPrimary}
        {#if rosterPlayer.player.primary.length > 1}
            <ToggleButton
                options={rosterPlayer.player.primary}
                selectedIndex={selectedPrimary
                    ? rosterPlayer.player.primary.indexOf(selectedPrimary)
                    : 0}
                selected={(cat) => (selectedPrimary = cat)}
            />
        {/if}
        <fieldset>
            <legend>
                {categoryToName.get(selectedPrimary)}
            </legend>
            {#if showRandom}
                <button on:click={() => addRandomSkill(selectedPrimary)}
                    >Random</button
                >
            {/if}
            {#each primarySkills.filter((s) => s.category === selectedPrimary) as s}
                <button on:click={() => addSkill(s.id)}>{s.name}</button>
            {/each}
        </fieldset>
    {/if}
    {#if showSecondary}
        {#if rosterPlayer.player.secondary.length > 1}
            <ToggleButton
                options={rosterPlayer.player.secondary}
                selectedIndex={selectedSecondary
                    ? rosterPlayer.player.secondary.indexOf(selectedSecondary)
                    : 0}
                selected={(cat) => (selectedSecondary = cat)}
            />
        {/if}
        <fieldset>
            <legend>
                {categoryToName.get(selectedSecondary)}
            </legend>
            {#if showRandom}
                <button on:click={() => addRandomSkill(selectedSecondary)}
                    >Random</button
                >
            {/if}
            {#each secondarySkills.filter((s) => s.category === selectedSecondary) as s}
                <button on:click={() => addSkill(s.id)}>{s.name}</button>
            {/each}
        </fieldset>
    {/if}
    {#if showCharacteristics}
        <fieldset>
            <legend> Characteristic </legend>
            <button class="dice" on:click={() => roll(16)}
                >{die ? die : 'Roll D16'}</button
            >
            {#each characteristics as chara, i}
                <button
                    disabled={!enabled.includes(chara)}
                    on:click={() => addCharacteristic(i)}>{chara}</button
                >
            {/each}
            <button on:click={selectSecondary}>Select Secondary</button>
        </fieldset>
    {/if}
    {#if showInjuries}
        <fieldset class="injury-fieldset">
            <legend> Lasting Injury </legend>
            <button class="injury-button" on:click={() => roll(6)}
                >{die ? die : 'Roll D6'}</button
            >
            {#each characteristics as chara, i}
                <button
                    disabled={injuredRoll !== 'ALL' && injuredRoll !== chara}
                    class="injury-button"
                    on:click={() => addInjury(i)}>{chara}</button
                >
            {/each}
        </fieldset>
    {/if}
</div>

<style lang="scss">
    @import '../styles/font';
    .container {
        text-align: left;
        position: sticky;
        left: 0;
        top: 0;
        max-width: calc(100vw - 16px);
    }
    .grid-view {
        margin: 1em;
        max-width: 100%;
    }
    button {
        border-radius: 12px;
        background-color: white;
        color: var(--secondary-colour);
        padding: 10px;
        margin: 5px;
        border: var(--secondary-border);
        max-width: calc(50% - 20px);

        &:hover {
            background-color: var(--secondary-colour);
            color: white;
            border-color: var(--secondary-colour);

            &:disabled {
                background-color: white;
                color: grey;
                border: none;
            }
        }

        &:disabled {
            border: none;
            color: grey;
        }

        &.selected {
            background-color: var(--secondary-colour);
            color: white;
        }

        .spp-font {
            font-family: $display-font;
        }
    }

    .hide {
        display: none;
    }

    .injury-button {
        color: var(--main-colour);
        border: 2px solid var(--main-colour);

        &:disabled {
            border: none;
            color: grey;
        }

        &.selected {
            background-color: var(--main-colour);
            color: white;
            border-color: var(--main-colour);
        }

        &:hover {
            background-color: var(--main-colour);
            color: white;
            border-color: var(--main-colour);

            &:disabled {
                background-color: white;
                color: grey;
                border: none;
            }
        }
    }
    fieldset {
        padding: 1em;
        border-radius: 12px;
        border: 2px solid;
        border-color: var(--secondary-colour);
        margin-top: 1em;
        legend {
            color: var(--secondary-colour);
        }

        &.injury-fieldset {
            border-color: var(--main-colour);
            legend {
                color: var(--main-colour);
            }
        }
    }
</style>
