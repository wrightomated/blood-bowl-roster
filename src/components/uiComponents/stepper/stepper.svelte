<script lang="ts">
    import { _ } from 'svelte-i18n';
    import type { Writable } from 'svelte/store';
    import type { StepperStep } from '../../../models/stepper.model';
    export let stepStore: Writable<StepperStep[]> & {
        nextStep: () => void;
        previousStep: () => void;
        goToStep: (index: number) => void;
    };
    export let title: string;
</script>

<section>
    <header>
        <h2>{$_(title)}</h2>
    </header>
    <div class="button-container">
        <button
            class="rounded-button"
            on:click={stepStore.previousStep}
            type="button"
            disabled={!!$stepStore.find(
                (x, i) => x.status === 'current' && i === 0
            )}>{$_('match.previous')}</button
        >

        <button
            disabled={!$stepStore.find(
                (x, i) => x.status === 'current' && i < $stepStore.length - 1
            )}
            class="next-button rounded-button"
            on:click={stepStore.nextStep}
            type="button">{$_('match.next')}</button
        >
    </div>
    <form
        on:submit|preventDefault={(e) => {
            e.preventDefault;
        }}
    >
        {#each $stepStore as step, i}
            <div class="step step--{step.status}">
                <div
                    class="step-title"
                    tabindex="0"
                    role="button"
                    on:click={() => stepStore.goToStep(i)}
                    on:keydown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            stepStore.goToStep(i);
                        }
                    }}
                >
                    <i
                        class="material-symbols-outlined checkmark checkmark--{step.status}"
                        >{step.status === 'complete'
                            ? 'check_circle'
                            : step.status === 'current'
                              ? 'radio_button_checked'
                              : 'circle'}</i
                    >
                    <h3>
                        {$_(step.title)}
                    </h3>
                </div>
                {#if step.status === 'current'}
                    <div class="component-container">
                        <svelte:component this={step.component} />
                    </div>
                {/if}
            </div>
        {/each}
    </form>
</section>

<style lang="scss">
    section {
        form {
            display: flex;
            flex-direction: column;
        }
    }
    .step {
        color: var(--neutral);
        &-title {
            display: flex;
            align-items: center;
            gap: 8px;
            h3 {
                margin: 4px 0;
                text-align: center;
            }
        }
        &:not(.step--current) {
            .step-title:hover {
                color: var(--secondary-colour);
                cursor: pointer;
            }
        }

        &--current {
            color: #333;
        }
    }

    .label-input {
        display: flex;
        align-items: center;
        gap: 4px;
    }
    .digits {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    header {
        text-align: center;
    }

    .button-container {
        display: flex;
        margin-top: 16px;
        justify-content: center;

        button {
            padding: 8px;
            min-width: 80px;
        }
    }

    .checkmark {
        color: var(--secondary-colour);
        &--complete {
            animation: tick 250ms ease-in;
            &:hover {
                font-variation-settings: 'FILL' 1;
            }
        }

        &--current,
        &--future {
            font-variation-settings: 'FILL' 0;
            &:hover {
                font-variation-settings: 'FILL' 0;
            }
        }
    }

    @keyframes tick {
        from {
            font-variation-settings: 'FILL' 0;
        }
        to {
            font-variation-settings: 'FILL' 1;
        }
    }
</style>
