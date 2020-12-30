<script lang="ts">
    import { roster } from '../store/teamRoster.store';
    import MaterialButton from './materialButton.svelte';

    export let extra: { extraString: string; cost: number; max: number };
    $: extraAmount = $roster?.extra[extra.extraString] || 0;

    const addExtra = () => {
        roster.addExtra(extra.extraString);
    };
    const removeExtra = () => {
        roster.removeExtra(extra.extraString);
    };
</script>

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
</style>

<tr>
    <th>{extra.extraString.replace('_', ' ')}</th>
    <td>{extraAmount} / {extra.max}</td>
    <td>{extra.cost},000</td>
    <td>
        {#if extraAmount < extra.max}
            <MaterialButton symbol="add_circle" clickFunction={addExtra} />
        {/if}
        {#if extraAmount > 0}
            <MaterialButton
                symbol="remove_circle"
                clickFunction={removeExtra} />
        {/if}
    </td>
</tr>
