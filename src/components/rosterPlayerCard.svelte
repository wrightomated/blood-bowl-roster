<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import MaterialButton from './materialButton.svelte';
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

    export let index: number;

    let showAddSkills: boolean = false;

    $: rosterPlayer = $roster.players[index];
    $: numberOfPlayerType = $roster.players.filter(
        (x) => x.player.id === rosterPlayer.player.id,
    ).length;
    $: maxOfPlayerType =
        $currentTeam.players.find((x) => x.id === rosterPlayer.player.id)
            ?.max || 0;
    $: danger = numberOfPlayerType > maxOfPlayerType;
    $: playerSkillIds = rosterPlayer.player.skills.concat(
        rosterPlayer?.alterations?.extraSkills || [],
    );
    $: currentCost =
        rosterPlayer?.alterations?.mng || rosterPlayer?.alterations?.tr
            ? 0
            : rosterPlayer.player.cost +
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
    const playerCostString = () => {
        return rosterPlayer.player.cost > 0
            ? `${rosterPlayer.player.cost},000`
            : '-';
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
        showAddSkills = !showAddSkills;
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

<section class="player-card">
    <div class="header">
        <div class="player-number">{index + 1}</div>
        <h3 class="player-name left-align">
            {#if rosterPlayer.starPlayer}
                {rosterPlayer.player.position}
            {:else}
                <input
                    aria-labelledby="name-header"
                    placeholder="Player Name"
                    bind:value={$roster.players[index].playerName}
                />
            {/if}
        </h3>
        <div class="player-position left-align">
            {#if rosterPlayer.starPlayer}
                Star Player
            {:else}
                {rosterPlayer.player.position}
                {#if danger}
                    <span class="danger">
                        <i class="material-icons">warning</i>
                        {numberOfPlayerType}/{maxOfPlayerType}
                    </span>
                {/if}
                {#if (rosterPlayer.alterations?.advancements || 0) < 6}
                    <span class="add-skill">
                        <MaterialButton
                            hoverText="Player advancement"
                            symbol="elevator"
                            clickFunction={toggleShowSkills}
                        />
                    </span>
                {/if}
            {/if}
        </div>
    </div>
    <!-- <div class="controls left-align">
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
    </div> -->
    <div class="content">
        <div class="player-characteristics">
            {#each rosterPlayer.player.playerStats as stat, i}
                <!-- <div
                    class:improved={alteredStats[i] > 0}
                    class:degraded={alteredStats[i] < 0}
                >
                    <span>{characteristics[i]}</span>
                    {getStat(stat, i)}
                </div> -->
                <StatBlock
                    char={characteristics[i]}
                    value={getStat(stat, i)}
                    change={alteredStats[i]}
                />
            {/each}
        </div>

        <div class="skills">
            <div class="skills-title">SKILLS:</div>
            {#if playerSkillIds.length > 0}
                <SkillElement {playerSkillIds} />
            {:else}
                None
            {/if}
        </div>

        <div>
            {#if $roster.players[index]?.alterations?.spp !== undefined}
                <input
                    class="spp-input"
                    type="number"
                    aria-label="unspent spp"
                    placeholder="?"
                    bind:value={$roster.players[index].alterations.spp}
                />
            {:else}0{/if}
        </div>
        {#if $roster.mode !== 'exhibition' && !rosterPlayer.starPlayer}
            <div>
                <input
                    type="checkbox"
                    aria-labelledby="mng-header"
                    bind:checked={$roster.players[index].alterations.mng}
                />
            </div>
            <div>
                <input
                    class="spp-input"
                    type="number"
                    aria-label="Niggling Injuries"
                    placeholder="?"
                    bind:value={$roster.players[index].alterations.ni}
                />
            </div>
            <div>
                <input
                    type="checkbox"
                    aria-labelledby="tr-header"
                    bind:checked={$roster.players[index].alterations.tr}
                />
            </div>
        {:else if $roster.mode !== 'exhibition' && rosterPlayer.starPlayer}
            <div>-</div>
            <div>-</div>
            <div>-</div>
        {/if}
        <div class="cost-area">
            <div>Hiring Fee: {playerCostString()}</div>
            <div>Current Value: {currentCost},000 GP</div>
        </div>
    </div>
    {#if !rosterPlayer.starPlayer && showAddSkills && (rosterPlayer.alterations?.advancements || 0) < 6}
        <div>
            <div colspan="16">
                <AddSkill {index} />
            </div>
        </div>
    {/if}
</section>

<style lang="scss">
    @import '../styles/colour';
    @import '../styles/font';
    input {
        border: 0;
        border-radius: 0;
        background: none;
    }
    div {
        input {
            margin-bottom: 0;
        }
    }
    .player-card {
        // border: 2px solid;
        border-radius: 25px;
        // padding: 20px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
            0 6px 6px rgba(0, 0, 0, 0.23);
        position: relative;
        min-width: 300px;
    }
    .header {
        background-color: $main-colour;
        color: white;
        border-radius: 25px 25px 0 0;
        padding: 10px;
        h3 {
            margin: 0;
            font-size: 20px;
        }

        input {
            padding: 0;
            color: white;

            &::placeholder {
                color: #ccc;
            }
        }
    }
    .content {
        // padding: 10px;
    }
    .player-number {
        width: 20px;
        line-height: 20px;
        border-radius: 50%;
        text-align: center;
        font-size: 12px;
        right: 10px;
        top: 10px;
        background-color: white;
        color: $main-colour;
        position: absolute;
        border: 1;
    }
    .player-characteristics {
        display: flex;
    }
    .left-align {
        text-align: left;
    }
    .flex-container {
        display: flex;
    }
    .danger {
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

    .skills {
        padding: 10px;
        &-title {
            color: $main-colour;
            font-family: $display-font;
        }
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
