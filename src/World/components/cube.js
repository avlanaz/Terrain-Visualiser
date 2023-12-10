import { 
    BoxGeometry, 
    MathUtils,
    Mesh
} from 'three';

import { mapToMesh } from '../../map/map';
import { createMaterialFromTexture } from './compUtils';

import uv from './assets/textures/uv-test-bw.png';

function createCube() {
    // create a geometry
    const spec = {
        color: 'peachpuff',
    }
    const geometry = new BoxGeometry(2, 2, 2);
    const material = createMaterialFromTexture(uv);

    const cube = new Mesh(geometry, material);

    cube.rotation.set(0, -0.6, 0.1)

    return cube
}

export { createCube };