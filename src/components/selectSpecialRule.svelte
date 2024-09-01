<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { currentTeam } from '../store/currentTeam.store';
    import { teamSelectionSpecialRule } from '../store/rosterSpecialRules.store';
</script>

<label for="special-rule">{$_('creation.special')}</label>

<select
    id="special-rule"
    class="special-rule"
    bind:value={$teamSelectionSpecialRule}
    data-cy="select-team-rule"
>
    {#each $currentTeam.pickSpecialRule as specialRule}
        <option value={specialRule}>{$_('teams.rules.' + specialRule)}</option>
    {/each}
</select>

<style lang="scss">
    label {
        margin: 12px 0 4px 4px;
    }
    .special-rule {
        background-color: var(--secondary-compliment);
        border: 2px solid var(--secondary-colour);
        color: var(--secondary-colour);
        border-radius: 12px;
        margin: 4px 4px 12px 4px;
        padding: 8px 28px 8px 8px;
    }
</style>
