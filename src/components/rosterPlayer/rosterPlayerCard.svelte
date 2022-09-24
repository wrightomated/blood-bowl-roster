<script lang="ts">
    import { maxPlayerNumber, roster } from '../../store/teamRoster.store';
    import MaterialButton from '../uiComponents/materialButton.svelte';
    import SkillElement from '../skillElement.svelte';
    import { currentTeam } from '../../store/currentTeam.store';
    import type { StarPlayer } from '../../models/player.model';
    import AddSkill from '../addSkill.svelte';
    import {
        characteristicMaxValue,
        characteristicMinValue,
        characteristics,
    } from '../../data/statOrder.data';
    import StatBlock from '../playerCard/statBlock.svelte';
    import { showSkillButtons } from '../../store/showSkillButtons.store';
    import { blurOnEscapeOrEnter } from '../../helpers/blurOnEscapeOrEnter';
    import { journeymanPosition } from '../../helpers/journeymenHelper';

    export let index: number;
    let playerNumber = index + 1;

    $: rosterPlayer = $roster.players[index];
    $: numberOfPlayerType = $roster.players.filter(
        (x) => x.player.id === rosterPlayer.player.id
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
        rosterPlayer?.alterations?.mng || rosterPlayer?.alterations?.tr
            ? 0
            : ((rosterPlayer.player.id === 56 ||
                  rosterPlayer.player.id === 73) &&
              $roster.mode !== 'exhibition' &&
              $roster.format !== 'dungeon bowl'
                  ? 0
                  : rosterPlayer.player.cost) +
              (rosterPlayer.alterations?.valueChange || 0);
    $: alteredStats = characteristicMaxValue.map(
        (_, i) =>
            (rosterPlayer?.alterations?.statChange?.[i] || 0) -
            (rosterPlayer?.alterations?.injuries?.[i] || 0)
    );
    $: nonLinemen = $currentTeam.players
        .filter((p) => p.max < 12)
        .map((x) => x.id);
    $: sevensSpecialistsAmount =
        $roster.format === 'sevens' &&
        nonLinemen.includes(rosterPlayer.player.id) &&
        $roster.players.filter((p) => nonLinemen.includes(p.player.id)).length;

    function removePlayer() {
        const firePlayer = $roster?.leagueRosterStatus === 'commenced';
        removeTwoForOne(firePlayer) || roster.removePlayer([index], firePlayer);
    }
    function removeTwoForOne(firePlayer: boolean) {
        if (rosterPlayer.starPlayer) {
            const twoForOne = (rosterPlayer.player as StarPlayer).twoForOne;
            const tfoIndex = $roster.players.findIndex(
                (p) => p.player.id === twoForOne
            );
            if (twoForOne) {
                roster.removePlayer([index, tfoIndex], firePlayer);
                return true;
            }
        }
        return false;
    }

    const toggleShowSkills = () => {
        showSkillButtons.set(
            $showSkillButtons.map((x, i) => (i === index ? !x : x))
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

    const changeNumber = () => {
        if (
            !Number.isInteger(playerNumber) ||
            playerNumber > maxPlayerNumber ||
            playerNumber < 1
        ) {
            playerNumber = index + 1;
        } else {
            roster.updatePlayerNumber(index, playerNumber);
            playerNumber = index + 1;
        }
    };

    const buyJourneyman = () => {
        const extraSkills = rosterPlayer.alterations.extraSkills.filter(
            (id) => id !== 71 && id !== 710
        );
        roster.updatePlayer(
            {
                ...rosterPlayer,
                alterations: {
                    ...rosterPlayer.alterations,
                    extraSkills,
                    journeyman: false,
                },
            },
            index
        );
        roster.updateTreasury(-rosterPlayer.player.cost);
    };
</script>

<section class="player-card" class:danger>
    <div class="header" class:danger>
        <h3 class="player-name left-align">
            {#if rosterPlayer.starPlayer}
                {rosterPlayer.player.position}
            {:else}
                <input
                    aria-label="player name"
                    placeholder="Player Name"
                    use:blurOnEscapeOrEnter
                    bind:value={$roster.players[index].playerName}
                />
            {/if}
        </h3>
        <div>
            <input
                class="player-number"
                aria-label="Player Number"
                type="number"
                min="1"
                inputmode="numeric"
                max={maxPlayerNumber}
                on:blur={changeNumber}
                bind:value={playerNumber}
                use:blurOnEscapeOrEnter
            />
        </div>
        <div class="player-position left-align">
            <div class="player-controls">
                {#if rosterPlayer.starPlayer}
                    <p>Star Player</p>
                {:else if rosterPlayer?.alterations?.journeyman}
                    <p>{journeymanPosition(rosterPlayer.player.position)}</p>
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
                    clickFunction={() => removePlayer()}
                />

                {#if !rosterPlayer.starPlayer}
                    <MaterialButton
                        hoverText="Player advancement"
                        symbol="elevator"
                        clickFunction={toggleShowSkills}
                    />
                {/if}
                {#if rosterPlayer?.alterations?.journeyman}
                    <MaterialButton
                        hoverText="Purchase journeyman"
                        symbol="paid"
                        clickFunction={buyJourneyman}
                    />
                {/if}
                <!-- {#if index > 0}
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
                {/if} -->
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
        {#if sevensSpecialistsAmount > 4}
            <p class="sevens-over-four">
                <i class="material-icons">warning</i>
                {sevensSpecialistsAmount} / 4 Specialists
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
            {#if $roster.format !== 'sevens'}
                {#if $roster.players[index]?.alterations?.spp !== undefined}
                    <label
                        ><span class="mini-title">SPP:</span>
                        <input
                            class="spp-input"
                            type="number"
                            placeholder="?"
                            inputmode="numeric"
                            use:blurOnEscapeOrEnter
                            bind:value={$roster.players[index].alterations.spp}
                        />
                    </label>
                {:else if !rosterPlayer.starPlayer}0{/if}
            {/if}

            {#if $roster.mode !== 'exhibition' && !rosterPlayer.starPlayer}
                <label
                    ><span class="mini-title">MNG:</span>
                    <input
                        type="checkbox"
                        class="checkbox"
                        use:blurOnEscapeOrEnter
                        bind:checked={$roster.players[index].alterations.mng}
                    />
                </label>
                {#if $roster.format !== 'sevens'}
                    <label>
                        <span class="mini-title">NI:</span>
                        <input
                            class="spp-input"
                            type="number"
                            placeholder="?"
                            inputmode="numeric"
                            use:blurOnEscapeOrEnter
                            bind:value={$roster.players[index].alterations.ni}
                        />
                    </label>

                    <label>
                        <span class="mini-title">TR:</span>
                        <input
                            type="checkbox"
                            class="checkbox"
                            use:blurOnEscapeOrEnter
                            bind:checked={$roster.players[index].alterations.tr}
                        />
                    </label>
                {/if}
            {/if}
        </div>

        <p>
            <span class="mini-title">Hiring Fee:</span>
            {rosterPlayer.player.cost > 0 &&
            !rosterPlayer?.alterations?.journeyman
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
    @import '../../styles/font';
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
        border: 2px solid var(--secondary-colour);
        &.danger {
            border-color: var(--main-colour);
        }
    }
    .header {
        background-color: var(--secondary-colour);
        color: white;
        border-radius: 20px 20px 0 0;
        padding: 10px;
        padding-bottom: 0;
        min-height: 52px;
        border: 2px solid var(--secondary-colour);
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
            background-color: var(--main-colour);
            border-color: var(--main-colour);
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
        font-size: 16px;
        right: 10px;
        top: 10px;
        background-color: white;
        color: var(--secondary-colour);
        position: absolute;
        text-align: center;

        /* Chrome, Safari, Edge, Opera */
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        /* Firefox */
        &[type='number'] {
            -moz-appearance: textfield;
            color: var(--secondary-colour);
        }
    }
    .player-characteristics {
        display: flex;
        position: relative;
        left: -2px;
    }
    .left-align {
        text-align: left;
    }
    .player-controls {
        display: flex;
    }

    .spp-input {
        width: 40px;
    }

    .mini-title {
        color: var(--main-colour);
        font-family: $display-font;
        margin: 0;
    }

    .big-guys,
    .sevens-over-four {
        color: var(--main-colour);
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
        .player-controls {
            display: none;
        }
        .player-name {
            border-right: 0;
        }
    }
</style>
