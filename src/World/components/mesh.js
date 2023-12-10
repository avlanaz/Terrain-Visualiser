import { 
    BufferAttribute,
    BufferGeometry, 
    Mesh,
 } from "three";

import { mapToMesh } from "../../map/map";
import { createMaterialFromTexture } from "./compUtils";


async function createMesh(map, textureMap) {
    console.log("Creating mesh...");
    const scale = 10;
    const heightScale = 1;
    const {vertices, normals, uvs, indices} = await mapToMesh(map, scale, heightScale);
    const geometry = new BufferGeometry();

    const positionNumComponents = 3;
    const normalNumComponents = 3;
    const uvNumComponents = 2;

    geometry.setAttribute(
		'position',
		new BufferAttribute( new Float32Array( vertices ), positionNumComponents ) );

    geometry.setAttribute(
		'normal',
		new BufferAttribute( new Float32Array( normals ), normalNumComponents ) );

    geometry.setAttribute(
		'uv',
		new BufferAttribute( new Float32Array( uvs ), uvNumComponents ) );

    geometry.setIndex(indices);
    geometry.center();

    const material = createMaterialFromTexture(textureMap);

    const mesh = new Mesh(geometry, material);

    console.log("Mesh created.");
    console.log(geometry.getAttribute('position'));
    return mesh;
}

export { createMesh }