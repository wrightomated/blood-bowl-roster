<script lang="ts">
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import { playerCatalogue } from '../../store/playerCatalogue.store';
    import { roster } from '../../store/teamRoster.store';

    export let placeholder: string;

    let selectedPlayerId = null;

    function addPlayer() {
        if (!selectedPlayerId) return;
        const selectedPlayer = $playerCatalogue.find(
            (player) => player.id === selectedPlayerId
        );

        const newPlayer: RosterPlayerRecord = {
            player: selectedPlayer,
            playerName: '',
        };
        roster.addPlayer(newPlayer);
    }
</script>

<!-- select box for team -->
<label for="all-player-select">Add any player</label>
<select
    name="all-player-select"
    id="all-player-select"
    bind:value={selectedPlayerId}
>
    {#if placeholder}
        <option value={null}>{placeholder}</option>
    {/if}
    {#each $playerCatalogue as player}
        <option value={player.id}>
            {player.position}
        </option>
    {/each}
</select>
<button on:click={addPlayer} class="rounded-button">Add</button>
