<script lang="ts">
    import { currentTeam } from '../store/currentTeam.store';
    import { teamSelectionSpecialRule } from '../store/rosterSpecialRules.store';
</script>

<label for="special-rule">Select Special Rule</label>

<select
    id="special-rule"
    class="special-rule"
    bind:value={$teamSelectionSpecialRule}
    data-cy="select-team-rule"
>
    {#each $currentTeam.pickSpecialRule as specialRule}
        <option value={specialRule}>{specialRule}</option>
    {/each}
</select>

<style lang="scss">
    label {
        font-family: var(--display-font);
        margin: 12px 0 4px 4px;
    }
    .special-rule {
        background-color: white;
        border: 2px solid var(--secondary-colour);
        color: var(--secondary-colour);
        border-radius: 12px;
        margin: 4px 4px 12px 4px;
        padding: 8px 28px 8px 8px;
    }
</style>
