<script lang="ts">
    import TextElement from './uiComponents/textElement.svelte';
    import { tableColumns } from '../store/tableColumns.store';

    let newCol: string;
    const addCol = () =>
        tableColumns.set(
            $tableColumns.concat([
                {
                    name: 'Custom',
                    customName: newCol,
                    rowDetails: {
                        component: TextElement,
                    },
                },
            ])
        );
</script>

{#each $tableColumns as c, i}
    <label>{c.name}</label>
    <input type="checkbox" bind:checked={$tableColumns[i].hideColumn} />
{/each}

<input type="text" bind:value={newCol} />

<button on:click={addCol}>Add column</button>
