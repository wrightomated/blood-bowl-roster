<script lang="ts">
    import { formatNumberInThousands } from '../../helpers/formatTotalToThousands';
    import type {
        Inducement,
        InducementType,
    } from '../../models/inducement.model';
    import { showInducementBlock } from '../../store/showAllInducements.store';
    import { roster } from '../../store/teamRoster.store';
    import MaterialButton from '../uiComponents/materialButton.svelte';
    import { _ } from 'svelte-i18n';

    export let inducements: Inducement[];
    export let heading: string;
    export let toggleKey: InducementType;

    $: showInducements = $showInducementBlock?.[toggleKey];

    const addInducement = (key: string) => {
        roster.addInducement(key);
    };

    const removeInducement = (key: string) => {
        roster.removeInducement(key);
    };

    function toggleInducements() {
        showInducementBlock.update((prev) => ({
            ...prev,
            [toggleKey]: !prev[toggleKey],
        }));
    }
</script>

{#if inducements.length > 0}
    <div
        class="inducement__heading"
        on:click={toggleInducements}
        on:keydown={toggleInducements}
        role="button"
        tabindex="0"
    >
        {heading}
        <i class="material-symbols-outlined no-op no-transition no-print"
            >{showInducements ? 'arrow_drop_up' : 'arrow_drop_down'}</i
        >
    </div>
    {#if $showInducementBlock?.[toggleKey]}
        {#each inducements as ind}
            <div class="inducement__display-name">
                {$_('inducements.' + ind.id)}
            </div>
            <div class="inducement__max">
                {$roster.inducements?.[ind.id] || 0} / {ind.max}
            </div>
            <div class="inducement__amount">
                {formatNumberInThousands(ind.cost)}
            </div>
            <div class="inducement__control">
                <div class="flex-container">
                    {#if $roster.inducements?.[ind.id] > 0}
                        <MaterialButton
                            hoverText={$_('common.remove')}
                            symbol="remove_circle"
                            clickFunction={() => removeInducement(ind.id)}
                        />
                    {:else}
                        <i
                            class="material-symbols-outlined no-op no-transition no-print"
                            >block</i
                        >
                    {/if}
                    {#if ($roster.inducements?.[ind.id] || 0) < ind.max}
                        <MaterialButton
                            hoverText={$_('common.add')}
                            symbol="add_circle"
                            clickFunction={() => addInducement(ind.id)}
                        />
                    {:else}
                        <i
                            class="material-symbols-outlined no-op no-transition no-print"
                            >block</i
                        >
                    {/if}
                </div>
            </div>
        {/each}
    {/if}
{/if}

<style lang="scss">
    .inducement {
        &__heading {
            background-color: var(--main-colour);
            font-weight: bold;
            // font-family: var(--display-font);
            padding: 8px;
            grid-column: 1 / -1;
            font-size: 0.875rem;
            color: var(--white);
            line-height: 28px;
            vertical-align: middle;
            display: flex;
            align-items: center;
            text-transform: uppercase;
            cursor: pointer;
        }
        &__amount {
            text-align: right;
        }
        &__display-name {
            @media (max-width: 370px) {
                grid-column: 1 / -1;
                margin-top: 8px;
            }
        }
    }
</style>
