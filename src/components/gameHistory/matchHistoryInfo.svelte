<script lang="ts">
    import { quadInOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';
    import { categoryMap } from '../../data/stadium.data';
    import { weatherTables } from '../../data/weatherData.data';
    import {
        gameEventPluralMap,
        mapHistoryInducementsForDisplay,
    } from '../../helpers/matchHistoryHelpers';
    import type {
        GameEvent,
        GameEventType,
        MatchHistoryRecord,
    } from '../../models/matchHistory.model';
    import { modalState } from '../../store/modal.store';
    import { roster } from '../../store/teamRoster.store';

    import IconWithCaption from '../uiComponents/iconWithCaption.svelte';
    import MaterialButton from '../uiComponents/materialButton.svelte';
    import DeleteMatchHistory from './deleteMatchHistory.svelte';
    import MatchInducements from './individualControls/matchInducements.svelte';
    import PlayerEventGrid from './matchCardComponents/playerEventGrid.svelte';
    import TitleWithResult from './matchCardComponents/titleWithResult.svelte';

    export let match: MatchHistoryRecord;

    let selectedEvent: GameEventType = 'touchdown';
    let filteredSingleEvents: GameEvent[] = [];

    const inducements = mapHistoryInducementsForDisplay(
        match.playingCoach.inducementsHired
    );

    const weather = weatherTables.find((x) => x.type === match.weather.table);
    const stadium = categoryMap[match.stadium.category].attributes
        ? categoryMap[match.stadium.category]?.attributes.find(
              (a) => a.roll === match.stadium.attribute
          )?.attribute
        : 'Standard';

    const teamEvents = Object.entries(match.gameEventTally)
        .filter((entry) => entry[0] !== 'opponentScore')
        .sort((a, b) => a[0].localeCompare(b[0]));

    filteredSingleEvents = filterEvents();

    function deleteMatch() {
        modalState.set({
            ...$modalState,
            isOpen: true,
            canClose: false,
            component: DeleteMatchHistory,
            componentProps: {
                matchRecord: match,
            },
        });
    }

    function selectEvent(event: string) {
        selectedEvent = event as GameEventType;
        filteredSingleEvents = filterEvents();
    }

    function filterEvents() {
        return match.playingCoach.gameEventRecording === 'individual'
            ? match.playingCoach.gameEvents.filter(
                  (x) => x.eventType === selectedEvent
              )
            : [];
    }
</script>

<article
    class="content"
    transition:slide={{ duration: 300, easing: quadInOut }}
>
    <div class="match-modifiers">
        {#if $roster.format === 'elevens'}
            <IconWithCaption icon={weather.icon} caption={weather.type} />
        {/if}
        {#if match.playingCoach.mvp}
            <IconWithCaption
                title="MVP"
                icon="military_tech"
                caption={match.playingCoach.mvp.name +
                    ' ' +
                    match.playingCoach.mvp.number}
            />
        {:else if $roster.mode === 'exhibition' && match?.isLeagueMatch}
            <IconWithCaption
                caption={`Tournament Point${
                    match.playingCoach.leaguePoints === 1 ? '' : 's'
                }`}
                stringIcon={match.playingCoach.leaguePoints + ''}
            />
        {/if}
        {#if $roster.format === 'elevens'}
            <IconWithCaption icon="stadium" caption={stadium} />
        {/if}
    </div>
    {#if $roster.mode === 'league'}
        <div class="statistics">
            <TitleWithResult
                title="Petty Cash"
                result={match.playingCoach.pettyCash}
            />
            <TitleWithResult
                title="Fan Factor"
                result={match.playingCoach.fanFactor}
            />
            <TitleWithResult
                title="League Points"
                result={match.playingCoach.leaguePoints}
            />
            <TitleWithResult
                title="Winnings"
                result={match.playingCoach.winnings}
            />
        </div>
    {/if}

    <div class="additional">
        <MatchInducements showTitle={true} {inducements} />
        <div
            class="events"
            class:events--solo={match.playingCoach.inducementsHired.length <= 0}
            class:events--total={match.playingCoach.gameEventRecording ===
                'total'}
        >
            {#each teamEvents as event}
                <TitleWithResult
                    title={gameEventPluralMap[event[0]]}
                    result={event[1]}
                    background={event[0] === selectedEvent ? 'main' : 'none'}
                    clickFunction={match.playingCoach.gameEventRecording ===
                        'individual' && event[1] > 0
                        ? () => selectEvent(event[0])
                        : undefined}
                />
            {/each}
        </div>
    </div>
    {#if match.playingCoach.gameEventRecording === 'individual'}
        <PlayerEventGrid gameEvents={filteredSingleEvents} />
    {/if}
    {#if match.notes}
        <div class="match-notes">
            <h4>Notes</h4>
            {match.notes}
        </div>
    {/if}
    <div class="history-controls">
        <div>
            <MaterialButton
                hoverText="Delete match history"
                symbol="delete_forever"
                clickFunction={deleteMatch}
            />
        </div>
    </div>
</article>

<style lang="scss">
    .content {
        padding: 0 12px 12px 12px;
    }
    .match-modifiers {
        display: flex;
        justify-content: space-around;
        gap: 8px;
    }
    .statistics {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }

    .additional {
        display: flex;
        gap: 8px;
        margin-top: 8px;

        @media screen and (max-width: 450px) {
            flex-flow: column nowrap;
        }
    }
    .events {
        flex: 1;
        border-radius: 12px;
        background-color: var(--secondary-background-colour);

        // GROD
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        @media screen and (max-width: 720px) {
            grid-template-columns: 1fr;
        }
        @media screen and (max-width: 450px) {
            grid-template-columns: repeat(3, 1fr);
        }
        @media screen and (max-width: 420px) {
            grid-template-columns: repeat(2, 1fr);
        }

        &--solo {
            @media screen and (min-width: 721px) {
                grid-template-columns: repeat(6, 1fr);
            }
            @media screen and (max-width: 720px) and (min-width: 451px) {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        &--total {
            background-color: var(--main-colour);
            color: white;
        }
    }
    .match-notes {
        margin-top: 8px;
        border-radius: 12px;
        padding: 12px;
        background-color: var(--secondary-background-colour);
        h4 {
            margin-block-start: 0;
            margin-block-end: 0;
        }
    }
    .history-controls {
        width: 100%;

        div {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--secondary-background-colour);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 16px auto 0 auto;
        }
    }
</style>
