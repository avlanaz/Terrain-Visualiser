import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { setupModel } from "./setupModel";

import parrotModel from '../assets/models/Parrot.glb';
import flamingoModel from '../assets/models/Flamingo.glb';
import storkModel from '../assets/models/Stork.glb';

async function loadBirds() {
    const loader = new GLTFLoader();

    const [ parrotData, flamingoData, storkData ] = await Promise.all([
        loader.loadAsync(parrotModel),
        loader.loadAsync(flamingoModel),
        loader.loadAsync(storkModel),
    ]);

    console.log("Successfully loaded parrot data.", parrotData);

    const parrot = setupModel(parrotData);
    const flamingo = setupModel(flamingoData);
    const stork = setupModel(storkData);

    return {
        parrot,
        flamingo,
        stork,
    }
}

export { loadBirds };