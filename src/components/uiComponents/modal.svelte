<script lang="ts">
    import { quadInOut } from 'svelte/easing';
    import { fade, slide } from 'svelte/transition';
    import { modalState } from '../../store/modal.store';
    import { scrollYHistory } from '../../store/scrollYHistory.store';
    import MaterialButton from './materialButton.svelte';

    let dialog: HTMLDialogElement;

    function onOverlayClick(event) {
        if (event.target?.nodeName === 'DIALOG' && $modalState.canClose) {
            closeModal();
        }
    }

    function closeModal() {
        modalState.close();
    }

    function handleKeydown(event) {
        if (
            $modalState.isOpen &&
            $modalState.canClose &&
            event?.code === 'Escape'
        ) {
            closeModal();
        }
    }

    modalState.subscribe((state) => {
        if (state.isOpen && !!dialog) {
            dialog.showModal();
        } else if (!state.isOpen && !!dialog) {
            dialog.close();
        }
    });
</script>

<svelte:window on:keydown={handleKeydown} on:click={onOverlayClick} />

<dialog
    bind:this={dialog}
    class:no-padding={$modalState.compact}
    transition:fade={{ duration: 300, easing: quadInOut }}
>
    <div class="content" class:no-padding={$modalState.compact}>
        <svelte:component
            this={$modalState.component}
            {...$modalState.componentProps}
        />
    </div>
    {#if $modalState.canClose}
        <div class="close">
            <MaterialButton
                symbol="cancel"
                hoverText="Close Modal"
                clickFunction={closeModal}
                cyData="close-modal"
            />
        </div>
    {/if}
</dialog>

<style lang="scss">
    dialog {
        &[open] {
            top: 5vh;
            padding: 0;
            border-radius: 25px;
            border: none;
            transition: opacity 300ms ease-in-out;
            box-shadow: 0 2px 3px 0 rgba(60, 64, 67, 0.3),
                0 6px 10px 4px rgba(60, 64, 67, 0.15);
        }
        &::backdrop {
            background-color: rgba(0, 0, 0, 0.33);
        }
        .content {
            padding: 20px;

            @media screen and (min-width: 801px) {
                width: 780px;
            }
            @media screen and (max-width: 800px) {
                min-width: calc(100vw - 90px);
            }
            &.no-padding {
                padding: 0;
            }
        }
        .close {
            position: absolute;
            z-index: 12;
            top: 12px;
            right: 12px;
        }
        &.no-padding {
            padding: 0;
            .close {
                color: var(--white);
            }
        }
    }

    // .modal {
    //     position: absolute;
    //     // width: min(50vw, 780px);
    //     left: 50%;
    //     top: 5vh;
    //     margin-bottom: 5vh;
    //     transform: translateX(-50%);
    //     z-index: 11;
    //     background-color: white;
    //     min-width: 240px;
    //     padding: 20px 2px;
    //     border-radius: 25px;
    //     box-shadow: 0 2px 3px 0 rgba(60, 64, 67, 0.3),
    //         0 6px 10px 4px rgba(60, 64, 67, 0.15);
    //     @media screen and (min-width: 801px) {
    //         min-width: 780px;
    //     }
    //     @media screen and (max-width: 800px) {
    //         min-width: 96%;
    //     }
    // }
    // .content {
    //     // max-height: 70vh;
    //     overflow-y: auto;
    //     padding: 20px;
    // }
    // .overlay {
    //     z-index: 10;
    //     position: fixed;
    //     width: 100%;
    //     height: 100%;
    //     top: 0;
    //     left: 0;
    //     background-color: rgba(0, 0, 0, 0.33);
    //     transition: opacity 300ms ease-in-out;
    //     opacity: 0;
    //     visibility: hidden;
    //     display: block;

    //     &--visible {
    //         visibility: visible;
    //         opacity: 1;
    //     }
    // }
    // .no-padding {
    //     padding: 0;
    //     .close {
    //         color: var(--white);
    //     }
    // }
</style>
