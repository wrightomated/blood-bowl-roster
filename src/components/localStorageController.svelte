<script lang="ts">
    import { currentTeam } from '../store/currentTeam.store';
    import { localStorageConsent } from '../store/localStorageConsent.store';
    import { savedRosterIndex } from '../store/saveDirectory.store';
    import { roster } from '../store/teamRoster.store';

    const setLocalStorage = (key: string, value: object) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    roster.subscribe((x) => {
        if ($localStorageConsent) {
            setLocalStorage('roster', x);
        }
    });

    currentTeam.subscribe((x) => {
        if ($localStorageConsent) {
            setLocalStorage('selectedTeam', x);
        }
    });

    savedRosterIndex.subscribe((x) => {
        if ($localStorageConsent) {
            setLocalStorage('rosterIndex', x);
        }
    });
</script>
