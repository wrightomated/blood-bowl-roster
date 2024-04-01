<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { categoryMap, stadiumTableData } from '../../../data/stadium.data';
    import type { D6Result } from '../../../models/dice.model';
    import type { Stadium, StadiumTable } from '../../../models/stadium.model';
    import { roster } from '../../../store/teamRoster.store';
    import Die from '../../dice/die.svelte';

    $: categories = Object.keys(categoryMap);
    $: category = $roster.matchDraft.stadium.category;

    function updateStadium(event) {
        const result: number = event.detail.result;
        const stadium: Stadium = stadiumTableData[result];
        $roster.matchDraft.stadium.category = stadium.category;
        $roster.matchDraft.stadium.attribute = undefined;
    }

    function updateAttribute(event) {
        const result: D6Result = event.detail.result;
        $roster.matchDraft.stadium.attribute = result;
    }
</script>

<div class="stadia boxed-div">
    <label for="stadium-category">{$_('match.pre.stadium')}</label>
    <select
        name="stadium-category"
        id="stadium-category"
        bind:value={$roster.matchDraft.stadium.category}
    >
        {#each categories as cat}
            <option value={cat}>{cat}</option>
        {/each}
    </select>
    <Die faces={6} rolls={2} on:rolled={updateStadium} />
    {#if category && category !== 'Nothing out of the Ordinary'}
        <br />
        <select
            name="stadium-attribute"
            id="stadium-attribute"
            aria-label="stadium attribute"
            bind:value={$roster.matchDraft.stadium.attribute}
        >
            {#each categoryMap[category].attributes as att}
                <option class="weather-type" value={att.roll}
                    >{att.attribute}</option
                >
            {/each}
        </select>
        <Die faces={6} on:rolled={updateAttribute} />
    {/if}
</div>

<style lang="scss">
    .stadia {
        grid-column: span 2;
        > * {
            margin-top: 4px;
        }
        select {
            background-color: white;
        }
    }
</style>
