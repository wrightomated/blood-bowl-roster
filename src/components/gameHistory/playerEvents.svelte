<script lang="ts">
    import { quadInOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';
    import { gameEventTypeToTitle } from '../../data/gameEventMap';
    import { gameEventPluralMap } from '../../helpers/matchHistoryHelpers';
    import type {
        GameEvent,
        GameEventTally,
        GameEventType,
    } from '../../models/matchHistory.model';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';
    import MaterialButton from '../uiComponents/materialButton.svelte';
    import ToggleButton from '../uiComponents/toggleButton.svelte';
    import PlayerEventList from './playerEventList.svelte';

    $: gameEvents = $roster.matchDraft.playingCoach.gameEvents ?? [];

    const options = ['total', 'individual'];
    let option =
        $roster.matchDraft.playingCoach.gameEventRecording ?? options[0];

    let gameEventTally: Partial<GameEventTally> = {
        touchdown: 0,
        completion: 0,
        casualty: 0,
        kill: 0,
        interception: 0,
        deflection: 0,
    };

    let selectedPlayer;
    let turn;
    let selectedEvent;

    $: filteredPlayers = $roster?.players?.filter((p) => !p.deleted);

    function selected(selectedOption: 'total' | 'individual') {
        option = selectedOption;
        $roster.matchDraft.playingCoach.gameEventRecording = selectedOption;
    }

    function addPlayerEvent() {
        const player = filteredPlayers.find(
            (p) => p?.playerId === selectedPlayer
        );
        const event: GameEvent = {
            eventType: selectedEvent,
            player: {
                name: player.playerName || player.player.position,
                number: player?.alterations?.playerNumber,
                id: player.playerId,
            },
            turn: turn ?? 0,
        };
        if ($roster.matchDraft.playingCoach?.gameEvents?.length > 0) {
            $roster.matchDraft.playingCoach.gameEvents = [...gameEvents, event];
        } else {
            $roster.matchDraft.playingCoach.gameEvents = [event];
        }
    }

    function playerShort(player: RosterPlayerRecord) {
        return (
            player.alterations.playerNumber +
            ' ' +
            (player.playerName || player.player.position)
        );
    }
</script>

<div
    class="player-events"
    in:slide|local={{ duration: 300, easing: quadInOut }}
    out:slide|local={{ duration: 300, easing: quadInOut }}
>
    <!-- <h3>Your player's events</h3> -->
    <ToggleButton
        options={['total', 'individual']}
        {selected}
        selectedIndex={options.findIndex((x) => x === option)}
    />
    {#if option === 'total'}
        <div class="total-events">
            {#each Object.keys(gameEventTally) as event}
                <div>
                    <label for="tally-{event}"
                        >{gameEventPluralMap[event]}</label
                    >
                    <input
                        type="number"
                        name="tally-{event}"
                        id="tally-{event}"
                        bind:value={$roster.matchDraft.gameEventTally[event]}
                        min="0"
                        max="9999"
                    />
                </div>
            {/each}
        </div>
    {:else if filteredPlayers?.length > 0}
        <div class="event-entry">
            <div>
                <label for="player-event-selector">Player</label>
                <select
                    id="player-event-selector"
                    name="player-event-selector"
                    bind:value={selectedPlayer}
                >
                    {#each filteredPlayers as p}
                        <option value={p.playerId}> {playerShort(p)}</option>
                    {/each}
                </select>
            </div>
            <div>
                <label for="event-type-selector">Event Type</label>
                <select
                    name="event-type-selector"
                    id="event-type-selector"
                    bind:value={selectedEvent}
                >
                    {#each Object.keys(gameEventTally) as event}
                        <option value={event}
                            >{gameEventTypeToTitle[event]}</option
                        >
                    {/each}
                </select>
            </div>
            <div>
                <label for="event-turn" class="turn-label">Turn</label>
                <div class="turn-input">
                    <input
                        name="event-turn"
                        id="event-turn"
                        type="number"
                        max="16"
                        min="0"
                        bind:value={turn}
                    />
                    <MaterialButton
                        clickFunction={addPlayerEvent}
                        hoverText="add event"
                        symbol="add_circle"
                    />
                </div>
            </div>
            <!-- <Button clickFunction={addPlayerEvent}>Add Event</Button> -->
        </div>
        <div class="player-event-grid">
            <PlayerEventList {gameEvents} allowDeletion={true} />
        </div>
    {:else}
        <div>No players</div>
    {/if}
    <br />
    <label for="opponent-touchdowns">Opponent's Total Touchdowns</label>
    <input
        class="opponent-touchdowns"
        type="number"
        name="opponent-touchdowns"
        id="opponent-touchdowns"
        min="0"
        max="999"
        bind:value={$roster.matchDraft.gameEventTally.opponentScore}
    />
</div>

<style lang="scss">
    label {
        margin-bottom: 4px;
    }
    .total-events {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 8px;
        margin-top: 16px;
        // text-align: ;
        @media screen and (max-width: 630px) {
            grid-template-columns: repeat(3, 1fr);
        }
        @media screen and (max-width: 450px) {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .label-input {
        text-align: center;
        label {
            text-transform: capitalize;
        }
    }
    .player-events {
        padding: 16px 0;
    }
    .event-entry {
        margin-top: 16px;
        display: flex;
        flex-flow: row wrap;
        gap: 8px;
        align-items: center;

        .turn-input {
            display: flex;
            align-items: center;
            gap: 8px;
        }
    }
</style>
