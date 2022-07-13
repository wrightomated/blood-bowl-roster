<script lang="ts">
    import { modalState } from '../../store/modal.store';
    import MaterialButton from './materialButton.svelte';

    function onOverlayClick() {
        if ($modalState.canClose) {
            modalState.close();
        }
    }

    const closeModal = () => {
        modalState.close();
    };

    modalState.subscribe((state) => {
        if (state.isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100%';
        } else {
            document.body.style.overflow = 'auto';
            document.body.style.height = 'auto';
        }
    });
</script>

<div class="modal" class:closed={!$modalState.isOpen}>
    {#if $modalState.canClose}
        <div class="close">
            <MaterialButton
                symbol="close"
                hoverText="Close Modal"
                clickFunction={closeModal}
            />
        </div>
    {/if}
    <div class="content">
        <svelte:component
            this={$modalState.component}
            {...$modalState.componentProps}
        />
    </div>
</div>

<div
    class="overlay"
    class:overlay--visible={$modalState.isOpen}
    on:click={onOverlayClick}
/>

<style lang="scss">
    .close {
        position: absolute;
        z-index: 12;
        top: 1.5em;
        right: 1.5em;
    }
    .closed {
        display: none;
    }
    .modal {
        position: fixed;
        left: 50%;
        top: 5vh;
        transform: translateX(-50%);
        z-index: 11;
        background-color: white;
        min-width: 240px;
        padding: 20px 2px;
        border-radius: 25px;
        box-shadow: 0 2px 3px 0 rgba(60, 64, 67, 0.3),
            0 6px 10px 4px rgba(60, 64, 67, 0.15);
        @media screen and (max-width: 450px) {
            top: 5%;
        }
    }
    .content {
        max-height: 70vh;
        overflow-y: auto;
        padding: 20px;
    }
    .overlay {
        z-index: 10;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.33);
        transition: opacity 250ms ease-in-out;
        opacity: 0;
        visibility: hidden;
        display: block;

        &--visible {
            visibility: visible;
            opacity: 1;
        }
    }
</style>
