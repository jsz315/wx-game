
import * as THREE from '../libs/three/index.js'
const OIMO = require('../libs/oimo/index.js')
import DataCenter from '../core/DataCenter.js';

export default class Player{

    constructor(world){
        this.world = world;
        let size = 4;
        let color = new THREE.Color(0xffffff);
        let mat = new THREE.MeshStandardMaterial({ color });
        mat.map = new THREE.TextureLoader().load("images/texture/m2.jpg");
        mat.emissive = new THREE.Color(0, 0.7, 0.4);
        mat.metalness = 0.3;
        mat.roughness = 0.3;

        let param = {
            pos: [0, 0, 0],
            rot: [0, 0, 0],
            move: true,
            density: 1,
            friction: 0.1,
            restitution: 0.1,
            belongsTo: 1,
            collidesWith: 0xffffffff
        }

        if(true){
            param.type = "sphere";
            param.size = [size];
            this.mesh = new THREE.Mesh(new THREE.SphereGeometry(size), mat);
        }
        else{
            param.type = "box";
            param.size = [size, size, size];
            this.mesh = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), mat);
        }
        
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        this.body = world.add(param);

        DataCenter.gameEvent.on("toLeft", ()=>{this.moveLeft()});
        DataCenter.gameEvent.on("toRight", ()=>{this.moveRight()});
        DataCenter.gameEvent.on("move", (n)=>{this.move(n)});
    }

    update() {
        this.mesh.position.copy(this.body.getPosition());
        this.mesh.quaternion.copy(this.body.getQuaternion());
        this.destory();
    }

    move(n){
        // console.log("move", n);
        this.body.linearVelocity.set(n.x, 0, n.y);
    }

    moveLeft(){
        // console.log("moveLeft");
        // this.body.applyImpulse(new OIMO.Vec3(-1, 0, 0), new OIMO.Vec3(-0.04, 0, 0));
        // this.body.linearVelocity = new OIMO.Vec3(-0.02, 0, 0);
        this.body.linearVelocity.set(-1, 0, 0);
    }

    moveRight(){
        // console.log("moveRight");
        // this.body.applyImpulse(new OIMO.Vec3(1, 0, 0), new OIMO.Vec3(0.04, 0, 0));
        // this.body.linearVelocity = new OIMO.Vec3(0.02, 0, 0);
        this.body.linearVelocity.set(1, 0, 0);
    }

    destory() {
        if (this.mesh.position.y < -60) {
            let x = (0.5 - Math.random()) * 40;
            let y = 20;
            let z = (0.5 - Math.random()) * 40;
            this.body.resetPosition(x, y, z);
        }
    }
}