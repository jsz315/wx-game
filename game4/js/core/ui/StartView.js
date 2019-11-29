import * as THREE from '../../libs/three/index.js'
// const OIMO = require('../libs/oimo/index.js')
import DataCenter from "../DataCenter";

let { pixelRatio, windowHeight, windowWidth, state, worker } = DataCenter;
const TORAN = 180 / Math.PI;

export default class StartView{

    constructor(){
        let mesh = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 4), new THREE.MeshNormalMaterial());
        this.view = mesh;
    }

    setMaterial(material){
        this.view.material = material;
    }

    show(camera){
        // this.view.position.set(camera.position.x, camera.position.y - 10, camera.position.z - 30);
        // this.view.rotation.set(90, camera.rotation.y, camera.rotation.z);
        // this.view.translateZ(20);
        // this.view.lookAt(camera);
    }
}