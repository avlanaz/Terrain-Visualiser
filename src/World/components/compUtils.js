// File containing the helper functions for creating THREEjs components

import {
    MeshStandardMaterial,
    TextureLoader,
} from 'three';


function createMaterialFromTexture(textureImg) {

    //create a texture loader
    const textureLoader = new TextureLoader();

    const texture = textureLoader.load(
        textureImg
    );

    //create a "standard" material
    const material = new MeshStandardMaterial({
        map: texture,
    });

    return material;
}

export { 
    createMaterialFromTexture, 
};