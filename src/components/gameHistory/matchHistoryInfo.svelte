<script lang="ts">
    import { quintOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';
    import { inducementAndStarsInRoster } from '../../store/currentInducements.store';
    import IconWithCaption from '../uiComponents/iconWithCaption.svelte';
    import Pill from '../uiComponents/pill.svelte';
    import TitleWithResult from './matchCardComponents/titleWithResult.svelte';

    const numberFormatter = new Intl.NumberFormat();

    // $: formattedInducements = $inducementAndStarsInRoster
    //     .map((x) => `${x[0]}${x[1] ? ` ${x[1]}` : ''}`)
    //     .join(',');
</script>

<article class="content" transition:slide={{ duration: 200, easing: quintOut }}>
    <!-- <div>League Match</div> -->
    <div class="match-modifiers">
        <IconWithCaption icon="sunny" caption="Sunny" />
        <IconWithCaption icon="stadium" caption="Sloping Pitch" />
        <IconWithCaption icon="sports_football" caption="Soulstone Ball" />
    </div>
    <div class="statistics">
        <TitleWithResult title="Petty Cash" result={30000} />
        <TitleWithResult title="Fan Factor" result={6} />
        <TitleWithResult title="League Points" result={2} />
        <TitleWithResult title="Winnings" result={100000} />
        <!-- <div>
            <p>Petty Cash: 30,000</p>
            <p>Fan factor: 2</p>
        </div>
        <div>
            <p>Winnings: {numberFormatter.format(100000)}</p>
            <p>League Points: 6</p>
        </div> -->
    </div>

    <!-- <div>Petty Cash: 30k</div>
    <div>League Points: 6</div>
    <div>Fan factor: 2</div> -->
    <!-- TODO: Make inducement component -->

    <!-- <div>Inducements:</div> -->
    <div class="additional">
        <div class="inducements">
            <h3>Inducements</h3>
            <div>
                {#each $inducementAndStarsInRoster as i}
                    <div>{i[0]}{i[1] > 1 ? ` x ${i[1]}` : ''}</div>
                {/each}
            </div>
        </div>
        <div class="events">
            <TitleWithResult title="Touchdowns" result={3} background="none" />
            <TitleWithResult title="Passes" result={2} background="none" />
            <TitleWithResult title="Casualties" result={1} background="none" />
            <TitleWithResult title="Kills" result={0} background="none" />
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
    .inducements {
        flex: 2;
        padding: 20px;
        border-radius: 12px;
        background-color: var(--secondary-background-colour);
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
        display: flex;
        flex-flow: row wrap;
    }
</style>
