<script lang="ts"></script>

<div class="modal">This is modal</div>
<div class="overlay" />

<style lang="scss">
    .modal {
        // position: absolute;
        // left: 50%;
        // transform: translateX(-50%);
        // z-index: 101;
        // background-color: white;
        // min-width: 300px;
    }
    .overlay {
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: black;
        z-index: 100;
    }
</style>
