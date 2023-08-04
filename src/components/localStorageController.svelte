<script lang="ts">
    import { currentTeam } from '../store/currentTeam.store';
    import { localStorageConsent } from '../store/localStorageConsent.store';
    import { rosterViewMode } from '../store/rosterDisplayMode.store';
    import { savedRosterIndex } from '../store/saveDirectory.store';
    import { roster } from '../store/teamRoster.store';
    import {
        showNewTeamDialogue,
        teamSelectionOpen,
    } from '../store/teamSelectionOpen.store';

    const setLocalStorageObject = (key: string, value: object) => {
        if (key && value && typeof value === 'object') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    };

    roster.subscribe((x) => {
        if ($localStorageConsent) {
            setLocalStorageObject('roster', x);
        }
        if (!x.teamType) {
            teamSelectionOpen.set(true);
            showNewTeamDialogue.set(true);
        }
    });

    currentTeam.subscribe((x) => {
        if ($localStorageConsent) {
            setLocalStorageObject('selectedTeam', x);
        }
    });

    savedRosterIndex.subscribe((x) => {
        if ($localStorageConsent) {
            setLocalStorageObject('rosterIndex', x);
        }
    });

    rosterViewMode.subscribe((x) => {
        localStorage.setItem('rosterViewMode', x);
    });
</script>
