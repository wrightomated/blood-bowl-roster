<script lang="ts">
    import { quintOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';
    import type { GameEventTally } from '../../models/matchHistory.model';
    import { roster } from '../../store/teamRoster.store';
    import ToggleButton from '../uiComponents/toggleButton.svelte';

    let option = 'total';
    let gameEventTally: GameEventTally = {
        casualties: 0,
        touchdowns: 0,
        passes: 0,
        kills: 0,
        interceptions: 0,
        deflections: 0,
    };

    $: filteredPlayers = $roster.players.filter(
        (p) => !p.starPlayer && !p.deleted
    );
    function selected(selectedOption: string) {
        option = selectedOption;
    }
</script>

<div
    class="player-events"
    transition:slide={{ duration: 500, easing: quintOut }}
>
    <ToggleButton options={['total', 'individual']} {selected} />
    {#if option === 'total'}
        {#each Object.keys(gameEventTally) as event}
            <div class="label-input">
                <label for="tally-{event}">{event}</label>
                <input
                    type="number"
                    name="tally-{event}"
                    id="tally-{event}"
                    bind:value={gameEventTally[event]}
                    min="0"
                    max="999"
                />
            </div>
        {/each}
    {:else}
        <div class="event-entry">
            <select>
                {#each filteredPlayers as p}
                    <option value={p.alterations.playerNumber}>
                        {p.alterations.playerNumber}
                        {p.playerName || p.player.position}</option
                    >
                {/each}
            </select>
            successfully made a
            <select name="" id="">
                {#each Object.keys(gameEventTally) as event}
                    <option>{event}</option>
                {/each}
            </select>
            on turn <input type="text" maxlength="3" placeholder="optional" />
            <button><i>plus</i></button>
        </div>

        <!-- <table>
            <tr
                ><td>Player</td>
                {#each Object.keys(gameEventTally) as event}
                    <td>{event}</td>
                {/each}
            </tr>
            {#each filteredPlayers as p}
                <tr>
                    <td>
                        {p.alterations.playerNumber}
                        {p.playerName || p.player.position}
                    </td>
                    {#each Object.keys(gameEventTally) as event}
                        <td>0</td>
                    {/each}
                </tr>
            {/each}
        </table> -->
        <!-- <div class="player-table">
            {#each filteredPlayers as p}
                <div>
                    {p.alterations.playerNumber}
                    {p.playerName || p.player.position}
                </div>
            {/each}
        </div> -->
    {/if}
</div>

<!-- <div class="digits">
    <div class="label-input">
        <label for="casualties">Casualties:</label>
        <input
            type="number"
            name="casualties"
            id="casualties"
            value="0"
            min="0"
            max="999"
        />
    </div>
    <div class="label-input">
        <label for="touchdowns">Touchdowns:</label>
        <input
            type="number"
            name="touchdowns"
            id="touchdowns"
            value="0"
            min="0"
            max="999"
        />
    </div>
    <div class="label-input">
        <label for="passes">Passes:</label>
        <input
            type="number"
            name="passes"
            id="passes"
            value="0"
            min="0"
            max="999"
        />
    </div>
    <div class="label-input">
        <label for="kills">Kills:</label>
        <input
            type="number"
            name="kills"
            id="kills"
            value="0"
            min="0"
            max="999"
        />
    </div>
</div> -->

<style>
    .player-events {
        padding: 16px 0;
    }
</style>
