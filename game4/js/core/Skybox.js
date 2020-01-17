import * as THREE from '../libs/three/index.js'
import DataCenter from "./DataCenter";
let { pixelRatio, windowHeight, windowWidth, state, worker, mapSize, explodeMaterials } = DataCenter;

export default class Skybox{

    constructor(scene){
        var path = "images/skybox/";
        var directions  = ["px", "nx", "py", "ny", "pz", "nz"];
        var format = ".jpg";
        var skyGeometry = new THREE.BoxGeometry(mapSize, mapSize, mapSize);
        var materialArray = [];
        for (var i = 0; i < 6; i++){
            var mat = new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(path + directions[i] + format),
                side: THREE.BackSide
            });

            materialArray.push(mat);

            // mat.emissive = new THREE.Color(1, 1, 1);
            // mat.emissiveIntensity = 0;
            // explodeMaterials.push(mat);
        }
        let mesh = new THREE.Mesh(skyGeometry, materialArray);
        scene.add(mesh);
    }
}