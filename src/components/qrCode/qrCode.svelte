<script lang="ts">
    import { onMount } from 'svelte';
    import { rosterToString } from '../../helpers/rosterToString';
    import { roster } from '../../store/teamRoster.store';
    import QRCode from 'qrcode';

    let link = 'https://bbroster.com?code=' + rosterToString($roster);

    onMount(() => {
        QRCode.toCanvas(
            document.getElementById('canvas'),
            link,
            function (error) {
                if (error) console.error(error);
                console.log('success!');
            }
        );
    });
</script>

<canvas id="canvas" />

<style>
    canvas {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100px;
        height: 100px;
    }
</style>
