<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import MaterialButton from './materialButton.svelte';
    import type { Extra } from '../models/extra.model';

    export let extra: Extra;
    $: extraAmount = $roster?.extra[extra.extraString] || extra?.min || 0;

    const addExtra = () => {
        roster.addExtra(extra.extraString, extra.cost);
    };
    const removeExtra = () => {
        roster.removeExtra(extra.extraString, extra.cost);
    };
</script>

<tr>
    <th>{extra.extraString.replace('_', ' ')}</th>
    <td class="qty">{extraAmount} / {extra.max}</td>
    <td>{extra.cost},000</td>
    <td class="control">
        <div class="flex-container">
            {#if extraAmount < extra.max}
                <MaterialButton
                    hoverText="Add extra"
                    symbol="add_circle"
                    clickFunction={addExtra}
                />
            {/if}
            {#if extraAmount > (extra.min || 0)}
                <MaterialButton
                    hoverText="Remove extra"
                    symbol="remove_circle"
                    clickFunction={removeExtra}
                />
            {/if}
        </div>
    </td>
</tr>

<style lang="scss">
    @import '../styles/colour';
    th {
        background-color: $main-colour;
        color: white;
        text-align: left;
        text-transform: uppercase;
        font-weight: normal;
        padding: 10px;
    }
    .qty {
        min-width: 44px;
    }
    .flex-container {
        display: flex;
    }

    @media print {
        .control {
            display: none;
        }
    }
</style>
