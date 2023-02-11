import {
    FirebaseStorage,
    getStorage,
    ref as storageRef,
    uploadBytes,
} from 'firebase/storage';
import type { FirebaseApp } from 'firebase/app';

let storage: FirebaseStorage;
let app: FirebaseApp;

export async function initStorage() {
    if (storage) return;
    await import('./firebaseAuth.service').then((service) => {
        app = service.app;
        // auth = service.auth;
    });
    storage = getStorage(app);
}

export async function uploadFile(file) {
    await initStorage();
    const imgRef = storageRef(storage, 'mountains.png');
    const mountainImagesRef = storageRef(storage, 'images/mountains.png');
    return uploadBytes(mountainImagesRef, file);
}

// import { getStorage, ref, uploadBytes } from "firebase/storage";

// const storage = getStorage();
// const storageRef = ref(storage, 'some-child');

// 'file' comes from the Blob or File API
