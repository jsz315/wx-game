import * as THREE from '../libs/three/index.js'
import DataCenter from './DataCenter.js';
import Store from '../core/Store.js';
import PhysicsView from '../core/PhysicsView.js';

const TWEEN = require('../libs/Tween.js');
let OrbitControls = require('../../miniprogram_npm/three-orbit-controls/index.js')(THREE)
let { pixelRatio, windowHeight, windowWidth, state, worker, physicsList } = DataCenter;

export default class Enemy{

    constructor(scene){
        this.scene = scene;
        this.total = 200;
        this.list = [];
        this.store = new Store();
        this.init();
    }

    init(){
        for (let i = 0; i < this.total; i++) {
            let item = this.store.getBufferGeometry("cylinder");
            let mesh = new THREE.Mesh(item.geometry, this.store.getMaterial());
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.position.set(0, 4, i * 10);

            let physicsView = new PhysicsView(mesh, true, item);
            this.list.push(physicsView);
            // this.updaters.push(physicsView);
            // this.meshes.push(mesh);
            // this.itemViews.push(physicsView);
            this.scene.add(mesh);
        }
    }

    reset(){
        let row = 0;
        let t = 0;
        let distance = 7;
        for (let i = 0; i < this.total; i++) {
            if(i <= 0){
                row = 0;
                t = 0;
            }
            else if(i <= 2){
                row = 1;
                t = 1;
            }
            else if(i <= 5){
                row = 2;
                t = 3
            }
            else{
                row = 3;
                t = 6;
            }

            let x = (i - t) * distance - distance / 2 * row;
            let y = 4;
            let z = row * -distance;
            if(i > 10){
                x = (0.5 - Math.random()) * 30;
                z = -40 - Math.random() * 500;
            }
            this.list[i].setPositon(x, y, z);

            let nid = physicsList.findIndex(item => item == this.list[i]);
            worker.postMessage({
                type: 3,
                index: nid,
                position: [x, y, z]
            })
        }
    }
}