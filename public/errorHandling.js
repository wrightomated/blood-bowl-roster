window.onerror = function (message, source, lineno, colno, error) {
    console.error(error);

    localStorage.removeItem('selectedTeam');
    localStorage.setItem(
        'roster',
        JSON.stringify({
            teamId: 0,
            players: [],
            teamName: '',
            teamType: '',
            extra: { dedicated_fans: 0, rerolls: 0 },
            inducements: {},
            treasury: 1000,
            mode: 'exhibition',
            format: 'elevens',
        })
    );
};
