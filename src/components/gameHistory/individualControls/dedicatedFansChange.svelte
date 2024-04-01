<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { roster } from '../../../store/teamRoster.store';
    import Die from '../../dice/die.svelte';

    export let result: 'Won' | 'Lost' | 'Drew';
    export let concession: 'player' | 'opponent' | 'none' = 'none';

    $: changeDedicatedFans = $roster.matchDraft?.playingCoach?.fanChange || 0;

    $: changeValue =
        concession === 'player'
            ? $_('match.post.dec', { values: { n: concedeFanChange($roster) } })
            : changeDedicatedFans === 0
            ? $_('match.post.stay')
            : changeDedicatedFans === 1
            ? $_('match.post.inc')
            : $_('match.post.dec', { values: { n: 1 } });

    $: dedicatedFansString = $_('match.post.df_change', {
        values: { change: changeValue },
    });

    let roll: number;

    function yourRoll(event) {
        roll = event.detail.result;
        updateFanChange();
    }

    function updateFanChange() {
        changeDedicatedFans = 0;
        if (concession === 'player' && $roster.extra.dedicated_fans > 1) {
            changeDedicatedFans = -roll;
        } else if (
            (concession === 'opponent' || result === 'Won') &&
            roll >= $roster.extra.dedicated_fans
        ) {
            changeDedicatedFans = 1;
        } else if (result === 'Lost' && roll < $roster.extra.dedicated_fans) {
            changeDedicatedFans = -1;
        }
        $roster.matchDraft.playingCoach.fanChange = changeDedicatedFans;
    }

    function concedeFanChange(roster) {
        if (!roll) {
            return 'd3';
        }
        if (roll > 3) {
            roll = Math.ceil(roll / 2);
        }
        const currentFans: number = roster.extra.dedicated_fans;
        if (currentFans - roll >= 1) {
            return roll;
        } else {
            return currentFans - 1;
        }
    }
</script>

<div class="boxed-div">
    <label for="dedicated-fans-change">{$_('match.post.df')}</label>
    {#if concession === 'player'}
        <input
            type="number"
            id="fair-weather-fans"
            aria-label="fair weather fans"
            max="3"
            min="1"
            autocomplete="off"
            bind:value={roll}
            on:change={updateFanChange}
        />
        <Die faces={3} on:rolled={yourRoll} />
    {:else if result !== 'Drew'}
        <input
            type="number"
            id="fair-weather-fans"
            aria-label="fair weather fans"
            max="6"
            min="1"
            autocomplete="off"
            bind:value={roll}
            on:change={updateFanChange}
        />
        <Die faces={6} on:rolled={yourRoll} />
    {/if}
    <p>{dedicatedFansString}</p>
</div>
