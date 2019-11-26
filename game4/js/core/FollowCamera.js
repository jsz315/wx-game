import * as THREE from '../libs/three/index.js'

export default class FollowCamera{

    constructor(camera, target){
        this.camera = camera;
        this.target = target;
    }

    update(){
        let p = this.target.position;
        
        if(p.z < 20){
            // this.camera.position.set(p.x, p.y + 28, z);
            this.camera.lookAt(new THREE.Vector3());
        }
        else{
            let z = p.z + 32;
            this.camera.position.set(p.x, p.y + 20, z);
            this.camera.lookAt(p);
        }
        
    }
}