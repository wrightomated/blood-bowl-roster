<script lang="ts">
    export let options: string[];
    export let optionMap: {
        [key: string]: {
            title: string;
            icon: string;
            caption: string;
            show: () => boolean;
            component: any;
            componentProps?: any;
        };
    };

    let selectedOption = options[0];
    let mainComponent = optionMap[selectedOption].component;

    function selected(option: string) {
        selectedOption = option;
        mainComponent = optionMap[option].component;
    }
</script>

<section>
    <header>
        <div class="button-container">
            {#each options as option}
                {#if optionMap[option].show()}
                    <button
                        class="option-button"
                        class:option-button--selected={selectedOption ===
                            option}
                        on:click={() => selected(option)}
                    >
                        <i
                            class="material-symbols-outlined icon"
                            title={optionMap[option].title}
                            >{optionMap[option].icon}</i
                        >
                    </button>
                {/if}
            {/each}
        </div>
    </header>
    <slot />
    <div class="option-box">
        <h3 class="option-title">{selectedOption}</h3>
        <div class="option-content">
            <svelte:component
                this={mainComponent}
                {...optionMap[selectedOption].componentProps}
            />
        </div>
    </div>
</section>

<style lang="scss">
    header {
        border-radius: 20px 20px 0 0;
        background-color: var(--secondary-colour);
    }
    .button-container {
        display: flex;
        justify-content: center;
        gap: 12px;
        padding: 6px;
        border-bottom: 2px solid var(--secondary-colour);
    }
    .option-button {
        background: none;
        border: none;
        margin: 0;
        font-family: var(--display-font);
        cursor: pointer;

        .icon {
            font-size: 32px;
            color: var(--secondary-background-colour);
        }
        &--selected {
            color: var(--white);
            .icon {
                text-decoration: underline;
            }
        }
    }
    .option-box {
        padding: 0 12px 12px 12px;
    }
    .option-title {
        text-transform: capitalize;
    }
    .option-content {
        margin-top: 16px;
    }
</style>
