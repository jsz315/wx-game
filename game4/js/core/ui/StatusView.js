import * as THREE from '../../libs/three/index.js'
// const OIMO = require('../libs/oimo/index.js')
import DataCenter from "../DataCenter";
import Text from '../../ui/component/Text.js';
import Tooler from '../../ui/tooler.js';

let {
    pixelRatio,
    windowHeight,
    windowWidth,
    state,
    worker,
    uiWidth,
    uiHeight
} = DataCenter;

let updateFrame = 0;

export default class StatusView {

    constructor(renderer, canvas) {
        this.canvas = canvas;
        this.renderer = renderer;
        this.cameraOrtho = new THREE.OrthographicCamera(-uiWidth / 2, uiWidth / 2, uiHeight / 2, -uiHeight / 2, 0, 100);
        this.cameraOrtho.position.z = 100;
        this.sceneOrtho = new THREE.Scene();

        this.raycaster = new THREE.Raycaster();
        this.mouseVector = new THREE.Vector3();
        this.stats = new Tooler.Stats();

        this.addUI();

        window.addEventListener("resize", e => this.onResize(e), false);
        // window.addEventListener( "mousedown", e => this.onDocumentMouseDown(e), false );
    }

    update() {
        if(++updateFrame > 30){
            updateFrame = 0;
            this.texture.needsUpdate = true;
        }
        // this.ctx.fillStyle="#ff9900";
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.stats.update();
        this.t1.word = "FPS:" + this.stats.data;
        this.t1.draw(this.ctx);
        this.renderer.render(this.sceneOrtho, this.cameraOrtho);
    }

    getFixSize(n){
        let size = 64;
        if(n < 128){
            size = 128;
        }
        else if(n < 256){
            size = 256;
        }
        else if(n < 512){
            size = 512;
        }
        console.log(`old = ${n} -- new = ${size}`);
        return size;
    }

    addUI() {
        var width = this.getFixSize(uiWidth / 4);
        var height = width;
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d");
        var t1 = new Text("💃第1关", 20, 54);
        t1.format("left", "#ffffff", 36);
        this.t1 = t1;

        // var width = uiWidth / 2.1;
        // var height = 80;
        // this.canvas.width = width;
        // this.canvas.height = height;
        // let ctx = this.canvas.getContext("2d");
        // ctx.strokeStyle = "red";
        // ctx.rect(0, 0, width - 2, height - 2);
        // ctx.stroke();
        // ctx.fillStyle = "#0000ff";
        // ctx.fillRect(20, 20, this.canvas.width - 40, this.canvas.height - 40);
        // ctx.fillStyle = "#ffffff";
        // ctx.font = "32px Arial";
        // ctx.fillText("hello", 40, 40);

        this.texture = new THREE.CanvasTexture(this.canvas);

        var material = new THREE.SpriteMaterial({
            color: 0xffffff,
            map: this.texture
        });

        this.spriteTL = new THREE.Sprite(material);
        this.spriteTL.center.set(0.0, 1.0);
        this.spriteTL.scale.set(width, height, 1);
        this.sceneOrtho.add(this.spriteTL);

        this.spriteTR = new THREE.Sprite(material);
        this.spriteTR.center.set(1.0, 1.0);
        this.spriteTR.scale.set(width, height, 1);
        // this.sceneOrtho.add(this.spriteTR);

        this.spriteBL = new THREE.Sprite(material);
        this.spriteBL.center.set(0.0, 0.0);
        this.spriteBL.scale.set(width, height, 1);
        // this.sceneOrtho.add(this.spriteBL);

        this.spriteBR = new THREE.Sprite(material);
        this.spriteBR.center.set(1.0, 0.0);
        this.spriteBR.scale.set(width, height, 1);
        // this.sceneOrtho.add(this.spriteBR);

        this.spriteC = new THREE.Sprite(material);
        this.spriteC.center.set(0.5, 0.5);
        this.spriteC.scale.set(width, height, 1);
        // this.sceneOrtho.add(this.spriteC);

        this.updateHUDSprites();
    }

    onDocumentMouseDown(event) {
        event.preventDefault();
        if (this.selectedObject) {
            this.selectedObject.material.color.set('#ff9900');
            this.selectedObject = null;
        }

        var intersects = this.getIntersects(event.layerX, event.layerY);
        if (intersects.length > 0) {

            var res = intersects.filter(function (res) {

                return res && res.object;

            })[0];

            if (res && res.object) {

                this.selectedObject = res.object;
                this.selectedObject.material.color.set('#f00');

            }

        }

    }

    getIntersects(x, y) {

        x = (x / uiWidth) * 2 - 1;
        y = -(y / uiHeight) * 2 + 1;

        this.mouseVector.set(x, y, 0.5);
        this.raycaster.setFromCamera(this.mouseVector, this.cameraOrtho);

        return this.raycaster.intersectObject(this.sceneOrtho, true);

    }


    onResize(e) {
        var width = uiWidth;
        var height = uiHeight;

        this.cameraOrtho.left = -width / 2;
        this.cameraOrtho.right = width / 2;
        this.cameraOrtho.top = height / 2;
        this.cameraOrtho.bottom = -height / 2;
        this.cameraOrtho.updateProjectionMatrix();

        this.updateHUDSprites();
        this.renderer.setSize(uiWidth, uiHeight);
    }

    updateHUDSprites() {
        var width = uiWidth / 2;
        var height = uiHeight / 2;

        this.spriteTL.position.set(-width, height, 1); // top left
        this.spriteTR.position.set(width, height, 1); // top right
        this.spriteBL.position.set(-width, -height, 1); // bottom left
        this.spriteBR.position.set(width, -height, 1); // bottom right
        this.spriteC.position.set(0, 0, 1); // center
    }
}