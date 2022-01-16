<script lang="ts">
    import { columnControlsOpen } from '../../store/columnControls.store';
    import MaterialButton from './materialButton.svelte';
    const closeModal = () => columnControlsOpen.set(false);
</script>

<div class="modal" class:closed={!$columnControlsOpen}>
    <div class="close">
        <MaterialButton
            symbol="close"
            hoverText="Close Modal"
            clickFunction={closeModal}
        />
    </div>
    <slot />
</div>
<div
    class="overlay"
    class:overlay--visible={$columnControlsOpen}
    on:click={closeModal}
/>

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
