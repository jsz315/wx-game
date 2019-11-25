import * as THREE from './libs/three/index.js'
let OrbitControls = require('../miniprogram_npm/three-orbit-controls/index.js')(THREE)
const OIMO = require('./libs/oimo/index.js')
import PhysicsView from './core/PhysicsView.js';
import Store from './core/Store.js';
import InterView from './ui/InterView.js';
import DataCenter from './core/DataCenter.js';
import Player from './core/Player.js';
import FollowCamera from './core/FollowCamera.js';
import Tooler from './core/Tooler.js';
const TWEEN = require('./libs/Tween.js');
// require('./libs/trail-renderer.js')(THREE)

let { pixelRatio, windowHeight, windowWidth, state } = DataCenter;

/**
 * 游戏主函数
 */
export default class Main {

    constructor(canvas) {
        console.log(THREE);
        console.log(OIMO);
        console.log(canvas);
        console.log(TWEEN);

        this.canvas = canvas;

        this.camera = new THREE.PerspectiveCamera(60, windowWidth / windowHeight, 0.2, 2000);
        this.camera.position.set(160, 60, 60);
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
        this.orbitControls.enabled = false;

        this.gameState = 0;//0停止，1进行中

        this.initLight();
        this.initSkybox();
        this.initViews();
        this.initPlayer();

        window.requestAnimationFrame(
            this.loop.bind(this),
            canvas
        )

        // new TWEEN.Tween(this.camera.position).to({x:-40, y:120, z:180}, 3)
        //     .easing(TWEEN.Easing.Quadratic.Out)
        //     .onUpdate(()=>{this.camera.lookAt(new THREE.Vector3());})
        //     .onComplete(function(){})
        //     .start();
    }

    initLight() {
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

    initSkybox(){
        var path = "images/skybox/";
        var directions  = ["px", "nx", "py", "ny", "pz", "nz"];
        var format = ".jpg";
        var skyGeometry = new THREE.BoxGeometry(500, 500, 500);
        var materialArray = [];
        for (var i = 0; i < 6; i++){
            materialArray.push( new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(path + directions[i] + format),
                side: THREE.BackSide
            }));
        }
        var skyBox = new THREE.Mesh(skyGeometry, materialArray);
        this.scene.add(skyBox);
    }

    reset(){
        let row = 0;
        let t = 0;
        for (let i = 0; i < this.itemViews.length; i++) {
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

            let x = (i - t) * 6 - 6 / 2 * row;
            let y = 6;
            let z = row * -6;
            this.itemViews[i].setPositon(x, y, z);
        }

        this.player.setPositon(0, 4, 70);
        this.interView.showScore(0);
    }

    initViews() {
        this.world = new OIMO.World({
            info: false,
            timestep: 1 / 60,
            iterations: 8, 
            broadphase: 2, // 1: brute force, 2: sweep & prune, 3: volume tree
            worldscale: 16
        });

        this.updaters = [];
        this.store = new Store();

        var mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
        mat.map = new THREE.TextureLoader().load("images/texture/m1.jpg");
        mat.map.wrapS = mat.map.wrapT = THREE.RepeatWrapping;
        mat.map.repeat.set(10, 10);
        mat.emissive = new THREE.Color(0, 0, 0);

        let ground = new THREE.Mesh(new THREE.BoxGeometry(200, 8, 200), mat);
        this.scene.add(ground);
        ground.castShadow = true;
        ground.receiveShadow = true;
        ground.position.set(0, -8, 0);
        // ground.rotation.x = 10 * Math.PI / 180;
        this.ground = new PhysicsView(ground, false, this.world);

        this.meshes = [];
        this.itemViews = [];

        let mesh;
        // let types = ["box", "sphere", "cylinder"];
        let types = ["cylinder", "cylinder", "cylinder"];
        let row = 0;
        let t = 0;
        for (let i = 0; i < 10; i++) {
            let geo = this.store.getBufferGeometry(types[i % 3]);
            mesh = new THREE.Mesh(geo, this.store.getMaterial());
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            this.scene.add(mesh);
            let physicsView = new PhysicsView(mesh, true, this.world);
            this.updaters.push(physicsView);

            this.meshes.push(mesh);
            this.itemViews.push(physicsView);
        }

        this.interView = new InterView();

        this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
        // this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this), {passive: false}); 
        this.canvas.addEventListener('touchend', this.onTouchEnd.bind(this), {passive: false}); 

        DataCenter.gameEvent.on("shadow", () => {
            this.renderer.shadowMap.enabled = !this.renderer.shadowMap.enabled;
            mat.needsUpdate = true;
            // this.orbitControls.enabled = !this.orbitControls.enabled;
        })

        DataCenter.gameEvent.on("over", () => {
            this.gameState = 0;
            this.interView.showGameOver();
        })

        DataCenter.gameEvent.on("gameStart", () => {
            this.reset();
            this.gameState = 1;
        })

    }

    checkScore(){
        let sleeping = 0;
        this.itemViews.forEach(item => {
            if(item.body.sleeping){
                sleeping++;
            }
        })
        if(sleeping < this.itemViews.length){
            console.log("运动中");
            if(this.gameState == 1){
                return;
            }
        }
        console.log("静止");
        let rta = 180 / Math.PI;
        let total = 0;
        this.meshes.forEach(item => {
            var x = Math.floor(item.rotation.x * rta);
            var y = Math.floor(item.rotation.y * rta);
            var z = Math.floor(item.rotation.z * rta);
            if(Math.abs(x) < 4){

            }
            else{
                total++;
            }
        })
        this.interView.showScore(total);
    }

    initPlayer(){
        this.player = new Player(this.world);
        this.scene.add(this.player.mesh);
        this.updaters.push(this.player);

        // this.player.setPositon(0, 4, 40);

        // var trailHeadGeometry = [];
        // trailHeadGeometry.push( 
        //     new THREE.Vector3( -10.0, 0.0, 0.0 ), 
        //     new THREE.Vector3( 0.0, 0.0, 0.0 ), 
        //     new THREE.Vector3( 10.0, 0.0, 0.0 ) 
        // );

        // var trail = new THREE.TrailRenderer( this.scene, false );
        // var trailMaterial = THREE.TrailRenderer.createBaseMaterial();	
        // var trailLength = 150;
        // trail.initialize( trailMaterial, trailLength, false, 0, trailHeadGeometry, this.player.mesh );

        var followCamera = new FollowCamera(this.camera, this.player.mesh);
        this.updaters.push(followCamera); 
    }

    onTouchStart(e) {
        var hit = DataCenter.checkClick(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        // this.orbitControls.enabled = !hit;
        this.touchX = e.changedTouches[0].clientX;
        this.touchY = e.changedTouches[0].clientY;
    }

    onTouchEnd(e){
        var distX = e.changedTouches[0].clientX - this.touchX;
        var distY = e.changedTouches[0].clientY - this.touchY;
        var x = distX / windowWidth * 4;
        var y = distY / windowWidth * 8;
        if(state.onGround){
            DataCenter.gameEvent.emit("move", {x, y});
        }
    }

    update() {
        if(this.gameState){
            this.world.step();
            this.updaters.forEach(item => {
                item.update();
            })
            this.contact();
            this.checkScore();
        }
        
        TWEEN.update();
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
        this.renderer.clearDepth();
        this.interView.draw();
        this.renderer.render(this.interView.scene, this.interView.camera);
    }

    contact() {
        var cc = this.world.getContact(this.ground.body, this.player.body);
        if(cc){
            if(!cc.close){
                // console.log('collision start');
            }
            // console.log("collision...");
            state.onGround = true;
        }
        else{
            // console.log('collision end');
            state.onGround = false;
        }
            
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