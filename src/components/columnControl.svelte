<script lang="ts">
    import { flip } from 'svelte/animate';
    import { scale } from 'svelte/transition';
    import { tableColumns } from '../store/tableColumns.store';
    import Button from './uiComponents/button.svelte';
    import MaterialButton from './uiComponents/materialButton.svelte';

    let newCol: string;
</script>

<h3>Column settings</h3>
<p>
    Hide, rearrange and create new columns. Changes <strong
        >will not be saved</strong
    > and can't be shared at the moment. This feature is currently under development.
</p>
<div class="controls">
    {#each $tableColumns as c (c.id)}
        <div
            class="container"
            animate:flip={{ duration: 200 }}
            transition:scale|local={{ duration: 200 }}
        >
            <p>{c.customName || c.name}</p>

            <MaterialButton
                hoverText={c.hideColumn ? 'Show column' : 'Hide column'}
                symbol={c.hideColumn ? 'visibility_off' : 'visibility'}
                clickFunction={() => {
                    const index = $tableColumns.findIndex((y) => y.id === c.id);
                    tableColumns.toggleVisibility(index);
                }}
            />
            <MaterialButton
                hoverText="Move column left"
                symbol="arrow_circle_left"
                clickFunction={() => {
                    const index = $tableColumns.findIndex((y) => y.id === c.id);
                    tableColumns.moveLeft(index);
                }}
            />
            <MaterialButton
                hoverText="Move column right"
                symbol="arrow_circle_right"
                clickFunction={() => {
                    const index = $tableColumns.findIndex((y) => y.id === c.id);
                    tableColumns.moveRight(index);
                }}
            />
        </div>
    {/each}
</div>

<input
    class="new-column-input"
    type="text"
    placeholder="Column Name"
    bind:value={newCol}
/>

<Button clickFunction={() => tableColumns.addColumn(newCol)}>Add Column</Button>
<Button cancel={true} clickFunction={() => tableColumns.resetColumns()}
    >Reset Columns</Button
>

<style lang="scss">
    .controls {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .container {
        display: flex;
        flex-wrap: wrap;
        p {
            flex-basis: 100%;
            margin-bottom: 0;
        }
    }
    .new-column-input {
        margin-top: 1em;
    }
</style>
