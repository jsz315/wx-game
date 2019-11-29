import * as THREE from '../libs/three/index.js'
import DataCenter from './DataCenter.js';
const TWEEN = require('../libs/Tween.js');
let OrbitControls = require('../../miniprogram_npm/three-orbit-controls/index.js')(THREE)
let { pixelRatio, windowHeight, windowWidth, state, worker } = DataCenter;

export default class FollowCamera{

    constructor(canvas, target){
        this.camera = new THREE.PerspectiveCamera(60, windowWidth / windowHeight, 0.2, 2000);
        this.camera.position.set(0, 60, 60);
        this.camera.lookAt(new THREE.Vector3());

        this.target = target;
        this.pot = null;
        this.running = false;
        this.orbitControls = new OrbitControls(this.camera, canvas);
        this.control = false;
        this.orbitControls.enabled = this.control;
    }

    toggleControl(){
        this.control = !this.control;
        this.orbitControls.enabled = this.control;
    }

    showAll(){
        // console.log("show all start");
        // new TWEEN.Tween(this.camera.position).to({x: 20, y: 400, z: 20}, 3)
        //     .start();
        // new TWEEN.Tween(this.pot).to({x: 0, y: 0, z: 0}, 3)
        //     .onUpdate(()=>{this.camera.lookAt(this.pot);console.log("show all run", this.pot);})
        //     .onComplete(()=>{console.log("show all over");})
        //     .start();
    }

    update(){
        if(!this.control){
            let p = this.target.position;
        
            if(p.z < -480){
                // this.camera.lookAt(new THREE.Vector3());
                // this.camera.lookAt(new THREE.Vector3());
                // new TWEEN.Tween(this.pot).to({x: 0, y: 4, z: 10}, 1)
                //     .easing(TWEEN.Easing.Quadratic.Out)
                //     .onUpdate(()=>{this.camera.lookAt(this.pot);})
                //     .onComplete(()=>{})
                //     .start();
            }
            else{
                if(this.running){
                    let z = p.z + 32;
                    this.camera.position.set(p.x, p.y + 10, z);
                    this.camera.lookAt(p);
                    this.pot = p;
                }
            }
        }
    }
}