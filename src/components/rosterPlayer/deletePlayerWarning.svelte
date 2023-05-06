<script lang="ts">
    import type { StarPlayer } from '../../models/player.model';
    import type { RosterPlayerRecord } from '../../models/roster.model';
    import { modalState } from '../../store/modal.store';
    import { roster } from '../../store/teamRoster.store';
    import Button from '../uiComponents/button.svelte';

    export let index: number;
    export let rosterPlayer: RosterPlayerRecord = $roster.players[index];

    function removePlayer() {
        const firePlayer = $roster?.leagueRosterStatus === 'commenced';
        removeTwoForOne(firePlayer) || roster.removePlayer([index], firePlayer);
        modalState.close();
    }
    function removeTwoForOne(firePlayer: boolean) {
        if (rosterPlayer.starPlayer) {
            const twoForOne = (rosterPlayer.player as StarPlayer).twoForOne;
            const tfoIndex = $roster.players.findIndex(
                (p) => p.player.id === twoForOne
            );
            if (twoForOne) {
                roster.removePlayer([index, tfoIndex], firePlayer);
                return true;
            }
        }
        return false;
    }
</script>

<div class="container">
    <p>
        Are you sure you want to delete {rosterPlayer.playerName ||
            'this player'}? It can not be undone.
    </p>
    <Button
        cyData="accept-player-deletion"
        clickFunction={removePlayer}
        cancel={true}>Delete</Button
    >
    <Button clickFunction={modalState.close}>Cancel</Button>
</div>
