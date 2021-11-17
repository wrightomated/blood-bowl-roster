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
    @import '../../styles/font';
    .characteristic {
        height: 50px;
        width: 50px;
        position: relative;
        border: 2px solid var(--secondary-colour);
        border-top: 0;
        margin-right: 5px;
        text-align: center;
    }
    .char {
        position: absolute;
        left: 0;
        top: -1px;
        font-size: 12px;
        background: var(--secondary-colour);
        color: white;
        padding: 2px;
    }
    .value {
        margin-top: 22px;
        font-size: 16px;
        font-family: $display-font;
    }
    .improved {
        color: green;
    }
    .degraded {
        color: var(--main-colour);
    }
</style>
