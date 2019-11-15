/// <reference path="../libs/three/index.js">
import * as THREE from '../libs/three/index.js'
import Text from './component/Text.js'
import Sprite from './component/Sprite.js'
import DataCenter from '../core/DataCenter.js';

let { pixelRatio, windowWidth, windowHeight } = DataCenter;
let uiWidth = windowWidth * pixelRatio;
let uiHeight = windowHeight * pixelRatio;

export default class InterView{

    constructor(){
        this.uiList = []; 
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(uiWidth / -2, uiWidth / 2, uiHeight / 2, uiHeight / -2, 0, 10000);
        this.camera.updateProjectionMatrix();
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.open = wx.getOpenDataContext();
        this.sharedCanvas = this.open.canvas;
        this.sharedCanvas.width = uiWidth;
        this.sharedCanvas.height = uiHeight;
        this.ctx = this.sharedCanvas.getContext("2d");
       
        this.texture = new THREE.CanvasTexture(this.sharedCanvas);
        this.texture.minFilter = this.texture.magFilter = THREE.LinearFilter;
        this.texture.needsUpdate = true;

        let geometry = new THREE.PlaneGeometry(uiWidth, uiHeight);
        let material = new THREE.MeshBasicMaterial({ map: this.texture, transparent: true });

        this.view = new THREE.Mesh(geometry, material);
        this.scene.add(this.view);

        var titleTxt = new Text("💏文字💃", uiWidth / 2 , 40);
        titleTxt.format("center", "#ffffff", 28);
        this.uiList.push(titleTxt);

        var nameTxt = new Text("昵称: jsz", 30 , 50);
        nameTxt.format("left", "#ffffff", 28);
        this.uiList.push(nameTxt);

        var scoreTxt = new Text("score: 100", 30 , 100);
        scoreTxt.format("left", "#ffffff", 28);
        this.uiList.push(scoreTxt);

        var helpTxt = new Text("帮助", uiWidth - 30 , 90);
        helpTxt.format("right", "#ffffff", 28);
        this.uiList.push(helpTxt);

        var shadowBtn = new Sprite('images/bb.png');
        shadowBtn.x = 120;
        shadowBtn.y = 120;
        this.uiList.push(shadowBtn);

        nameTxt.onClick(()=>{
            scoreTxt.word = "score: " + Math.floor(Math.random() * 100);
        })

        shadowBtn.onClick(()=>{
            shadowBtn.x += 30;
            shadowBtn.y += 30;
            DataCenter.gameEvent.emit("shadow");
        })

    }

    draw(){
        this.ctx.clearRect(0, 0, uiWidth, uiHeight);
        this.uiList.forEach(item => {
            item.draw(this.ctx);
        })
        this.texture.needsUpdate = true;
    }
}