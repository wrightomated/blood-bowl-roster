<script lang="ts">
    import { onMount } from 'svelte';
    import { gameSettings } from '../../store/gameSettings.store';
    import { roster } from '../../store/teamRoster.store';

    import ToggleButton from '../../components/uiComponents/toggleButton.svelte';
    import HoverCard from './hoverCard.svelte';

    let showTackleZones = false;
    let gridContainer: HTMLElement;
    let hoverCard: HTMLElement;
    $: hoverIndex = 0;

    $: circleContent = 'number';

    $: numberOfRows = $gameSettings.pitch.length / 2;
    $: numberOfColumns = $gameSettings.pitch.width;
    $: pitchGrid = new Array(numberOfRows)
        .fill('p')
        .map(() => new Array(numberOfColumns).fill(null));

    let availablePlayers: string[];
    $: availablePlayers = $roster.players
        .map((player) => player.alterations.playerNumber + '')
        .filter((playerNumber) => !exists(pitchGrid, playerNumber));
    $: tackleZones = new Array(numberOfRows)
        .fill('p')
        .map(() => new Array(numberOfColumns).fill(false));

    onMount(() => {
        hoverCard = document.querySelector('.hover-card');
        gridContainer.style.setProperty('--pitch-width', numberOfColumns + '');
        gridContainer.style.setProperty(
            '--gutter-width',
            $gameSettings.pitch.gutter + ''
        );
        if ($roster.setUps.draft.players.length > 0) {
            $roster.setUps.draft.players.forEach((player) => {
                const playerNumber = $roster.players.find(
                    (p) => p.playerId === player.playerId
                ).alterations.playerNumber;
                if (playerNumber) {
                    pitchGrid[player.position.y][player.position.x] =
                        playerNumber + '';

                    updateTackleZones(
                        player.position.y,
                        player.position.x,
                        true
                    );
                }
            });
        }
    });

    function pitchGridToRoster() {
        const arr = [];
        pitchGrid.forEach((row, rowIndex) => {
            row.forEach((player, colIndex) => {
                if (player) {
                    const playerRecord = $roster.players.find(
                        (p) => p.alterations.playerNumber === +player
                    );
                    arr.push({
                        playerId: playerRecord.playerId,
                        position: {
                            x: colIndex,
                            y: rowIndex,
                        },
                    });
                }
            });
        });
        roster.set({
            ...$roster,
            setUps: {
                ...$roster?.setUps,
                draft: {
                    ...$roster?.setUps?.draft,
                    players: arr,
                },
            },
        });
    }

    function dragStart(event, player, row, col) {
        hideCard();
        event.dataTransfer.setData(
            'player',
            JSON.stringify({ player, row, col })
        );
    }
    function drop(event, newPlayer, newRow, newCol) {
        event.preventDefault();
        event.target.style.filter = 'unset';
        const { player, row, col } = JSON.parse(
            event.dataTransfer.getData('player')
        );
        console.log({ player, row, col, newPlayer, newRow, newCol });
        pitchGrid[newRow][newCol] = player;
        if (typeof row === 'number' && typeof col === 'number') {
            pitchGrid[row][col] = newPlayer;
        }
        // update tackle zones
        updateTackleZones(row, col, false);
        updateTackleZones(newRow, newCol, true);
    }

    function playerDragStart(event, player) {
        hideCard();
        event.dataTransfer.setData('player', JSON.stringify({ player }));
    }
    function playerDrop(event) {
        event.preventDefault();
        event.target.style.filter = 'unset';
        const { player, row, col } = JSON.parse(
            event.dataTransfer.getData('player')
        );

        if (pitchGrid?.[row]?.[col]) {
            pitchGrid[row][col] = null;
        }

        updateTackleZones(row, col, false);
    }

    function exists(arr, search) {
        return arr.some((row) => row.includes(search));
    }

    function dragEnter(event) {
        event.target.style.filter = 'brightness(85%)';
    }
    function dragLeave(event) {
        event.target.style.filter = 'unset';
    }

    function isTackleZone(row, col) {
        if (row - 1 >= 0) {
            if (pitchGrid[row - 1][col]) return true;
            if (col - 1 >= 0 && pitchGrid[row - 1][col - 1]) return true;
            if (col + 1 < numberOfColumns && pitchGrid[row - 1][col + 1])
                return true;
        }
        if (row + 1 < numberOfRows) {
            if (pitchGrid[row + 1][col]) return true;
            if (col - 1 >= 0 && pitchGrid[row + 1][col - 1]) return true;
            if (col + 1 < numberOfColumns && pitchGrid[row + 1][col + 1])
                return true;
        }
        if (col - 1 >= 0 && pitchGrid[row][col - 1]) return true;
        if (col + 1 < numberOfColumns && pitchGrid[row][col + 1]) return true;
        return false;
    }
    function updateTackleZones(row: number, col: number, value: boolean) {
        if (row - 1 >= 0) {
            tackleZones[row - 1][col] = value || isTackleZone(row - 1, col);
            if (col - 1 >= 0)
                tackleZones[row - 1][col - 1] =
                    value || isTackleZone(row - 1, col - 1);
            if (col + 1 < numberOfColumns)
                tackleZones[row - 1][col + 1] =
                    value || isTackleZone(row - 1, col + 1);
        }
        if (row + 1 < numberOfRows) {
            tackleZones[row + 1][col] = value || isTackleZone(row + 1, col);
            if (col - 1 >= 0)
                tackleZones[row + 1][col - 1] =
                    value || isTackleZone(row + 1, col - 1);
            if (col + 1 < numberOfColumns)
                tackleZones[row + 1][col + 1] =
                    value || isTackleZone(row + 1, col + 1);
        }
        if (col - 1 >= 0)
            tackleZones[row][col - 1] = value || isTackleZone(row, col - 1);
        if (col + 1 < numberOfColumns)
            tackleZones[row][col + 1] = value || isTackleZone(row, col + 1);
    }

    function hideCard() {
        hoverCard.style.display = 'none';
    }

    function hover(playerNumber, event) {
        if (!playerNumber) {
            hideCard();
            return;
        }

        hoverIndex = $roster.players.findIndex(
            (player) => player.alterations.playerNumber === +playerNumber
        );
        if (hoverCard) {
            hoverCard.style.display = 'block';
            hoverCard.style.position = 'fixed';
            hoverCard.style.left = event.clientX + 'px';
            hoverCard.style.top = event.clientY + 'px';
        }
    }
</script>

<!-- Row of players -->
<div class="container" bind:this={gridContainer}>
    <input type="text" name="setup-name" id="setup-input" />
    <HoverCard index={hoverIndex} />
    <div
        class="grid dugout"
        role="grid"
        tabindex="0"
        on:drop={(event) => playerDrop(event)}
        on:dragover={(event) => event.preventDefault()}
        on:dragenter={dragEnter}
        on:dragleave={dragLeave}
        on:mouseleave={hideCard}
    >
        {#each availablePlayers as player}
            <div
                class="cell"
                role="gridcell"
                tabindex="0"
                draggable="true"
                on:dragstart={(event) => playerDragStart(event, player)}
                on:dragover={(event) => event.preventDefault()}
                on:mouseenter={(event) => hover(player, event)}
                on:mouseleave={() => console.log('leave' + player)}
                aria-grabbed="false"
            >
                <div class="player-square">
                    <p>{player}</p>
                </div>
            </div>
        {/each}
    </div>
    <p class="center">Center</p>
    <!-- A grid 15 wide 13 heigh, the bottom row is the endzone -->
    <div
        class="grid pitch"
        class:pitch--elevens={$roster.format === 'elevens'}
        class:pitch--sevens={$roster.format === 'sevens'}
        role="grid"
        on:mouseleave={hideCard}
        tabindex="0"
    >
        {#each pitchGrid as playerRow, row}
            {#each playerRow as player, col}
                <div
                    class="cell"
                    class:cell--tackle-zone={showTackleZones &&
                        tackleZones[row][col]}
                    role="gridcell"
                    tabindex={!!player ? 0 : -1}
                    class:cell--endzone={row === numberOfRows - 1}
                    draggable={!!player}
                    on:mouseenter={(event) => hover(player, event)}
                    on:dragstart={(event) => dragStart(event, player, row, col)}
                    on:dragover={(event) => event.preventDefault()}
                    on:drop={(event) => drop(event, player, row, col)}
                    on:dragenter={dragEnter}
                    on:dragleave={dragLeave}
                >
                    {#if !!player}
                        <div class="player-square">
                            <p>
                                {circleContent === 'number'
                                    ? player
                                    : $roster.players
                                          .find(
                                              (p) =>
                                                  p.alterations.playerNumber ===
                                                  +player
                                          )
                                          .player.position.split(' ')
                                          .map((word) => word[0])
                                          .join('')}
                            </p>
                        </div>
                    {/if}
                </div>
            {/each}
        {/each}
    </div>
    <p>Show tackle zone</p>
    <ToggleButton
        options={['on', 'off']}
        selectedIndex={1}
        selected={(option) => {
            showTackleZones = option === 'on';
        }}
    />
    <!-- Number / position -->
    <p>Show player</p>
    <ToggleButton
        options={['number', 'position']}
        selectedIndex={0}
        selected={(option) => {
            circleContent = option;
        }}
    />
    <button class="rounded-button" on:click={pitchGridToRoster}>Gird</button>
</div>

<style lang="scss">
    .container {
        --pitch-width: 11;
        --gutter-width: 2;
        overflow-x: auto;
    }
    .grid {
        max-width: 1200px;
        min-width: 600px;
        display: grid;
        margin: 0 auto;
    }
    .dugout {
        grid-template-columns: repeat(16, 1fr);
        border: 1px solid #a5d6a7;
        aspect-ratio: 16/1;

        background-color: var(--neutral);
        .cell {
            aspect-ratio: 1;
        }
    }

    .pitch {
        grid-template-columns: repeat(var(--pitch-width), 1fr);
        border-top: 4px double #a5d6a7;

        // margin-top: 1rem;
        .cell {
            aspect-ratio: 1;
            // a mid green border
            border: 1px solid #a5d6a7;

            //slightly darker green than #c8e6c
            background-color: #dcedc8;

            // alternate cells with green colours
            &:nth-child(even) {
                background-color: #c8e6c9;
            }

            // gutter width

            &--endzone {
                border-top: 1px solid black;
                border-bottom: 1px solid black;
                // a more red a5d6a7
                background-color: #ffcdd2;
                opacity: 0.8;
                background-image: linear-gradient(
                        135deg,
                        #ffcdd2 25%,
                        transparent 25%
                    ),
                    linear-gradient(225deg, #ffcdd2 25%, transparent 25%),
                    linear-gradient(45deg, #ffcdd2 25%, transparent 25%),
                    linear-gradient(315deg, #ffcdd2 25%, #dcedc8 25%);
                background-position:
                    16% 0,
                    16% 0,
                    0 0,
                    0 0;
                background-size: 32% 32%;
                background-repeat: repeat;
                // background-color: #e57373;
            }
            &--tackle-zone {
                // tackle zone color different to #ffcdd2
                // Dotted background
                // background-image: radial-gradient(
                //     circle,
                //     #ffcdd2 0.5px,
                //     transparent 0.5px
                // );
                // darker than #c8e6c9

                // opacity: 0.8;
                background: repeating-linear-gradient(
                    45deg,
                    #dcedc8 0px,
                    #dcedc8 6px,
                    #ffcdd2 6px,
                    #ffcdd2 12px
                );

                &:nth-child(even) {
                    background: repeating-linear-gradient(
                        135deg,
                        #c8e6c9 0px,
                        #c8e6c9 6px,
                        #ffcdd2 6px,
                        #ffcdd2 12px
                    );
                }
            }
        }
        &--elevens {
            .cell {
                &:nth-child(15n - 11),
                &:nth-child(15n - 4) {
                    border-right: 1px solid black;
                }
                &:nth-child(15n - 10),
                &:nth-child(15n - 3) {
                    border-left: 1px solid black;
                }
            }
        }
        &--sevens {
            .cell {
                &:nth-child(11n - 9),
                &:nth-child(11n - 2) {
                    border-right: 1px solid black;
                }
                &:nth-child(11n - 8),
                &:nth-child(11n - 1) {
                    border-left: 1px solid black;
                }
            }
        }

        // &--sevens {
        //     .cell {
        //         &:nth-child(n - 11),
        //         &:nth-child(15n - 4) {
        //             border-right: 1px solid black;
        //         }
        //         &:nth-child(15n - 10),
        //         &:nth-child(15n - 3) {
        //             border-left: 1px solid black;
        //         }
        //     }
        // }
    }

    .player-square {
        height: calc(100% - 2px);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: auto;
        cursor: grab;
        overflow: hidden;

        p {
            border-radius: 50%;
            // aspect-ratio: 1;
            width: 75%;
            height: 75%;
            background-color: var(--main-colour);
            padding: 4px;
            color: white;
            margin-block: 0;
            margin-inline: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid white;
        }
    }
    .center {
        font-family: var(--display-font);
        font-size: 1.25rem;
        margin-bottom: 0;
    }
</style>
