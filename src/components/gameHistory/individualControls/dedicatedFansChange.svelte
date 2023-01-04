<script lang="ts">
    import { roster } from '../../../store/teamRoster.store';
    import Die from '../../dice/die.svelte';

    export let result: string;

    $: changeDedicatedFans = $roster.matchDraft?.playingCoach?.fanChange || 0;
    $: dedicatedFansString = `Your dedicated fans will ${
        changeDedicatedFans === 0
            ? 'remain the same.'
            : changeDedicatedFans === 1
            ? 'increase by one.'
            : 'decrease by one.'
    }`;

    let roll: number;

    function yourRoll(event) {
        roll = event.detail.result;
        updateFanChange();
    }

    function updateFanChange() {
        changeDedicatedFans = 0;
        if (result === 'Won' && roll >= $roster.extra.dedicated_fans) {
            changeDedicatedFans = 1;
        }
        if (result === 'Lost' && roll < $roster.extra.dedicated_fans) {
            changeDedicatedFans = -1;
        }
        $roster.matchDraft.playingCoach.fanChange = changeDedicatedFans;
    }
</script>

<div class="boxed-div">
    <label for="dedicated-fans-change">Dedicated Fans Roll</label>
    {#if result !== 'Drew'}
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

<style>
    @media screen and (max-width: 760px) {
        .boxed-div {
            /* grid-column-start: span 2; */
        }
    }
</style>
