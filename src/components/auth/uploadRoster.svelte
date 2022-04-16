<script lang="ts">
    import { roster } from '../../store/teamRoster.store';

    // const path = 'users/uuid/rosters/roster';
    // import { doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
    // import { app, auth } from './firebaseAuth.service';

    // Create an initial document to update.
    async function setDocument() {
        import('./firebaseDB.service').then((service) =>
            service.uploadRoster($roster)
        );
    }
    // async function setDocument() {
    //     const db = getFirestore(app);
    //     const rosterRef = doc(
    //         db,
    //         'users',
    //         auth.currentUser.uid,
    //         // 'RiawUZhK06ROJ4E9z3BIO75wv2g2',
    //         'rosters',
    //         '1'
    //     );
    //     const cake = await setDoc(rosterRef, {
    //         teamId: 3,
    //         players: [
    //             {
    //                 playerName: '',
    //                 player: {
    //                     id: 7,
    //                     position: 'Black Orc',
    //                     playerStats: [4, 4, 4, 5, 10],
    //                     cost: 90,
    //                     skills: [50, 52],
    //                     primary: ['G', 'S'],
    //                     secondary: ['A', 'P'],
    //                 },
    //                 alterations: { spp: 0, ni: 0 },
    //             },
    //             {
    //                 playerName: '',
    //                 player: {
    //                     id: 7,
    //                     position: 'Black Orc',
    //                     playerStats: [4, 4, 4, 5, 10],
    //                     cost: 90,
    //                     skills: [50, 52],
    //                     primary: ['G', 'S'],
    //                     secondary: ['A', 'P'],
    //                 },
    //                 alterations: { spp: 0, ni: 0 },
    //             },
    //         ],
    //         teamName: 'asd',
    //         teamType: 'Black Orc',
    //         extra: { dedicated_fans: 1 },
    //         inducements: {},
    //         treasury: 820,
    //         mode: 'league',
    //         format: 'elevens',
    //     });
    //     console.log(cake);
    // }
</script>

<button on:click={setDocument}>document</button>
