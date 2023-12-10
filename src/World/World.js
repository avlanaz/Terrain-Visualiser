/* 
    The file containing the World class for Three.js
*/

import { createCamera } from './components/camera.js';
import { createCube } from './components/cube.js';
import { createMesh } from './components/mesh.js';
import { createLights } from './components/light.js';
import { createScene } from './components/scene.js';
import { loadBirds } from './components/birds/birds.js';

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';

import simpleMap from './components/assets/maps/simpleHeightMap.png';
import lowPolyMap from './components/assets/maps/lowPolyHeightMap.png';
import sampleMap from './components/assets/maps/GoraturGraetorum.jpg';
import sampleColorMap from './components/assets/maps/goratur_color.png';
import mtfujiMap from './components/assets/maps/mt_fuji.png';

let camera;
let scene;
let renderer;


class World {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();

        container.append(renderer.domElement);  

        const cube = createCube();
        const { mainLight, ambientLight } = createLights();

        const controls = createControls(camera, renderer.domElement);
        controls.target.copy(cube.position);

        scene.add(ambientLight, mainLight);
        camera.lookAt(cube.position);
        this.init();

        const resizer = new Resizer(container, camera, renderer);
        resizer.onResize = () => {
            this.render();
        }
    }

    async init() {
        // asynchronous setup, where we load the models and files
        const { parrot, flamingo, stork } = await loadBirds();

        scene.add(parrot, flamingo, stork);
        //await this.addMesh(mtfujiMap, mtfujiMap);
    }
    
    async addMesh(map, textureMap) {
        console.log("Adding mesh...");
        const mesh = await createMesh(map, textureMap);
        scene.add(mesh);
        console.log("Mesh added.");
    }

    render() {
        renderer.render(scene, camera);
    }
}

export { World };