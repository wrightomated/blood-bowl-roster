<script lang="ts">
    import { onMount } from 'svelte';
    import MaterialButton from './materialButton.svelte';

    export let alertId: string; // Unique ID for this alert
    export let variant: 'info' | 'warning' | 'success' | 'error' = 'info';
    export let dismissible: boolean = true;

    let visible = false;
    const storageKey = `alert-dismissed-${alertId}`;

    onMount(() => {
        // Check if alert has been dismissed
        const dismissed = sessionStorage.getItem(storageKey);
        visible = !dismissed;
    });

    function dismiss() {
        visible = false;
        sessionStorage.setItem(storageKey, 'true');
    }
</script>

{#if visible}
    <div class="alert alert--{variant}" role="alert">
        <div class="alert__content">
            <slot />
        </div>
        {#if dismissible}
            <MaterialButton
                symbol="cancel"
                hoverText="Dismiss"
                clickFunction={dismiss}
            />
        {/if}
    </div>
{/if}

<style lang="scss">
    .alert {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 12px 16px;
        border-radius: 12px;
        margin-bottom: 16px;
        border: 2px solid;
        animation: slideIn 0.3s ease-out;
        font-family: var(--body-font);

        &--info {
            // background-color: var(--secondary-background-colour);
            border-color: var(--secondary-colour);
            color: #333;
        }

        &--warning {
            background-color: #fff8e1;
            border-color: var(--fire);
            color: #333;
        }

        &--success {
            background-color: #f1f8f4;
            border-color: var(--life);
            color: #333;
        }

        &--error {
            background-color: #fef5f5;
            border-color: var(--main-colour);
            color: #333;
        }

        &__content {
            flex: 1;
            font-size: 14px;
            line-height: 1.5;

            :global(p) {
                margin: 0 0 8px 0;

                &:last-child {
                    margin-bottom: 0;
                }
            }

            :global(strong) {
                font-weight: 600;
                font-family: var(--display-font);
            }
        }

        &__dismiss {
            flex-shrink: 0;
            margin-top: -4px;
        }
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media print {
        .alert {
            display: none;
        }
    }
</style>
