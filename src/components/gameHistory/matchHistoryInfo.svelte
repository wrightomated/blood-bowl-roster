<script lang="ts">
    import { onMount } from 'svelte';
    import { quadInOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';
    import { categoryMap } from '../../data/stadium.data';
    import { weatherSymbol, weatherTables } from '../../data/weatherData.data';
    import { gameEventPluralMap } from '../../helpers/matchHistoryHelpers';
    import type { MatchHistoryRecord } from '../../models/matchHistory.model';

    import IconWithCaption from '../uiComponents/iconWithCaption.svelte';
    import MatchInducements from './individualControls/matchInducements.svelte';
    import TitleWithResult from './matchCardComponents/titleWithResult.svelte';

    export let match: MatchHistoryRecord;

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
        <MatchInducements showTitle={true} />
        <div class="events">
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
        <div>
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
        // display: flex;
        // flex-flow: row wrap;
        border-radius: 12px;
        color: white;
        background-color: var(--main-colour);

        // first break 720 last 600
        // GROD
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        @media screen and (max-width: 720px) {
            grid-template-columns: 1fr;
        }
        @media screen and (max-width: 450px) {
            grid-template-columns: repeat(3, 1fr);
        }
        @media screen and (max-width: 360px) {
            grid-template-columns: repeat(2, 1fr);
        }
        // grid-template-rows: 12px 12px 12px;
    }
</style>
