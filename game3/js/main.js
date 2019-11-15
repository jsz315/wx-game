import * as THREE from './libs/three/index.js'
let OrbitControls = require('../miniprogram_npm/three-orbit-controls/index.js')(THREE)
const OIMO = require('./libs/oimo/index.js')
import PhysicsView from './core/PhysicsView.js';
import Store from './core/Store.js';
import InterView from './ui/InterView.js';
import DataCenter from './core/DataCenter.js';

let { pixelRatio, windowHeight, windowWidth } = DataCenter;

/**
 * 游戏主函数
 */
export default class Main {

  constructor(canvas) {
    console.log(THREE);
    console.log(OIMO);
    console.log(canvas);

    this.canvas = canvas;

    this.camera = new THREE.PerspectiveCamera(60, windowWidth / windowHeight, 0.2, 2000);
    this.camera.position.set(-25, 25, 78);
    this.camera.lookAt(new THREE.Vector3());

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.autoClear = false;

    this.renderer.setClearColor(0x000000);
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(windowWidth, windowHeight);
    this.renderer.shadowMap.enabled = true;

    this.orbitControls = new OrbitControls(this.camera, this.canvas);

    this.initLight();
    this.initViews();

    window.requestAnimationFrame(
      this.loop.bind(this),
      canvas
    )
  }

  initLight(){
    this.scene.add(new THREE.AmbientLight(0x3D4143));
    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(300, 1000, 500);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    var n = 300;
    light.shadow.camera = new THREE.OrthographicCamera(-n, n, n, -n, 500, 1600);
    light.shadow.bias = 0.0001;
    light.shadow.mapSize.width = light.shadow.mapSize.height = 1024;
    this.scene.add(light);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
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

    var mat = new THREE.MeshStandardMaterial({color: 0x00ff00});
    mat.map = new THREE.TextureLoader().load("images/texture/m1.jpg");
    mat.emissive = new THREE.Color(0, 0, 0);

    let ground = new THREE.Mesh(new THREE.BoxGeometry(100, 4, 100), mat);
    this.scene.add(ground);
    ground.castShadow = true;
    ground.receiveShadow = true;
    ground.position.set(0, -8, 0);
    ground.rotation.x = 10 * Math.PI / 180;
    new PhysicsView(ground, false, this.world);

    let mesh;
    let types = ["box", "sphere", "cylinder"];
    for(let i = 0; i < 40; i++){
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

    this.interView = new InterView();

    this.canvas.addEventListener('touchstart', this.uiCheck.bind(this), {passive: false}); 
    // this.canvas.addEventListener('touchmove', this.uiCheck.bind(this), {passive: false}); 
    // this.canvas.addEventListener('touchend', this.uiCheck.bind(this), {passive: false}); 

    DataCenter.gameEvent.on("shadow", () => {
      console.log("shadow");
      this.renderer.shadowMap.enabled = !this.renderer.shadowMap.enabled;
      // mat.map.needsUpdate = true;
      mat.needsUpdate = true;
    })

    console.log("this");
    console.log(this);
  }

  uiCheck(e){
    var hit = DataCenter.checkClick(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    // var hit = this.interView.checkClick(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    if(hit){
      this.orbitControls.enabled = false;
    }
    else{
      this.orbitControls.enabled = true;
    }
  }

  update() {
    this.world.step();
    this.updaters.forEach(item=>{
      item.update();
    })
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
    this.renderer.clearDepth();
    this.interView.draw();
    this.renderer.render(this.interView.scene, this.interView.camera);
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