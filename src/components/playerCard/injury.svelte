<script lang="ts">
    import { characteristics } from '../../data/statOrder.data';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import { roster } from '../../store/teamRoster.store';
    import Die from '../dice/die.svelte';
    import PlayerCheckbox from '../rosterPlayer/playerCheckbox.svelte';
    import Button from '../uiComponents/button.svelte';
    import MngCheckbox from './mngCheckbox.svelte';
    export let index: number;
    export let rosterPlayer: RosterPlayerRecord;

    let injuryRoll: string;

    function addInjury(charIndex: number) {
        const injuries = rosterPlayer.alterations.injuries || [0, 0, 0, 0, 0];
        injuries[charIndex]++;
        const newPlayer: RosterPlayerRecord = {
            ...rosterPlayer,
            alterations: {
                ...rosterPlayer.alterations,
                injuries,
            },
        };
        roster.updatePlayer(newPlayer, index);
    }
    function rolled(event) {
        const roll = event.detail.result;
        injuryRoll = {
            1: 'AV',
            2: 'AV',
            3: 'MA',
            4: 'PA',
            5: 'AG',
            6: 'ST',
        }[roll];
    }
    function healInjury(charIndex: number) {
        const injuries = rosterPlayer.alterations.injuries || [0, 0, 0, 0, 0];
        injuries[charIndex]--;
        const newPlayer: RosterPlayerRecord = {
            ...rosterPlayer,
            alterations: {
                ...rosterPlayer.alterations,
                injuries,
            },
        };
        roster.updatePlayer(newPlayer, index);
    }
</script>

<fieldset class="injury-fieldset">
    <legend> Suffer Lasting Injury </legend>
    <Die faces={6} on:rolled={rolled} />
    {#each characteristics as chara, i}
        <Button
            cancel={true}
            clickFunction={() => addInjury(i)}
            disabled={!!injuryRoll && injuryRoll !== chara}>{chara}</Button
        >
    {/each}
</fieldset>
{#if !!rosterPlayer.alterations?.injuries && rosterPlayer.alterations.injuries.some((i) => i > 0)}
    <fieldset class="injury-fieldset">
        <legend> Heal Injury </legend>
        {#each characteristics as chara, i}
            <Button
                clickFunction={() => healInjury(i)}
                disabled={rosterPlayer.alterations?.injuries[i] <= 0}
                >{rosterPlayer.alterations?.injuries[i]} {chara}</Button
            >
        {/each}
    </fieldset>
{/if}

<style lang="scss">
    .injury-fieldset {
        padding: 1em;
        border-radius: 12px;
        border: 2px solid;
        border-color: var(--secondary-colour);
        margin-top: 1em;
        legend {
            color: var(--secondary-colour);
        }
    }
</style>
