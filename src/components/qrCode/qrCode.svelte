<script lang="ts">
    import { rosterToString } from '../../helpers/rosterToString';
    import { roster } from '../../store/teamRoster.store';

    const QRCode = require('qrcode');

    const text = rosterToString($roster);

    QRCode.toCanvas(
        document.getElementById('qr-code-canvas'),
        text,
        function (error) {
            if (error) console.error(error);
            console.log('success!');
        }
    );
</script>

<canvas id="qr-code-canvas" />
