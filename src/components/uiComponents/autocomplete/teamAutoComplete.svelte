<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    import type { Team } from '../../../models/team.model';
    import type { CustomTeam } from '../../../customisation/types/CustomiseTeamList.type';
    import {
        filteredTiers,
        toggledTiers,
    } from '../../../store/filterTier.store';

    export let teamList: (Team | CustomTeam)[];

    const dispatch = createEventDispatcher();

    let input = '';
    let suggestions: (Team | CustomTeam)[] = [];
    let selectedIndex = -1;
    let showSuggestions = false;
    let inputElement: HTMLInputElement;
    let suggestionsElement: HTMLDivElement;
    let includeRetired: boolean = false;
    let isValidSelection = false;
    $: isValidSelection = teamList.some((team) => team.name === input);

    let teamListFiltered: (Team | CustomTeam)[] = [];
    $: {
        teamListFiltered = teamList.filter((team) => {
            return includeRetired || !team.retired;
        });
    }

    // Reactive statement for filtering teams
    $: {
        if (input) {
            suggestions = teamListFiltered.filter((team) =>
                $_('teams.names.' + team.id)
                    .toLowerCase()
                    .includes(input.toLowerCase())
            );
        } else if (showSuggestions) {
            suggestions = teamListFiltered;
        } else {
            suggestions = [];
        }
    }

    $: if (isValidSelection) {
        dispatch('teamSelected', {
            teamId: teamList.find((team) => team.name === input)?.id,
        });
    }

    function scrollSelectedIntoView(): void {
        if (selectedIndex >= 0 && suggestionsElement) {
            const selectedElement = suggestionsElement.children[
                selectedIndex
            ] as HTMLElement;
            if (selectedElement) {
                selectedElement.scrollIntoView({
                    block: 'nearest',
                    behavior: 'smooth',
                });
            }
        }
    }

    function handleInputChange(e: Event): void {
        const target = e.target as HTMLInputElement;
        input = target.value;
        showSuggestions = true;
        selectedIndex = -1;
        // Reset validation when typing
        isValidSelection = false;
    }

    function handleInputFocus(): void {
        if (!isValidSelection) {
            showSuggestions = true;
            selectedIndex = -1;
        }
    }

    function handleInputClick(): void {
        showSuggestions = true;
        selectedIndex = -1;
    }

    function handleKeyDown(e: KeyboardEvent): void {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                selectedIndex =
                    selectedIndex < suggestions.length - 1
                        ? selectedIndex + 1
                        : selectedIndex;
                scrollSelectedIntoView();
                break;
            case 'ArrowUp':
                e.preventDefault();
                selectedIndex = selectedIndex > 0 ? selectedIndex - 1 : -1;
                scrollSelectedIntoView();
                break;
            case 'Enter':
                if (selectedIndex >= 0) {
                    input = suggestions[selectedIndex].name;
                    showSuggestions = false;
                }
                break;
            case 'Escape':
                showSuggestions = false;
                break;
        }
    }

    function handleSuggestionClick(team: Team | CustomTeam): void {
        input = team.name;
        showSuggestions = false;
        isValidSelection = true;
        inputElement.focus();
    }

    function handleClickOutside(event: MouseEvent): void {
        const target = event.target as Node;
        if (
            suggestionsElement &&
            !suggestionsElement.contains(target) &&
            !inputElement.contains(target)
        ) {
            showSuggestions = false;
        }
    }

    function toggleRetired(): void {
        includeRetired = !includeRetired;
    }

    onMount(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    });
</script>

<div class="autocomplete">
    <div class="search-container">
        <input
            bind:this={inputElement}
            type="search"
            bind:value={input}
            on:input={handleInputChange}
            on:keydown={handleKeyDown}
            on:focus={handleInputFocus}
            on:click={handleInputClick}
            placeholder="Search teams..."
            class="search-input"
        />
        <svg
            class="search-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    </div>

    {#if showSuggestions}
        <div bind:this={suggestionsElement} class="suggestions-container">
            <div class="filter__tier">
                Tiers:
                {#each $toggledTiers as _tier, i}
                    <button
                        on:click={() => toggledTiers.toggleTier(i + 1)}
                        class:selected={$filteredTiers.includes(i + 1)}
                        class="filter__button"
                        title={$_('creation.tier', { values: { tier: i + 1 } })}
                        >{i + 1}</button
                    >
                {/each}
                <button
                    class="filter__button"
                    title="Filter retired teams"
                    class:selected={includeRetired}
                    on:click={toggleRetired}>R</button
                >
            </div>
            {#if suggestions.length > 0}
                {#each suggestions as team, index (team.id)}
                    <div
                        class="suggestion-item"
                        class:selected={index === selectedIndex}
                        class:retired={team.retired}
                        role="button"
                        on:click={() => handleSuggestionClick(team)}
                        on:keydown={(e) =>
                            e.key === 'Enter' && handleSuggestionClick(team)}
                    >
                        <div class="suggestion-content">
                            <span class="team-name"
                                >{$_('teams.names.' + team.id)}</span
                            >
                            <span class="team-tier"
                                >{$_('creation.tier', {
                                    values: { tier: team.tier },
                                })}</span
                            >
                        </div>
                    </div>
                {/each}
            {:else}
                <div class="no-results">{$_('creation.noMatch')}</div>
            {/if}
        </div>
    {/if}
</div>

<style lang="scss">
    .autocomplete {
        position: relative;
        max-width: 600px;
        margin: 1rem 0;

        .search-container {
            position: relative;
            width: 100%;

            .search-input {
                width: 100%;
                padding: 1rem 1rem 1rem 3rem;
                font-size: 1.125rem;
                border: var(--secondary-border);
                border-radius: 16px;
                font-family: var(--display-font);
                background-color: var(--white);

                &::placeholder,
                &::-webkit-input-placeholder,
                &::-moz-placeholder,
                &:-ms-input-placeholder {
                    font-style: italic;
                }

                // Style the search clear button
                &::-webkit-search-cancel-button {
                    appearance: none;
                    -webkit-appearance: none;
                    height: 1.5rem;
                    width: 1.5rem;
                    opacity: 0.8;
                    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333333' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'><line x1='18' y1='6' x2='6' y2='18'></line><line x1='6' y1='6' x2='18' y2='18'></line></svg>");
                    background-size: contain;
                    cursor: pointer;

                    &:hover {
                        opacity: 1;
                    }
                }
            }

            .search-icon {
                position: absolute;
                left: 1rem;
                top: 50%;
                transform: translateY(-50%);
                color: var(--secondary-colour);
                pointer-events: none;
            }
        }

        .suggestions-container {
            position: absolute;
            width: 100%;
            margin-top: 0.5rem;
            background-color: white;
            border: 1px solid #e2e8f0;
            border-radius: 0.5rem;
            box-shadow:
                0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06);
            max-height: 24rem;
            overflow-y: auto;
            z-index: 10;

            &::-webkit-scrollbar {
                width: 8px;
            }

            &::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 4px;
            }

            &::-webkit-scrollbar-thumb {
                background: #c1c1c1;
                border-radius: 4px;

                &:hover {
                    background: #a8a8a8;
                }
            }

            .suggestion-item {
                padding: 0.75rem 1rem;
                cursor: pointer;
                transition: background-color 0.2s ease;

                &:hover,
                &.selected {
                    background-color: var(--secondary-colour);
                    color: var(--white);
                }

                &.retired {
                    opacity: 0.6;
                    font-style: italic;
                }

                .suggestion-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;

                    .team-name {
                        font-weight: 500;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .team-tier {
                        font-size: 0.875rem;
                        white-space: nowrap;
                        flex-shrink: 0;
                    }
                }
            }
        }
    }
    .no-results {
        padding: 1rem;
        text-align: center;
    }
    .filter {
        &__tier {
            display: inline-block;
            margin: 1rem;
        }
        &__button {
            font-family: var(--display-font);
            border-radius: 50%;
            font-size: 0.75em;
            background-color: var(--secondary-compliment);
            color: var(--secondary-colour);
            padding: 0;
            width: 24px;
            height: 24px;
            line-height: 0px;
            text-align: center;
            margin: 0 auto;
            border: var(--secondary-border);
            margin-right: 4px;

            &:hover {
                box-shadow: 0 4px 12px var(--button-shadow) inset;
                background: var(--button-shadow);
                color: var(--secondary-compliment);
            }

            &.selected {
                background-color: var(--secondary-colour);
                color: var(--secondary-compliment);
                border-color: var(--secondary-colour);
                &:hover {
                    background: var(--button-shadow);
                }
            }
        }
    }
</style>
