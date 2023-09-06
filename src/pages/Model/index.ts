import { Viewer, Cartesian3, Entity } from "cesium";

class Model {
    viewer: Viewer;
    // model: Entity
    constructor(
        viewer: Viewer,
        gui: dat.GUI,
        url: string,
        position: Cartesian3
    ){
        this.viewer = viewer
    }
}

export default Model;