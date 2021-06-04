<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import MaterialButton from './uiComponents/materialButton.svelte';
    import SkillElement from './skillElement.svelte';
    import { currentTeam } from '../store/currentTeam.store';
    import type { StarPlayer } from '../models/player.model';
    import AddSkill from './addSkill.svelte';
    import {
        characteristicMaxValue,
        characteristicMinValue,
        characteristics,
    } from '../data/statOrder.data';
    import StatBlock from './playerCard/statBlock.svelte';
    import { showSkillButtons } from '../store/showSkillButtons.store';

    export let index: number;

    $: rosterPlayer = $roster.players[index];
    $: numberOfPlayerType = $roster.players.filter(
        (x) => x.player.id === rosterPlayer.player.id,
    ).length;
    $: maxOfPlayerType =
        $currentTeam.players.find((x) => x.id === rosterPlayer.player.id)
            ?.max || 0;
    $: danger =
        !rosterPlayer.starPlayer && numberOfPlayerType > maxOfPlayerType;
    $: tooManyBigGuys =
        rosterPlayer.player.bigGuy &&
        $currentTeam.maxBigGuys <
            $roster.players.filter((x) => x.player.bigGuy).length;
    $: currentCost =
        (rosterPlayer?.alterations?.mng ||
        rosterPlayer?.alterations?.tr ||
        ((rosterPlayer.player.id === 56 || rosterPlayer.player.id === 73) &&
            $roster.mode !== 'exhibition')
            ? 0
            : rosterPlayer.player.cost) +
        (rosterPlayer.alterations?.valueChange || 0);
    $: alteredStats = characteristicMaxValue.map(
        (_, i) =>
            (rosterPlayer?.alterations?.statChange?.[i] || 0) -
            (rosterPlayer?.alterations?.injuries?.[i] || 0),
    );

    const removePlayer = (firePlayer: boolean) => {
        removeTwoForOne(firePlayer) || roster.removePlayer([index], firePlayer);
    };
    const moveUp = () => {
        roster.movePlayerUp(index);
    };
    const moveDown = () => {
        roster.movePlayerDown(index);
    };
    const removeTwoForOne = (firePlayer: boolean) => {
        if (rosterPlayer.starPlayer) {
            const twoForOne = (rosterPlayer.player as StarPlayer).twoForOne;
            const tfoIndex = $roster.players.findIndex(
                (p) => p.player.id === twoForOne,
            );
            if (twoForOne) {
                roster.removePlayer([index, tfoIndex], firePlayer);
                return true;
            }
        }
        return false;
    };

    const toggleShowSkills = () => {
        showSkillButtons.set(
            $showSkillButtons.map((x, i) => (i === index ? !x : x)),
        );
    };

    const getStat = (stat: number, i: number) => {
        const alteredStat =
            stat +
            (rosterPlayer?.alterations?.statChange?.[i] || 0) *
                (i === 2 || i === 3 ? -1 : 1) -
            (rosterPlayer?.alterations?.injuries?.[i] || 0) *
                (i === 2 || i === 3 ? -1 : 1);
        const boundedStat = stat === 0 ? 0 : getBoundedStat(alteredStat, i);
        return `${
            boundedStat === 0 ? '-' : i > 1 ? `${boundedStat}+` : boundedStat
        }`;
    };

    const getBoundedStat = (alt: number, i: number) => {
        switch (i) {
            case 2:
            case 3:
                return alt > characteristicMinValue[i]
                    ? characteristicMinValue[i]
                    : alt < characteristicMaxValue[i]
                    ? characteristicMaxValue[i]
                    : alt;
            default:
                return alt < characteristicMinValue[i]
                    ? characteristicMinValue[i]
                    : alt > characteristicMaxValue[i]
                    ? characteristicMaxValue[i]
                    : alt;
        }
    };
</script>

<section class="player-card" class:danger>
    <div class="header" class:danger>
        <div>
            <div class="player-number">{index + 1}</div>
        </div>
        <h3 class="player-name left-align">
            {#if rosterPlayer.starPlayer}
                {rosterPlayer.player.position}
            {:else}
                <input
                    aria-label="player name"
                    placeholder="Player Name"
                    bind:value={$roster.players[index].playerName}
                />
            {/if}
        </h3>
        <div class="player-position left-align">
            <div class="flex-container">
                {#if rosterPlayer.starPlayer}
                    <p>Star Player</p>
                {:else}
                    <p>
                        {rosterPlayer.player.position}
                        {#if danger}
                            {numberOfPlayerType}/{maxOfPlayerType}
                        {/if}
                    </p>
                {/if}
                <MaterialButton
                    hoverText="Remove player"
                    symbol="delete_forever"
                    clickFunction={() => removePlayer(false)}
                />
                {#if $roster.mode === 'league'}
                    <MaterialButton
                        hoverText="Fire player (no refund)"
                        symbol="local_fire_department"
                        clickFunction={() => removePlayer(true)}
                    />
                {/if}
                {#if !rosterPlayer.starPlayer}
                    <MaterialButton
                        hoverText="Player advancement"
                        symbol="elevator"
                        clickFunction={toggleShowSkills}
                    />
                {/if}
                {#if index > 0}
                    <MaterialButton
                        hoverText="Move player up"
                        symbol="arrow_circle_up"
                        clickFunction={moveUp}
                    />
                {/if}
                {#if index < $roster.players.length - 1}
                    <MaterialButton
                        hoverText="Move player down"
                        symbol="arrow_circle_down"
                        clickFunction={moveDown}
                    />
                {/if}
            </div>
        </div>
    </div>

    <div class="player-characteristics">
        {#each rosterPlayer.player.playerStats as stat, i}
            <StatBlock
                char={characteristics[i]}
                value={getStat(stat, i)}
                change={alteredStats[i]}
            />
        {/each}
    </div>

    {#if !rosterPlayer.starPlayer && $showSkillButtons[index]}
        <div>
            <AddSkill {index} />
        </div>
    {/if}
    <div class="content">
        {#if tooManyBigGuys}
            <p class="big-guys">
                <i class="material-icons">warning</i>
                {$roster.players.filter((x) => x.player.bigGuy)
                    .length}/{$currentTeam.maxBigGuys} Big Guys
            </p>
        {/if}
        <div class="skills">
            <p class="mini-title">SKILLS:</p>
            {#if rosterPlayer.player.skills.length + (rosterPlayer?.alterations?.extraSkills?.length || 0) > 0}
                <SkillElement
                    playerSkillIds={rosterPlayer.player.skills}
                    extraSkillIds={rosterPlayer?.alterations?.extraSkills || []}
                />
            {:else}
                None
            {/if}
        </div>

        <div class="extraDetails">
            {#if $roster.players[index]?.alterations?.spp !== undefined}
                <label
                    ><span class="mini-title">SPP:</span>
                    <input
                        class="spp-input"
                        type="number"
                        placeholder="?"
                        bind:value={$roster.players[index].alterations.spp}
                    />
                </label>
            {:else if !rosterPlayer.starPlayer}0{/if}

            {#if $roster.mode !== 'exhibition' && !rosterPlayer.starPlayer}
                <label
                    ><span class="mini-title">MNG:</span>
                    <input
                        type="checkbox"
                        class="checkbox"
                        bind:checked={$roster.players[index].alterations.mng}
                    />
                </label>

                <label>
                    <span class="mini-title">NI:</span>
                    <input
                        class="spp-input"
                        type="number"
                        placeholder="?"
                        bind:value={$roster.players[index].alterations.ni}
                    />
                </label>

                <label>
                    <span class="mini-title">TR:</span>
                    <input
                        type="checkbox"
                        class="checkbox"
                        bind:checked={$roster.players[index].alterations.tr}
                    />
                </label>
            {/if}
        </div>

        <p>
            <span class="mini-title">Hiring Fee:</span>
            {rosterPlayer.player.cost > 0
                ? `${rosterPlayer.player.cost},000`
                : '-'}
        </p>
        <p class="current-value">
            <span class="mini-title">Current Value:</span>
            {currentCost}{currentCost > 0 ? ',000' : ''}
        </p>
    </div>
</section>

<style lang="scss">
    @import '../styles/colour';
    @import '../styles/font';
    input {
        border: 0;
        border-radius: 0;
        background: none;
        font-size: 16px;
    }
    div {
        input {
            margin-bottom: 0;
        }
    }
    .player-card {
        border-radius: 25px;
        position: relative;
        min-width: 300px;
        height: 100%;
        border: 2px solid $secondary-colour;
        &.danger {
            border-color: $main-colour;
        }
    }
    .header {
        background-color: $secondary-colour;
        color: white;
        border-radius: 20px 20px 0 0;
        padding: 10px;
        padding-bottom: 0;
        min-height: 52px;
        border: 2px solid $secondary-colour;
        h3 {
            margin: 0;
        }

        input {
            padding: 0;
            color: white;

            &::placeholder {
                color: #ddd;
            }
        }
        &.danger {
            background-color: $main-colour;
            border-color: $main-colour;
        }
    }
    .content {
        padding: 10px;
    }
    .player-number {
        width: 25px;
        line-height: 25px;
        border-radius: 50%;
        font-family: $display-font;
        text-align: center;
        font-size: 14px;
        right: 10px;
        top: 10px;
        background-color: white;
        color: $secondary-colour;
        position: absolute;
    }
    .player-characteristics {
        display: flex;
        position: relative;
        left: -2px;
    }
    .left-align {
        text-align: left;
    }
    .flex-container {
        display: flex;
    }

    .spp-input {
        width: 40px;
    }

    .mini-title {
        color: $main-colour;
        font-family: $display-font;
        margin: 0;
        i {
            vertical-align: text-bottom;
        }
    }

    .big-guys {
        color: $main-colour;
        font-family: $display-font;
        i {
            vertical-align: text-bottom;
        }
    }

    .extraDetails {
        display: flex;
        margin-bottom: 10px;
        & label {
            & span {
                vertical-align: middle;
            }
            & input {
                padding: 0;
                vertical-align: middle;
                &.checkbox {
                    margin: 3px;
                    margin-right: 10px;
                }
            }
        }
    }
    .skills {
        margin-bottom: 10px;
    }
    .current-value {
        margin-bottom: 0;
    }

    @media print {
        .flex-container {
            display: none;
        }
        .player-name {
            border-right: 0;
        }
    }
</style>
