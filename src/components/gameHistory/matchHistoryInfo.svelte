<script lang="ts">
    import { onMount } from 'svelte';
    import { quadInOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';
    import { categoryMap } from '../../data/stadium.data';
    import { weatherSymbol, weatherTables } from '../../data/weatherData.data';
    import {
        gameEventPluralMap,
        mapHistoryInducementsForDisplay,
    } from '../../helpers/matchHistoryHelpers';
    import type { MatchHistoryRecord } from '../../models/matchHistory.model';

    import IconWithCaption from '../uiComponents/iconWithCaption.svelte';
    import MatchInducements from './individualControls/matchInducements.svelte';
    import TitleWithResult from './matchCardComponents/titleWithResult.svelte';

    export let match: MatchHistoryRecord;

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
</script>

<article
    class="content"
    transition:slide={{ duration: 300, easing: quadInOut }}
>
    <div class="match-modifiers">
        <IconWithCaption icon={weather.icon} caption={weather.type} />
        {#if match.playingCoach.mvp}
            <IconWithCaption
                title="MVP"
                icon="military_tech"
                caption={match.playingCoach.mvp.name +
                    ' ' +
                    match.playingCoach.mvp.number}
            />
        {/if}

        <IconWithCaption icon="stadium" caption={stadium} />
    </div>
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

    <div class="additional">
        <!-- {#if match.playingCoach.inducementsHired.length > 0}
            {#each match.playingCoach.inducementsHired as inducement}
                <p>{inducement.id}</p>
            {/each}
        {/if} -->

        <MatchInducements showTitle={true} {inducements} />
        <div
            class="events"
            class:events--solo={match.playingCoach.inducementsHired.length <= 0}
        >
            {#each teamEvents as event}
                <TitleWithResult
                    title={gameEventPluralMap[event[0]]}
                    result={event[1]}
                    background="none"
                />
            {/each}
        </div>
    </div>
    {#if match.notes}
        <div class="match-notes">
            <h4>Notes</h4>
            {match.notes}
        </div>
    {/if}
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
        color: white;
        background-color: var(--main-colour);

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
</style>
