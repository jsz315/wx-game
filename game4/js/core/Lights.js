import * as THREE from '../libs/three/index.js'

export default class Lights{

    constructor(scene){

        this.ambientLight = new THREE.AmbientLight(0xa4a4a4);
        scene.add(this.ambientLight);

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.72);
        this.directionalLight.position.set(100, 1000, -100);
        this.directionalLight.target.position.set(0, 0, 0);
        this.directionalLight.castShadow = true;

        let shadowSize = 300;
        this.directionalLight.shadow.camera = new THREE.OrthographicCamera(-shadowSize, shadowSize, shadowSize, -shadowSize, 500, 1600);
        this.directionalLight.shadow.bias = 0.0001;
        this.directionalLight.shadow.mapSize.width = this.directionalLight.shadow.mapSize.height = 1024;
        scene.add(this.directionalLight);

    }
}