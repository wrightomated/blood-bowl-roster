<script lang="ts">
    import { columnControlsOpen } from '../../store/columnControls.store';
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
    <div class="close">
        <MaterialButton
            symbol="close"
            hoverText="Close Modal"
            clickFunction={closeModal}
        />
    </div>
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
        min-width: 300px;
        padding: 40px;
        border-radius: 25px;
    }
</style>
