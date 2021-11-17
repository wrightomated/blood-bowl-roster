<script lang="ts">
    import { roster } from '../store/teamRoster.store';

    const writeTitle = (options: { teamName?: string; teamType?: string }) => {
        const suffix =
            `${options.teamName ? options.teamName + ' - ' : ''}` +
            options.teamType;
        const title = `BB Roster${suffix ? ' - ' + suffix : ''}`;
        if (document.title !== title) {
            document.title = title;
        }
    };

    roster.subscribe((x) => {
        try {
            writeTitle({ teamName: x?.teamName, teamType: x?.teamType });
        } catch (error) {
            console.error('Unable to update document title');
        }
    });
</script>
