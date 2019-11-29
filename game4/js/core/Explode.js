import * as THREE from '../libs/three/index.js'
import DataCenter from './DataCenter.js';
import Store from '../core/Store.js';
import PhysicsView from '../core/PhysicsView.js';

const TWEEN = require('../libs/Tween.js');
let OrbitControls = require('../../miniprogram_npm/three-orbit-controls/index.js')(THREE)
let { pixelRatio, windowHeight, windowWidth, state, worker, physicsList } = DataCenter;

export default class Explode{

    constructor(scene){
        this.scene = scene;
        this.total = 120;
        this.list = [];
        this.store = new Store();
        this.init();
    }

    init(){
        let material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        material.map = new THREE.TextureLoader().load("images/texture/m3.jpg");
        for (let i = 0; i < this.total; i++) {
            let item = this.store.getBufferGeometry("box");
            // let material = new THREE.MeshBasicMaterial({
            //     color: Math.floor(Math.random() * 0xffffff),
            //     opacity: 1
            // })
            let mesh = new THREE.Mesh(item.geometry, material);
            mesh.scale.multiplyScalar(Math.random() * 0.3 + 0.1);
            mesh.position.set(100, 10, i * 10);
            this.list.push(mesh);
            this.scene.add(mesh);
            mesh.visible = false;
        }
    }

    play(position){
        for (let i = 0; i < this.total; i++) {
            let x = position.x;
            let y = position.y;
            let z = position.z;
            let item = this.list[i];
            item.position.set(x, y, z);
            item.visible = true;
            new TWEEN.Tween(item.position).to({
                x: x + (0.5 - Math.random()) * 120,
                y: y + (1 - Math.random()) * 120,
                z: z + (0.5 - Math.random()) * 120
            }, 1)
            .onUpdate(()=>{})
            .onComplete(()=>{item.visible = false;})
            .start();
        }
    }

    reset(){
        for (let i = 0; i < this.total; i++) {
            let x = 0;
            let y = 0;
            let z = 0;
            this.list[i].setPositon(x, y, z);
        }
    }
}