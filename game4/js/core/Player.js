
import * as THREE from '../libs/three/index.js'
// const OIMO = require('../libs/oimo/index.js')
import DataCenter from "./DataCenter";

let { pixelRatio, windowHeight, windowWidth, state, worker, physicsList, mapSize, explodeMaterials } = DataCenter;
const TORAN = 180 / Math.PI;

export default class Player{

    constructor(scene){
        this.scene = scene;
        let size = 3;
        let color = new THREE.Color(0xffffff);
        
        let mat = new THREE.MeshStandardMaterial({ color });
        mat.map = new THREE.TextureLoader().load("images/texture/m3.jpg");
        mat.emissive = new THREE.Color(1, 1, 1);
        mat.emissiveIntensity = 0;
        mat.metalness = 0.1;
        mat.roughness = 0.4;
        explodeMaterials.push(mat);
        
        // let param = {
        //     pos: [0, 0, 0],
        //     rot: [0, 0, 0],
        //     move: true,
        //     density: 20,
        //     friction: 0.72,
        //     restitution: 0.1,
        //     belongsTo: 1,
        //     collidesWith: 0xffffffff
        // }

        // if(true){
        //     param.type = "sphere";
        //     param.size = [size];
        //     this.mesh = new THREE.Mesh(new THREE.SphereGeometry(size, 32, 32), mat);
        // }
        // else{
        //     param.type = "box";
        //     param.size = [size, size, size];
        //     this.mesh = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), mat);
        // }
        // this.body = world.add(param);
        
        this.mesh = new THREE.Mesh(new THREE.SphereGeometry(size, 32, 32), mat);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        this.scene.add(this.mesh);

        worker.postMessage({
            type: 5,
            size: size
        })

        // physicsList.push(this);

        DataCenter.gameEvent.on("toLeft", ()=>{this.moveLeft()});
        DataCenter.gameEvent.on("toRight", ()=>{this.moveRight()});
        DataCenter.gameEvent.on("move", (n)=>{this.move(n)});
    }

    step(item){
        this.mesh.position.copy(item.position);
        this.mesh.quaternion.copy(item.quaternion);
    }

    update() {
        // this.mesh.position.copy(this.body.getPosition());
        // this.mesh.quaternion.copy(this.body.getQuaternion());
        // this.destory();
    }

    setPositon(x, y, z){
        // this.body.resetPosition(x, y, z);
        // this.body.resetRotation(0, 0, 0);
        // this.update();
    }

    move(n){
        // console.log("move", n);
        // this.body.linearVelocity.set(n.x, 0, n.y);
        worker.postMessage({
            type: 7,
            velocity: [n.x, 0, n.y]
        })
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
        if (this.mesh.position.y < -240) {
            // let x = (0.5 - Math.random()) * 40;
            // let y = 20;
            // let z = (0.5 - Math.random()) * 40;
            // this.body.resetPosition(x, y, z);
            // console.log("send game over");
            // DataCenter.gameEvent.emit("gameOver");
        }
    }
}