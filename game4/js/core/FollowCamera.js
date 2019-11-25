import * as THREE from '../libs/three/index.js'

export default class FollowCamera{

    constructor(camera, target){
        this.camera = camera;
        this.target = target;
    }

    update(){
        let p = this.target.position;
        
        if(p.z < 10){
            // this.camera.position.set(p.x, p.y + 28, z);
            this.camera.lookAt(p);
        }
        else{
            let z = p.z + 32;
            this.camera.position.set(p.x, p.y + 28, z);
            this.camera.lookAt(p);
        }
        
    }
}