import * as THREE from '../libs/three/index.js'
import DataCenter from './DataCenter.js';
import Store from '../core/Store.js';
import PhysicsView from '../core/PhysicsView.js';

const TWEEN = require('../libs/Tween.js');
let OrbitControls = require('../../miniprogram_npm/three-orbit-controls/index.js')(THREE)
let { pixelRatio, windowHeight, windowWidth, state, worker } = DataCenter;

export default class Ground{

    constructor(scene){
        this.scene = scene;
        this.init();
    }

    init(){
        var mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
        mat.map = new THREE.TextureLoader().load("images/texture/m4.jpg");
        mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping;
        mat.map.repeat.set(10, 60);
        mat.emissive = new THREE.Color(0, 0, 0);

        let ground = new THREE.Mesh(new THREE.BoxGeometry(200, 8, 1200), mat);
        this.scene.add(ground);
        ground.castShadow = true;
        ground.receiveShadow = true;
        ground.position.set(0, -8, 0);
        this.ground = new PhysicsView(ground, false, {
            type: 'box',
            param: {
                width: ground.geometry.parameters.width,
                height: ground.geometry.parameters.height,
                depth: ground.geometry.parameters.depth
            }
        });

        let leftBar = new THREE.Mesh(new THREE.BoxGeometry(2, 24, 1200), mat);
        this.scene.add(leftBar);
        leftBar.castShadow = true;
        leftBar.receiveShadow = true;
        leftBar.position.set(-20, -8, 0);
        this.leftBar = new PhysicsView(leftBar, false, {
            type: 'box',
            param: {
                width: leftBar.geometry.parameters.width,
                height: leftBar.geometry.parameters.height,
                depth: leftBar.geometry.parameters.depth
            }
        });

        let rightBar = new THREE.Mesh(new THREE.BoxGeometry(2, 24, 1200), mat);
        this.scene.add(rightBar);
        rightBar.castShadow = true;
        rightBar.receiveShadow = true;
        rightBar.position.set(20, -8, 0);
        this.rightBar = new PhysicsView(rightBar, false, {
            type: 'box',
            param: {
                width: rightBar.geometry.parameters.width,
                height: rightBar.geometry.parameters.height,
                depth: rightBar.geometry.parameters.depth
            }
        });
    }
}