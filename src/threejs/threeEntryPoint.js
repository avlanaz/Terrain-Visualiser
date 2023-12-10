
import SceneManager from "./SceneManager";
import { World } from "../World/World";

const threeEntryPoint = (containerElement) => {
    const world = new World(containerElement);
    render();


    function render(time) {
        requestAnimationFrame(render);
        world.render();
    }
}

export default threeEntryPoint;