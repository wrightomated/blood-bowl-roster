<script lang="ts">
    import { roster } from '../../store/teamRoster.store';
    import MaterialButton from '../uiComponents/materialButton.svelte';
    import { currentTeam } from '../../store/currentTeam.store';
    import AddSkill from '../addSkill.svelte';

    import { showSkillButtons } from '../../store/showSkillButtons.store';
    import { blurOnEscapeOrEnter } from '../../helpers/blurOnEscapeOrEnter';
    import { journeymanPosition } from '../../helpers/journeymenHelper';
    import PlayerNumber from './playerNumber.svelte';
    import { modalState } from '../../store/modal.store';
    import PlayerCharacteristics from '../playerCard/playerCharacteristics.svelte';
    import PlayerCardMainContent from '../playerCard/playerCardMainContent.svelte';
    import EditPlayer from '../playerCard/editPlayer.svelte';
    import DeletePlayerWarning from './deletePlayerWarning.svelte';
    import { gameSettings } from '../../store/gameSettings.store';

    export let index: number;

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

    $: nonLinemen = $currentTeam.players
        .filter((p) => p.max < 12)
        .map((x) => x.id);
    $: positionalsAmount =
        nonLinemen.includes(rosterPlayer.player.id) &&
        $roster.players.filter((p) => nonLinemen.includes(p.player.id)).length;

    function removePlayer() {
        modalState.set({
            ...$modalState,
            isOpen: true,
            canClose: true,
            component: DeletePlayerWarning,
            componentProps: {
                index,
                rosterPlayer,
            },
        });
    }
    const openAdvancement = () => {
        modalState.set({
            ...$modalState,
            isOpen: true,
            canClose: true,
            compact: true,
            component: EditPlayer,
            componentProps: {
                index,
            },
        });
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
    <header class="header" class:danger>
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
            <PlayerNumber {index} variant="card" />
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
                        clickFunction={openAdvancement}
                    />
                    <MaterialButton
                        hoverText="Duplicate player"
                        symbol="group_add"
                        clickFunction={() => roster.duplicatePlayer(index)}
                    />
                {/if}
                {#if rosterPlayer?.alterations?.journeyman}
                    <MaterialButton
                        hoverText="Purchase journeyman"
                        symbol="paid"
                        clickFunction={buyJourneyman}
                    />
                {/if}
            </div>
        </div>
    </header>

    <PlayerCharacteristics {rosterPlayer} />

    {#if !rosterPlayer.starPlayer && $showSkillButtons[index]}
        <div>
            <AddSkill {index} />
        </div>
    {/if}
    <div class="content">
        {#if tooManyBigGuys}
            <p class="big-guys">
                <i class="material-symbols-outlined">warning</i>
                {$roster.players.filter((x) => x.player.bigGuy)
                    .length}/{$currentTeam.maxBigGuys} Big Guys
            </p>
        {/if}
        {#if positionalsAmount > $gameSettings?.maxPositionals}
            <p class="sevens-over-four">
                <i class="material-symbols-outlined">warning</i>
                {positionalsAmount} / {$gameSettings.maxPositionals} Specialists
            </p>
        {/if}

        <PlayerCardMainContent {index} />
    </div>
</section>

<style lang="scss">
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
        max-width: 776px;
        height: 100%;
        border: var(--secondary-border);
        background-color: white;
        box-shadow: 0 2px 3px 0 rgba(60, 64, 67, 0.3),
            0 6px 10px 4px rgba(60, 64, 67, 0.15);
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
        border: var(--secondary-border);
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

    .left-align {
        text-align: left;
    }
    .player-controls {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .big-guys,
    .sevens-over-four {
        color: var(--main-colour);
        font-family: var(--display-font);
        i {
            vertical-align: text-bottom;
        }
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
