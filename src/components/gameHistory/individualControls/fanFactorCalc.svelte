<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { roster } from '../../../store/teamRoster.store';
    import Die from '../../dice/die.svelte';
    let yourFanCalc: HTMLElement, opFanCalc: HTMLElement;
    // let yourDie: number, opDie: number;

    function makeTransparent(element: HTMLElement) {
        element.style.opacity = '0.1';
    }

    function makeOpaque(element: HTMLElement) {
        element.style.opacity = '1';
    }

    function updateYourFanFactor() {
        $roster.matchDraft.playingCoach.fanFactor =
            ($roster.extra.dedicated_fans || 1) +
            ($roster.matchDraft.playingCoach.fairWeatherFans || 1);
    }
    function updateOpponentFanFactor() {
        if (!$roster.matchDraft.opponentCoach.dedicatedFans) {
            $roster.matchDraft.opponentCoach.dedicatedFans = 1;
        }
        if (!$roster.matchDraft.opponentCoach.fairWeatherFans) {
            $roster.matchDraft.opponentCoach.fairWeatherFans = 1;
        }

        $roster.matchDraft.opponentCoach.fanFactor =
            $roster.matchDraft.opponentCoach.dedicatedFans +
            ($roster.matchDraft.opponentCoach.fairWeatherFans || 1);
    }

    function yourRoll(event) {
        const result = event.detail.result;
        if (result) {
            $roster.matchDraft.playingCoach.fairWeatherFans = result;
            updateYourFanFactor();
        }
    }
    function opRoll(event) {
        const result = event.detail.result;
        if (result) {
            $roster.matchDraft.opponentCoach.fairWeatherFans = result;
            updateOpponentFanFactor();
        }
    }
</script>

<div class="boxed-div">
    <label for="your-fan-factor">{$_('match.pre.your')}</label>
    <span bind:this={yourFanCalc} on:click={() => makeOpaque(yourFanCalc)}>
        {$roster.extra.dedicated_fans} +
        <input
            type="number"
            id="fair-weather-fans"
            aria-label="fair weather fans"
            max="3"
            min="1"
            on:change={updateYourFanFactor}
            on:focus={() => makeOpaque(yourFanCalc)}
            bind:value={$roster.matchDraft.playingCoach.fairWeatherFans}
            autocomplete="off"
        />
        <Die faces={3} on:rolled={yourRoll} /> =
    </span>
    <input
        type="number"
        id="your-fan-factor"
        max="10"
        min="2"
        bind:value={$roster.matchDraft.playingCoach.fanFactor}
        autocomplete="off"
        on:change={() => makeTransparent(yourFanCalc)}
    />
</div>
<div class="boxed-div">
    <label for="op-fan-factor">{$_('match.pre.opponent')}</label>
    <span bind:this={opFanCalc} on:click={() => makeOpaque(opFanCalc)}>
        <input
            type="number"
            id="op-dedicated-fans"
            aria-label="opponent's dedicated fans"
            on:focus={() => makeOpaque(opFanCalc)}
            max="7"
            min="1"
            on:change={updateOpponentFanFactor}
            bind:value={$roster.matchDraft.opponentCoach.dedicatedFans}
            autocomplete="off"
        />
        +
        <input
            type="number"
            id="op-fair-weather-fans"
            aria-label="opponent's fair weather fans"
            on:focus={() => makeOpaque(opFanCalc)}
            max="3"
            min="1"
            on:change={updateOpponentFanFactor}
            bind:value={$roster.matchDraft.opponentCoach.fairWeatherFans}
            autocomplete="off"
        />
        <Die faces={3} on:rolled={opRoll} /> =
    </span>
    <input
        type="number"
        id="op-fan-factor"
        max="10"
        min="2"
        bind:value={$roster.matchDraft.opponentCoach.fanFactor}
        autocomplete="off"
        on:change={() => makeTransparent(opFanCalc)}
    />
</div>

<style lang="scss">
    .boxed-div {
        grid-column-start: span 2;
    }
</style>
