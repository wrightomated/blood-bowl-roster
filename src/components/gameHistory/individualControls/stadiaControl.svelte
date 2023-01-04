<script lang="ts">
    import { categoryMap, stadiumTableData } from '../../../data/stadium.data';
    import type { D6Result } from '../../../models/dice.model';
    import type { Stadium, StadiumTable } from '../../../models/stadium.model';
    import { roster } from '../../../store/teamRoster.store';
    import Die from '../../dice/die.svelte';

    $: categories = Object.keys(categoryMap);
    $: category = $roster.matchDraft.stadium.category;

    // let category;
    // let attribute;

    function updateStadium(event) {
        const result: number = event.detail.result;
        const stadium: Stadium = stadiumTableData[result];
        $roster.matchDraft.stadium.category = stadium.category;
        $roster.matchDraft.stadium.attribute = undefined;
    }

    function updateAttribute(event) {
        const result: D6Result = event.detail.result;
        $roster.matchDraft.stadium.attribute = result;
        // console.log(result);
        // const stadium: Stadium = categoryMap[category];
        // console.log(stadium);
        // attribute = stadium.attributes.find((a) => a.roll === result).attribute;
        // console.log(attribute);
        // if (result <= 3 || result >= 11) {
        //     weatherResult = result.toString();
        // } else {
        //     weatherResult = perfectConditions[0];
        // }
    }

    // function selectStadia(type: 'standard' | 'deathzone') {
    //     stadiaTypes = type;
    // }
</script>

<!-- 
<ToggleButton options={['standard', 'deathzone']} selected={selectStadia} />

{#if stadiaTypes === 'standard'}{/if} -->

<div class="stadia boxed-div">
    <label for="stadium-category">Stadium</label>
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

    <!-- <select
        name="weather-result"
        id="weather-result"
        bind:value={weatherResult}
    >
        {#each weatherTable(selectedTable) as weather}
            <option value={weather[0]}>{weather[1]}</option>

            <option class="weather-type" value={table.type}
                >{capitalise(table.type)}</option
            >
        {/each}
    </select>
    <Die faces={6} rolls={2} on:rolled={updateValue} /> -->
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
