// This file will create a mesh map using an image file of a map in jpg or png format.

import { Image } from 'image-js';

/**
 * Function to convert an image pixel data into a mesh map.
 * where the corresponding luminosity value (black-white) of each pixel is the height of the mesh.
 * white being 1 and black being 0
 */
async function mapToMesh(imageSrc, scale, heightScale) {
    console.log("Mapping image to mesh...");
    // Iterate every pixel in the image (considering every pixel as a square)
    // and create a vertex for each pixel.
    let image = await Image.load(imageSrc);
    let greyImage = image.grey();

    const scalingFactor = scale/greyImage.width;

    
    const vertices = [];
    const normals = [];
    const uvs = [];

    // Default normal
    const normal = [0, 1, 0];

    // Iterate through the pixels of the image.
    for (let y = 0; y < greyImage.height; y++) {
        for (let x = 0; x < greyImage.width; x++) {
            // Get the luminosity of the pixel using the greyscale image.
            const pixel = greyImage.getPixelXY(x, y, 2);
            let luminosity = pixel[0]/255;

            // Create a vertex.
            const vertex = [
                x * scalingFactor,
                luminosity * heightScale,
                y * scalingFactor,
            ];
            // Add the vertex to the vertices array.
            vertices.push(...vertex);


            // Add the normals
            normals.push(...normal);

            // Ad the uvs
            uvs.push(x/greyImage.width, 1-y/greyImage.height);
        }
    }

    const indices = generateIndex(greyImage.width, greyImage.height);

    console.log("Mapping complete.");/* 
    console.log("Vertices: ", vertices.length)
    console.log("Vertices: ", vertices) */
    console.log("Indices:", indices)
    return {vertices, normals, uvs, indices};
}

// Generate indices for a plane mesh given its width and height
function generateIndex(width, height) {
    const indices = [];
    for (let x = 0; x < width - 1; x++) {
        for (let y = 0; y < height - 1; y++) {
            const a = x + y * width;
            const b = (x + 1) + y * width;
            const c = x + (y + 1) * width;
            const d = (x + 1) + (y + 1) * width;
            indices.push(a, c, b);
            indices.push(b, c, d);
        }
    }
    return indices;
}

export {mapToMesh}