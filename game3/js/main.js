import * as THREE from './libs/three/index.js'
let OrbitControls = require('../miniprogram_npm/three-orbit-controls/index.js')(THREE)
const OIMO = require('./libs/oimo/index.js')
import PhysicsView from './core/PhysicsView.js';
import Store from './core/Store.js';

/**
 * 游戏主函数
 */
export default class Main {

  constructor(canvas) {
    console.log(THREE);
    console.log(OIMO);
    console.log(canvas);

    this.canvas = canvas;

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 2000);
    this.camera.position.set(-25, 25, 78);
    this.camera.lookAt(new THREE.Vector3());

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setClearColor(0x000000);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;

    new OrbitControls(this.camera, this.canvas);

    this.initViews();

    window.requestAnimationFrame(
      this.loop.bind(this),
      canvas
    )
  }
  
  initViews(){
    this.world = new OIMO.World({
      info:false, 
      worldscale: 10,
      timestep: 1 / 60, 
      iterations: 7, 
      broadphase: 2
    });

    this.updaters = [];
    this.store = new Store();

    var ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, -10);
    this.scene.add(directionalLight);

    var mat = new THREE.MeshStandardMaterial({color: 0x00ff00});
    mat.map = new THREE.TextureLoader().load("images/texture/m1.jpg");
    mat.emissive = new THREE.Color(0, 0, 0);

    let ground = new THREE.Mesh(new THREE.BoxGeometry(80, 4, 80), mat);
    this.scene.add(ground);
    ground.castShadow = true;
    ground.receiveShadow = true;
    ground.position.set(0, -8, 0);
    ground.rotation.x = 10 * Math.PI / 180;
    new PhysicsView(ground, false, this.world);

    let mesh;
    let t;
    let types = ["box", "sphere", "cylinder"];
    for(let i = 0; i < 90; i++){
      let geo = this.store.getBufferGeometry(types[i % 3]);
      mesh = new THREE.Mesh(geo, this.store.getMaterial());
      
      let x = (0.5 - Math.random()) * 40;
      let y = Math.random() * 100;
      let z = (0.5 - Math.random()) * 40;
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
      let physicsView = new PhysicsView(mesh, true, this.world);
      this.updaters.push(physicsView);
    }
  }

  update() {
    this.world.step();
    this.updaters.forEach(item=>{
      item.update();
    })
    this.renderer.render(this.scene, this.camera);
  }

  // 实现游戏帧循环
  loop() {
    this.update();
    window.requestAnimationFrame(
      this.loop.bind(this),
      canvas
    )
  }
}