<script lang="ts">
    import { quadInOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';
    import type {
        SaveMatchOption,
        SaveMatchOptions,
    } from '../../../models/matchHistory.model';
    import { inducementsInRoster } from '../../../store/currentInducements.store';
    import { modalState } from '../../../store/modal.store';
    import { roster } from '../../../store/teamRoster.store';
    import Button from '../../uiComponents/button.svelte';
    import ToggleButton from '../../uiComponents/toggleButton.svelte';
    import SaveMatchHistory from '../saveMatchHistory.svelte';

    const options: SaveMatchOption[] = [
        'updateSpp',
        'updateTreasury',
        'removeInducements',
        'removeStarPlayers',
        'updateDedicatedFans',
    ];
    const optionMap: Record<SaveMatchOption, string> = {
        updateSpp: 'Add SPP to players',
        updateTreasury: 'Update treasury',
        removeInducements: 'Remove Inducements',
        removeStarPlayers: 'Remove Star Players',
        updateDedicatedFans: 'Update dedicated fans',
    };
    let saveOptions: SaveMatchOptions = {
        updateSpp: $roster.format !== 'sevens' && $roster.mode === 'league',
        removeInducements: $roster.mode === 'league',
        updateTreasury: $roster.mode === 'league',
        removeStarPlayers: $roster.mode === 'league',
        updateDedicatedFans: $roster.mode === 'league',
    };

    function uploadMatchHistory() {
        modalState.set({
            ...$modalState,
            isOpen: true,
            canClose: false,
            component: SaveMatchHistory,
            componentProps: { saveOptions },
        });
    }
    function toggleOption(selection: string, option: SaveMatchOption) {
        saveOptions[option] = selection === 'Yes';
    }
    function showOption(option: SaveMatchOption): boolean {
        if ($roster.mode === 'exhibition') return false;
        switch (option) {
            case 'removeStarPlayers':
                return showStarPlayers();
            case 'removeInducements':
                return showInducements();
            case 'updateTreasury':
                return updateTreasury();
            case 'updateSpp':
                return updateSpp();
            case 'updateDedicatedFans':
                return updateDedicatedFans();
            default:
                return false;
        }
    }
    function showStarPlayers() {
        return (
            $roster.players.filter((x) => !!x.starPlayer && !x.deleted)
                .length >= 1
        );
    }
    function showInducements() {
        return $inducementsInRoster.filter((i) => i[1] > 0).length >= 1;
    }
    function updateTreasury(): boolean {
        return $roster.matchDraft?.playingCoach?.winnings > 0;
    }
    function updateSpp(): boolean {
        return (
            $roster.format !== 'sevens' &&
            $roster.mode === 'league' &&
            (!!$roster.matchDraft?.playingCoach?.mvp ||
                $roster.matchDraft?.playingCoach?.gameEvents?.length >= 1)
        );
    }
    function updateDedicatedFans(): boolean {
        return !!$roster.matchDraft?.playingCoach?.fanChange;
    }
</script>

<div
    in:slide|local={{ duration: 300, easing: quadInOut }}
    out:slide|local={{ duration: 300, easing: quadInOut }}
>
    <div class="option-container">
        {#each options.filter((o) => showOption(o)) as option}
            <div class="option-toggle boxed-div">
                <span>{optionMap[option]}</span>
                <ToggleButton
                    options={['Yes', 'No']}
                    selectedIndex={0}
                    selected={(selection) => toggleOption(selection, option)}
                />
            </div>
        {/each}
    </div>
    <Button clickFunction={uploadMatchHistory}>Save Match History</Button>
</div>

<style>
    .option-toggle {
        display: flex;
        justify-content: space-between;
        flex: 290px;
        align-items: center;
    }
    .option-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 12px 0;
    }
</style>
