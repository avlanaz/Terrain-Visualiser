import * as THREE from 'three';
import { World } from '../World/World.js';

class SceneManager {
    constructor(containerElement) {
        // create new world
        this.world = new World(containerElement);
    }

    render() {
        this.world.render();
    }
}

export default SceneManager;