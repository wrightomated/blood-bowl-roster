<script lang="ts">
    import { modalState } from '../../store/modal.store';
    import { overlayVisible } from '../../store/overlayVisible.store';
    import MaterialButton from './materialButton.svelte';

    $: $overlayVisible, overlayChanged();

    const overlayChanged = () => {
        if (!$overlayVisible && $modalState.isOpen) {
            modalState.set({ ...$modalState, isOpen: false });
        }
    };

    const closeModal = () => {
        modalState.set({ ...$modalState, isOpen: false });
        overlayVisible.set(false);
    };
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
    <svelte:component this={$modalState.component} />
</div>

<style lang="scss">
    .close {
        position: absolute;
        top: 1.5em;
        right: 1.5em;
    }
    .closed {
        display: none;
    }
    .modal {
        position: absolute;
        left: 50%;
        top: 10%;
        transform: translateX(-50%);
        z-index: 11;
        background-color: white;
        min-width: 240px;
        padding: 40px;
        border-radius: 25px;
        box-shadow: 0 2px 3px 0 rgba(60, 64, 67, 0.3),
            0 6px 10px 4px rgba(60, 64, 67, 0.15);
    }
</style>
