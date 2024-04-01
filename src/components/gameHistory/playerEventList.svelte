<script lang="ts">
    import { flip } from 'svelte/animate';
    import { fade } from 'svelte/transition';
    import type { GameEvent } from '../../models/matchHistory.model';
    import { roster } from '../../store/teamRoster.store';
    import MaterialButton from '../uiComponents/materialButton.svelte';
    import { _ } from 'svelte-i18n';

    export let gameEvents: GameEvent[];
    export let allowDeletion: boolean = false;

    function removeEvent(gameEvent) {
        $roster.matchDraft.playingCoach.gameEvents =
            $roster.matchDraft.playingCoach.gameEvents.filter(
                (e) => e !== gameEvent
            );
    }
</script>

<div class="player-event-grid">
    {#each gameEvents.sort((a, b) => (a.turn || 0) - (b.turn || 0)) as gameEvent (gameEvent)}
        <div
            class="event"
            animate:flip={{ duration: 200 }}
            in:fade={{ duration: 200 }}
        >
            <div class="player-number">
                Player {gameEvent?.player?.number}
            </div>
            <div class="event-type">
                {$_('match.events.' + gameEvent.eventType)}
                {gameEvent.turn
                    ? $_('match.events.onTurn', {
                          values: { turn: gameEvent.turn },
                      })
                    : ''}
            </div>
            {#if allowDeletion}
                <MaterialButton
                    hoverText="Remove event"
                    symbol="delete"
                    clickFunction={() => removeEvent(gameEvent)}
                />
            {/if}
        </div>
    {/each}
</div>

<style lang="scss">
    .player-event-grid {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-top: 16px;

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

        .player-number {
            font-family: var(--display-font);
        }
    }
</style>
