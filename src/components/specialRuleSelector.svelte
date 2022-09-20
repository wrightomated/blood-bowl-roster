<script lang="ts">
    import { onMount } from 'svelte';

    import { PickedSpecialRule } from '../data/teams.data';
    import type { TeamSpecialRule } from '../models/team.model';
    import { currentTeam } from '../store/currentTeam.store';
    import { roster } from '../store/teamRoster.store';
    import SelectSpecialRule from './selectSpecialRule.svelte';
    import Button from './uiComponents/button.svelte';
    import { teamSelectionSpecialRule } from '../store/rosterSpecialRules.store';

    onMount(() => {
        if ($currentTeam.pickSpecialRule) {
            teamSelectionSpecialRule.set($currentTeam.pickSpecialRule[0]);
        }
    });

    function confirmSpecialRule() {
        roster.updateSpecialRule(PickedSpecialRule[$teamSelectionSpecialRule]);
    }
</script>

{#if $currentTeam.pickSpecialRule && !$roster.extra?.special_rule}
    <div class="container">
        <strong>
            <p>
                It looks like you haven't selected a special rule for this team.
            </p>
            <p>Your Star Player and Inducement choices may be limited.</p>
        </strong>

        <SelectSpecialRule />
        <button on:click={confirmSpecialRule}>Confirm</button>
    </div>
{/if}

<style lang="scss">
    @use '../styles/mixins/roundedButton';
    .container {
        margin: 0 auto 24px;
        max-width: 500px;
        text-align: center;

        border-radius: 12px;
        background: var(--secondary-background-colour);
        padding: 8px;
        button {
            @include roundedButton.rounded-button;

            @media screen and (min-width: 784px) {
                padding: 8px;
            }
        }
    }
    p {
        color: var(--main-colour);
    }
</style>
