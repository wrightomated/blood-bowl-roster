<script lang="ts">
    import { maxPlayerNumber, roster } from '../store/teamRoster.store';
    import MaterialButton from './uiComponents/materialButton.svelte';
    import SkillElement from './skillElement.svelte';
    import { currentTeam } from '../store/currentTeam.store';
    import type { StarPlayer } from '../models/player.model';
    import AddSkill from './addSkill.svelte';
    import {
        characteristicMaxValue,
        characteristicMinValue,
    } from '../data/statOrder.data';
    import { showSkillButtons } from '../store/showSkillButtons.store';
    import { blurOnEscapeOrEnter } from '../helpers/blurOnEscapeOrEnter';

    export let index: number;
    let playerNumber = index + 1;

    $: rosterPlayer = $roster.players[index];
    $: numberOfPlayerType = $roster.players.filter(
        (x) => x.player.id === rosterPlayer.player.id
    ).length;
    $: maxOfPlayerType =
        $currentTeam.players.find((x) => x.id === rosterPlayer.player.id)
            ?.max || 0;
    $: danger = numberOfPlayerType > maxOfPlayerType;
    $: tooManyBigGuys =
        rosterPlayer.player.bigGuy &&
        $currentTeam.maxBigGuys <
            $roster.players.filter((x) => x.player.bigGuy).length;
    $: playerSkillIds = rosterPlayer.player.skills.concat(
        rosterPlayer?.alterations?.extraSkills || []
    );
    $: currentCost =
        rosterPlayer?.alterations?.mng || rosterPlayer?.alterations?.tr
            ? 0
            : ((rosterPlayer.player.id === 56 ||
                  rosterPlayer.player.id === 73) &&
              $roster.mode !== 'exhibition'
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
                (p) => p.player.id === twoForOne
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

<tr>
    <td>
        <input
            class="player-number"
            aria-label="Player Number"
            type="number"
            min="1"
            max={maxPlayerNumber}
            on:blur={changeNumber}
            bind:value={playerNumber}
            use:blurOnEscapeOrEnter
        /></td
    >
    <td class="player-name left-align" data-cy={`player-${index}-name`}>
        {#if rosterPlayer.starPlayer}
            {rosterPlayer.player.position}
        {:else}
            <input
                aria-labelledby="name-header"
                placeholder="Player Name"
                bind:value={$roster.players[index].playerName}
                use:blurOnEscapeOrEnter
            />
        {/if}
    </td>
    <td class="controls left-align">
        <div class="flex-container">
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
        </div>
    </td>
    <td class="player-position left-align">
        {#if rosterPlayer.starPlayer}
            Star Player
        {:else if rosterPlayer?.alterations?.journeyman}
            Journeyman
            <span class="add-skill">
                <MaterialButton
                    hoverText="Purchase journeyman"
                    symbol="paid"
                    clickFunction={buyJourneyman}
                />
            </span>
        {:else}
            {rosterPlayer.player.position}
            {#if danger}
                <span class="danger">
                    <i class="material-icons">warning</i>
                    {numberOfPlayerType}/{maxOfPlayerType}
                </span>
            {/if}
            <span class="add-skill">
                <MaterialButton
                    hoverText="Player advancement"
                    symbol="elevator"
                    clickFunction={toggleShowSkills}
                />
            </span>
        {/if}
        {#if tooManyBigGuys}
            <br />
            <span class="danger">
                {$roster.players.filter((x) => x.player.bigGuy)
                    .length}/{$currentTeam.maxBigGuys} Big Guys
            </span>
        {/if}
        {#if sevensSpecialistsAmount > 4}
            <br />
            <span class="danger">{sevensSpecialistsAmount}/4 Specialists</span>
        {/if}
    </td>

    {#each rosterPlayer.player.playerStats as stat, i}
        <td
            class:improved={alteredStats[i] > 0}
            class:degraded={alteredStats[i] < 0}>{getStat(stat, i)}</td
        >
    {/each}
    <td class="left-align">
        <SkillElement {playerSkillIds} />
    </td>
    <td
        >{rosterPlayer.player.cost > 0 && !rosterPlayer?.alterations?.journeyman
            ? `${rosterPlayer.player.cost},000`
            : '-'}</td
    >
    {#if $roster.format === 'elevens'}
        <td>
            {#if $roster.players[index]?.alterations?.spp !== undefined}
                <input
                    class="spp-input"
                    type="number"
                    aria-labelledby="spp-header"
                    placeholder="?"
                    use:blurOnEscapeOrEnter
                    bind:value={$roster.players[index].alterations.spp}
                />
            {:else}0{/if}
        </td>
    {/if}
    {#if $roster.mode !== 'exhibition' && !rosterPlayer.starPlayer}
        <td
            ><input
                type="checkbox"
                aria-labelledby="mng-header"
                bind:checked={$roster.players[index].alterations.mng}
            /></td
        >
        {#if $roster.format === 'elevens'}
            <td>
                <input
                    class="spp-input"
                    type="number"
                    aria-label="Niggling Injuries"
                    placeholder="?"
                    bind:value={$roster.players[index].alterations.ni}
                />
            </td>

            <td
                ><input
                    type="checkbox"
                    aria-labelledby="tr-header"
                    use:blurOnEscapeOrEnter
                    bind:checked={$roster.players[index].alterations.tr}
                /></td
            >
        {/if}
    {:else if $roster.mode !== 'exhibition' && rosterPlayer.starPlayer}
        <td>-</td>
        <td>-</td>
        <td>-</td>
    {/if}

    <td>{currentCost}{currentCost > 0 ? ',000' : ''}</td>
</tr>
{#if !rosterPlayer.starPlayer && $showSkillButtons[index]}
    <tr>
        <td colspan="16">
            <AddSkill {index} />
        </td>
    </tr>
{/if}

<style lang="scss">
    @import '../styles/colour';
    input {
        border: 0;
        border-radius: 0;
        background: none;

        @media screen and (max-width: 450px) {
            font-size: 16px;
        }
    }
    td {
        input {
            margin-bottom: 0;
        }
    }
    .left-align {
        text-align: left;
    }
    .flex-container {
        display: flex;
    }
    .danger {
        color: $main-colour;
        i {
            vertical-align: text-bottom;
        }
    }
    .add-skill {
        vertical-align: middle;
        display: inline-block;
        margin-top: -1px;
    }
    .spp-input {
        width: 60px;
        text-align: center;
        margin-right: -15px;
    }
    .player-number {
        width: 30px;
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
        }
    }
    .improved {
        color: green;
    }
    .degraded {
        color: $main-colour;
    }
    @media print {
        .flex-container {
            display: none;
        }
        .player-name {
            border-right: 0;
        }
        .controls {
            border-left: 0;
        }
        .add-skill {
            display: none;
        }
    }
</style>
