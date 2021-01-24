<script lang="ts">
    import { advancementCosts } from '../data/advancementCost.data';

    import { skillCatalogue } from '../data/skills.data';
    import { characteristics } from '../data/statOrder.data';
    import type { RosterPlayerRecord } from '../models/roster.model';
    import { categoryToName } from '../models/skill.model';
    import { roster } from '../store/teamRoster.store';

    export let index: number;

    let showButtons: boolean = true;
    let showPrimary: boolean = false;
    let showSecondary: boolean = false;
    let showRandom: boolean = false;
    let showCharacteristics: boolean = false;

    $: d16 = 0;
    $: enabled = allowedSkills(d16).filter(
        (x) => !twoIncrements(rosterPlayer).includes(x),
    );

    $: rosterPlayer = $roster.players[index];

    $: availableSkills = skillCatalogue.filter(
        (x) =>
            !rosterPlayer.alterations?.extraSkills?.includes(x.id) &&
            !rosterPlayer.player.skills.includes(x.id),
    );

    $: primarySkills = availableSkills.filter((s) =>
        rosterPlayer.player.primary.includes(s.category),
    );
    $: secondarySkills = availableSkills.filter((s) =>
        rosterPlayer.player.secondary.includes(s.category),
    );

    const addSkill = (skillId: number) => {
        const extraSkills = (
            rosterPlayer.alterations.extraSkills || []
        ).concat([skillId]);
        const newPlayer: RosterPlayerRecord = {
            ...rosterPlayer,
            alterations: {
                ...rosterPlayer.alterations,
                extraSkills: extraSkills,
                spp: rosterPlayer.alterations.spp - sppCost(),
                advancements: (rosterPlayer.alterations?.advancements || 0) + 1,
                valueChange:
                    (rosterPlayer.alterations?.valueChange || 0) +
                    skillIncreaseCost(),
            },
        };
        roster.updatePlayer(newPlayer, index);
        cancel();
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
    };

    const selectPrimary = () => {
        showPrimary = true;
        showSecondary = false;
        showRandom = false;
        showButtons = false;
        showCharacteristics = false;
    };
    const randomPrimary = () => {
        showPrimary = true;
        showSecondary = false;
        showRandom = true;
        showButtons = false;
        showCharacteristics = false;
    };
    const selectSecondary = () => {
        showPrimary = false;
        showSecondary = true;
        showRandom = false;
        showButtons = false;
        showCharacteristics = false;
    };
    const randomSecondary = () => {
        showPrimary = false;
        showSecondary = true;
        showRandom = true;
        showButtons = false;
        showCharacteristics = false;
    };
    const randomCharacteristic = () => {
        showPrimary = false;
        showSecondary = false;
        showRandom = true;
        showButtons = false;
        showCharacteristics = true;
        d16 = 0;
    };
    const cancel = () => {
        showPrimary = false;
        showSecondary = false;
        showRandom = false;
        showButtons = true;
        showCharacteristics = false;
        d16 = 0;
    };
    const roll = () => {
        d16 = Math.floor(Math.random() * Math.floor(15)) + 1;
    };

    const allowedSkills = (dice: number) => {
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

    const twoIncrements = (p) => {
        return (p?.alterations?.statChange || [0, 0, 0, 0, 0]).map((x, i) =>
            x >= 2 ? characteristics[i] : x,
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
</script>

<div class="container">
    {#if showButtons}
        <div>
            <button on:click={randomPrimary}>Random Primary</button>
            <button on:click={selectPrimary}>Select Primary</button>
            <button on:click={randomSecondary}>Random Secondary</button>
            <button on:click={selectSecondary}>Select Secondary</button>
            <button on:click={randomCharacteristic}
                >Random Characteristic</button
            >
        </div>
    {:else}
        <button on:click={cancel}>Cancel</button>
    {/if}

    {#if showPrimary}
        <div class="primary">
            Primary Skills: {sppCost()}spp
            {#each rosterPlayer.player.primary as category}
                <div>
                    {categoryToName.get(category)}:
                    {#each primarySkills.filter((s) => s.category === category) as s}
                        <button on:click={() => addSkill(s.id)}>{s.name}</button
                        >
                    {/each}
                </div>
            {/each}
        </div>
    {/if}
    {#if showSecondary}
        <div class="secondary">
            Secondary Skills: {sppCost()}spp
            {#each rosterPlayer.player.secondary as category}
                <div>
                    {categoryToName.get(category)}:
                    {#each secondarySkills.filter((s) => s.category === category) as s}
                        <button on:click={() => addSkill(s.id)}>{s.name}</button
                        >
                    {/each}
                </div>
            {/each}
        </div>
    {/if}
    {#if showCharacteristics}
        <div class="secondary">
            Randomly Improve Characteristic: {sppCost()}spp
            <button on:click={roll}>{d16 ? d16 : 'Roll D16'}</button>

            <div>
                {#each characteristics as chara, i}
                    <button
                        disabled={!enabled.includes(chara)}
                        on:click={() => addCharacteristic(i)}>{chara}</button
                    >
                {/each}
                <button on:click={selectSecondary}>Select Secondary</button>
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    .container {
        max-width: 90vw;
        text-align: left;
        position: sticky;
        left: 0;
        top: 0;
    }
    button {
        @import '../styles/colour';
        border-radius: 10px;
        background-color: white;
        color: $secondary-colour;
        padding: 10px;
        margin: 5px;
        border: 2px solid $secondary-colour;

        &:hover {
            background-color: $secondary-colour;
            color: white;
            border-color: $secondary-colour;

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
    }
</style>
