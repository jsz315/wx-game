import * as THREE from '../libs/three/index.js'

export default class Skybox{

    constructor(scene){
        var path = "images/skybox/";
        var directions  = ["px", "nx", "py", "ny", "pz", "nz"];
        var format = ".jpg";
        var skyGeometry = new THREE.BoxGeometry(1500, 1500, 1500);
        var materialArray = [];
        for (var i = 0; i < 6; i++){
            materialArray.push( new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(path + directions[i] + format),
                side: THREE.BackSide
            }));
        }
        let mesh = new THREE.Mesh(skyGeometry, materialArray);
        scene.add(mesh);
    }
}