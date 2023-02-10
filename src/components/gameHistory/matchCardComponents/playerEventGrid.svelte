<script lang="ts">
    import type {
        GameEvent,
        HistoricPlayer,
    } from '../../../models/matchHistory.model';

    export let gameEvents: GameEvent[];

    type EventTotal = {
        count: number;
        turns: number[];
        player: HistoricPlayer;
    };

    let eventTotals: EventTotal[];
    $: eventTotals = Object.values(
        gameEvents.reduce((allEvents, event) => {
            let currentEvent: EventTotal = allEvents[event.player.id] || {
                player: event.player,
                count: 0,
                turns: [],
            };
            currentEvent.count++;
            if (event.turn) {
                currentEvent.turns.push(event.turn);
            }
            return {
                ...allEvents,
                [event.player.id]: currentEvent,
            };
        }, {})
    );

    function turnsString(turns: number[]): string {
        if (turns.length < 1) return '';
        if (turns.length === 1) return 'on turn ' + turns[0];
        if (turns.length > 1) {
            return (
                'on turns ' +
                turns.slice(0, -1).join(', ') +
                ' and ' +
                turns.slice(-1)
            );
        }
    }
</script>

<div class="player-event-grid">
    {#each eventTotals as event}
        <div class="event">
            <div class="player">
                {event.player.number}
                {event.player.name}
            </div>
            <div class="event-type">
                <strong>{event.count}</strong>
                {turnsString(event.turns)}
                <!-- {gameEventTypeToTitle[event.eventType]}
                {event.turn ? `on turn ${event.turn}` : ''} -->
            </div>
        </div>
    {/each}
</div>

<style lang="scss">
    .player-event-grid {
        display: grid;
        flex-direction: column;
        gap: 4px;
        margin-top: 8px;
        grid-template-columns: repeat(2, 1fr);
        @media screen and (max-width: 630px) {
            grid-template-columns: 1fr;
        }

        .event {
            display: flex;
            flex-wrap: wrap;
            background-color: var(--secondary-background-colour);
            border-radius: 8px;
            padding: 8px;
            align-items: center;
            justify-content: space-between;
            &-type {
                text-align: left;
            }
        }

        .player {
            font-family: var(--display-font);
        }
    }
</style>
