import { createUserWithEmailAndPassword } from 'firebase/auth';

export async function createUser(email: string, password: string) {
    return import('./firebase.service').then((service) =>
        createUserWithEmailAndPassword(service.auth, email, password)
    );
}
