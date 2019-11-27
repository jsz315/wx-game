import * as THREE from '../libs/three/index.js'
const TWEEN = require('../libs/Tween.js');

export default class FollowCamera{

    constructor(camera, target){
        this.camera = camera;
        this.target = target;
        this.pot = null;
        this.running = false;
    }

    update(){
        let p = this.target.position;
        
        if(p.z < 10){
            // this.camera.lookAt(new THREE.Vector3());
            if(this.running){
                this.running = false;
                // this.camera.lookAt(new THREE.Vector3());
                // new TWEEN.Tween(this.pot).to({x: 0, y: 4, z: 10}, 1)
                //     .easing(TWEEN.Easing.Quadratic.Out)
                //     .onUpdate(()=>{this.camera.lookAt(this.pot);})
                //     .onComplete(()=>{})
                //     .start();
            }
            
        }
        else{
            let z = p.z + 32;
            this.camera.position.set(p.x, p.y + 20, z);
            this.camera.lookAt(p);
            this.pot = p;
        }
        
    }
}