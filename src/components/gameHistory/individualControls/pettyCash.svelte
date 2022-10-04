<!-- <script lang="ts">
    export let value: number;
</script> -->

<div class="petty-cash">
    <!-- <div>
        <label for="your-tv">Your TV</label>
        <input type="number" name="your-tv" id="your-tv" autocomplete="off" />
    </div>
    <div>
        <label for="op-tv">Opponent TV</label>
        <input type="number" name="op-tv" id="op-tv" autocomplete="off" />
    </div> -->
    <div>
        <label for="petty-cash">Petty Cash</label>
        <input
            type="number"
            autocomplete="off"
            id="petty-cash"
            step="1000"
            max="10000000"
        />
    </div>
</div>

<style>
    .petty-cash {
        display: flex;
        text-align: center;
    }
</style>
