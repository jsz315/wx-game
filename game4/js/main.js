import * as THREE from './libs/three/index.js'
let OrbitControls = require('../miniprogram_npm/three-orbit-controls/index.js')(THREE)
// const OIMO = require('./libs/oimo/index.js')
import PhysicsView from './core/PhysicsView.js';
import Store from './core/Store.js';
import InterView from './ui/InterView.js';
import DataCenter from './core/DataCenter.js';
import Player from './core/Player.js';
import FollowCamera from './core/FollowCamera.js';
import StartView from './core/ui/StartView.js';
import Lights from './core/Lights.js';
import Skybox from './core/Skybox.js';
import Enemy from './core/Enemy.js';
import Ground from './core/Ground.js';
import Explode from './core/Explode.js';
import Role from './core/Role.js';
// import StatusView from './core/ui/StatusView.js';
import Music from './core/Music.js';
import UserView from './ui/UserView.js';
const TWEEN = require('./libs/Tween.js');
// require('./libs/trail-renderer.js')(THREE)

let { pixelRatio, windowHeight, windowWidth, state, worker, physicsList, mapSize } = DataCenter;
// let worker = wx.createWorker('workers/request/index.js') 

/**
 * 游戏主函数
 */
export default class Main {

    constructor(canvas) {
        this.canvas = canvas;
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
        this.renderer.shadowMap.enabled = false;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;

        this.gameState = 0;

        this.initWorker();
        this.enemy = new Enemy(this.scene);
        this.player = new Player(this.scene);
        this.ground = new Ground(this.scene);
        this.explode = new Explode(this.scene);
        this.interView = new InterView();

        // this.userView = new UserView(canvas);
        this.lights = new Lights(this.scene);
        this.skybox = new Skybox(this.scene);
        this.followCamera = new FollowCamera(this.canvas, this.player.mesh);
        // this.statusView = new StatusView(this.renderer, wx.getOpenDataContext().canvas);

        this.music = new Music();
        this.role = new Role(this.scene);
        this.role.loadObj("http://192.168.31.109:3000/obj/fbx/Running.fbx");

        this.initEvent();
        this.loop();
    }

    initUI(){
        this.startView = new StartView();
        // this.startView.view.position.set(0, 0, -10);
        // this.startView.view.lookAt(new THREE.Vector3());
        this.scene.add(this.startView.view);
        // this.camera.add(this.startView.view);
        // this.startView.setMaterial(this.interView.material);
    }

    initEvent(){
        this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
        this.canvas.addEventListener('touchend', this.onTouchEnd.bind(this), {passive: false}); 

        DataCenter.gameEvent.on("camera", () => {
            this.followCamera.toggleControl();
        })

        DataCenter.gameEvent.on("explode", () => {
            // this.followCamera.toggleControl();
            this.startExplode();
        })

        DataCenter.gameEvent.on("gameOver", () => {
            console.log("on game over");
            if(this.gameState){
                this.gameState = 0;
                let score = this.checkScore();
                this.interView.showGameOver(score);

                // this.userView.showGameOver(score);
                worker.postMessage({
                    type: 2
                })
            }
        })

        DataCenter.gameEvent.on("gameStart", () => {
            this.reset();
            this.gameState = 1;
            worker.postMessage({
                type: 1
            })
        })
    }

    initWorker(){
        worker.onMessage((res) => {
            switch(res.type){
                case 0:
                    this.updateWorld(res.list, res.player);
                    break;
                default:
                    break;
            }
        })
        worker.postMessage({
            type: 0
        })
    }

    updateWorld(list, player){
        list.forEach((item, index) => {
            physicsList[index].step(item);
        })
        this.player.step(player);
    }

    reset(){
        this.enemy.reset();
        worker.postMessage({
            type: 6,
            position: [0, 4, mapSize / 2 - 40]
        })
        this.interView.showScore(0);
        // this.userView.showScore(0);
        this.followCamera.running = true;
    }
    
    checkScore(){
        let rta = 180 / Math.PI;
        let total = 0;
        this.enemy.list.forEach(item => {
            var x = Math.floor(item.mesh.rotation.x * rta);
            if(Math.abs(x) > 60){
                total++;
            }
        })
        return total;
    }

    onTouchStart(e) {
        this.touchX = e.changedTouches[0].clientX;
        this.touchY = e.changedTouches[0].clientY;
    }

    onTouchEnd(e){
        let isClick = DataCenter.checkClick(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        if(isClick){
            console.log("click event");
            return;
        }
        if(this.followCamera.control){
            console.log("camera control");
            return;
        }
        var distX = e.changedTouches[0].clientX - this.touchX;
        var distY = e.changedTouches[0].clientY - this.touchY;
        var x = distX / windowWidth * 10;
        var y = distY / windowWidth * 20;
        if(this.gameState == 1){
            this.music.playBgm();
            DataCenter.gameEvent.emit("move", {x, y});
            // this.timerId && clearTimeout(this.timerId);
            // this.timerId = setTimeout(()=>{
            //     this.startExplode();
            // }, 8400);
        }
    }

    startExplode(){
        this.followCamera.playExplosion();
        wx.vibrateShort({});
        worker.postMessage({
            type: 8,
            position: this.player.mesh.position,
            size: 40
        })
        this.music.playExplosion();
        this.explode.play(this.player.mesh.position);

        this.timerId && clearTimeout(this.timerId);
        this.timerId = setTimeout(()=>{
            DataCenter.gameEvent.emit("gameOver");
            this.music.stopBgm();
        }, 4000);
    }

    update() {
        TWEEN.update();
        this.renderer.clear();
        // if(this.gameState == 0){
        //     this.interView.draw();
        //     this.renderer.clearDepth();
        //     this.renderer.render(this.interView.scene, this.interView.camera);
        // }
        // else{
        //     this.followCamera.update();
        //     this.renderer.render(this.scene, this.followCamera.camera);
        //     this.statusView.update();
        // }
        this.followCamera.update();
        this.renderer.render(this.scene, this.followCamera.camera);
        this.renderer.clearDepth();
        this.interView.draw();
        this.renderer.render(this.interView.scene, this.interView.camera);
        // this.statusView.update();
    }

    loop() {
        this.update();
        window.requestAnimationFrame(
            this.loop.bind(this),
            canvas
        )
    }
}