<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { blurOnEscapeOrEnter } from '../../helpers/blurOnEscapeOrEnter';
    import { roster } from '../../store/teamRoster.store';

    export let index: number;
    $: rosterPlayer = $roster.players[index];
</script>

{#if rosterPlayer.starPlayer}
    <span data-cy={`player-${index}-name`}>{rosterPlayer.player.position}</span>
{:else}
    <input
        data-cy={`player-${index}-name`}
        aria-labelledby="name-header"
        placeholder={$_('players.name')}
        bind:value={$roster.players[index].playerName}
        use:blurOnEscapeOrEnter
    />
{/if}

<style lang="scss">
    input {
        border: 0;
        border-radius: 0;
        background: none;
        width: 100%;
        min-width: 150px;

        @media screen and (max-width: 450px) {
            font-size: 16px;
        }
    }
</style>
