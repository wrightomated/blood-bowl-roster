<script lang="ts">
    export let char: string;
    export let value: string;
    export let change: number;
</script>

<div class="characteristic">
    <div class="char">{char}</div>
    <div class="value" class:improved={change > 0} class:degraded={change < 0}>
        {value}
    </div>
</div>

<style lang="scss">
    @import '../../styles/colour';
    .characteristic {
        height: 50px;
        width: 50px;
        position: relative;
        border: 1px solid $main-colour;
        border-top: 0;
        margin-right: 5px;
        text-align: center;
    }
    .char {
        position: absolute;
        left: 0;
        top: -1px;
        font-size: 12px;
        background: $main-colour;
        color: white;
        padding: 2px;
    }
    .value {
        margin-top: 20px;
        font-size: 20px;
    }
    .improved {
        color: green;
    }
    .degraded {
        color: $main-colour;
    }
</style>
