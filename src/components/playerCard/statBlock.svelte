<script lang="ts">
    export let char: string;
    export let value: string;
    export let change: number;
    export let variant: string = 'secondary';
    export let topBorder: boolean = false;
</script>

<div
    class="characteristic characteristic--{variant}"
    class:characteristic--top-border={topBorder}
>
    <div class="char">{char}</div>
    <div class="value" class:improved={change > 0} class:degraded={change < 0}>
        {value}
    </div>
</div>

<style lang="scss">
    @import '../../styles/font';
    .characteristic {
        height: 50px;
        width: 50px;
        position: relative;
        border: var(--secondary-border);
        border-top: 0;
        margin-right: 5px;
        text-align: center;
        &--top-border {
            border-top: var(--secondary-border);
        }

        &--neutral {
            border-color: #555;
            border-top: 2px solid;

            > .char {
                background-color: #555;
            }
        }
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
        text-decoration: underline;
    }
    .degraded {
        color: var(--main-colour);
        text-decoration: underline;
    }
</style>
