/// <reference path="../libs/three/index.js">
import * as THREE from '../libs/three/index.js'
import Text from './component/Text.js'
import Sprite from './component/Sprite.js'
import DataCenter from '../core/DataCenter.js';
import Group from './component/Group.js';
import Start from './panel/start.js';
import Result from './panel/result.js';
import Tooler from './tooler';
const TWEEN = require('../libs/Tween.js');

let { uiWidth, uiHeight, pixelRatio, windowHeight, windowWidth, fitScale } = DataCenter;

export default class InterView {

	constructor() {
		this.stats = new Tooler.Stats();
		this.score = 0;
		this.uiGroup = new Group(0, 0);

		this.scene = new THREE.Scene();
		this.camera = new THREE.OrthographicCamera(uiWidth / -2, uiWidth / 2, uiHeight / 2, uiHeight / -2, 0, 10000);
		this.camera.updateProjectionMatrix();
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));

		const size = 1 / 1;

		this.open = wx.getOpenDataContext();
		this.sharedCanvas = this.open.canvas;
		this.sharedCanvas.width = uiWidth;
		this.sharedCanvas.height = uiHeight * size;
		this.ctx = this.sharedCanvas.getContext("2d");

		this.texture = new THREE.CanvasTexture(this.sharedCanvas);
		this.texture.minFilter = this.texture.magFilter = THREE.LinearFilter;
		this.texture.needsUpdate = true;

		let geometry = new THREE.PlaneGeometry(uiWidth, uiHeight * size);
		let material = new THREE.MeshBasicMaterial({ map: this.texture, transparent: true });
		this.material = material;

		this.view = new THREE.Mesh(geometry, material);
		this.view.position.set(0, (1 - size) / 2 * uiHeight, 0);
		this.scene.add(this.view);

		var titleTxt = new Text("💃第1关", 750 / 2, 54);
		titleTxt.format("center", "#ffffff", 36);
		this.uiGroup.add(titleTxt);

		this.fpsTxt = new Text("", 30, 72);
		this.fpsTxt.format("left", "#ffffff", 36);
		this.uiGroup.add(this.fpsTxt);

		var scoreTxt = new Text("score: 0", 30, 142);
		scoreTxt.format("left", "#ffffff", 36);
		this.uiGroup.add(scoreTxt);

		this.scoreTxt = scoreTxt;

		var helpTxt = new Text("帮助", 750 - 30, 142);
		helpTxt.format("right", "#ffffff", 36);
		this.uiGroup.add(helpTxt);

		var cameraBtn = new Sprite('images/camera.png', 54, 54);
		cameraBtn.x = 30;
		cameraBtn.y = uiHeight / fitScale - 54 - 60;
		cameraBtn.name = "ui cameraBtn";
		this.uiGroup.add(cameraBtn);

		cameraBtn.onClick(() => {
			DataCenter.gameEvent.emit("camera");
		})

		this.startPanel = new Start();
		this.uiGroup.add(this.startPanel.group);

		this.resultPanel = new Result();
		this.resultPanel.group.visible = false;
		this.uiGroup.add(this.resultPanel.group);

		// this.startPanel.group.alpha = 0;
		// new TWEEN.Tween(this.startPanel.group).to({alpha: 1}, 1)
        //     .easing(TWEEN.Easing.Quadratic.Out)
        //     .onUpdate(()=>{})
        //     .onComplete(()=>{})
		// 	.start();
	}

	showScore(n){
		this.score = n;
		this.scoreTxt.word = "score: " + this.score;
	}

	showGameOver(n){
		this.showScore(n);
		this.resultPanel.show(n);
	}

	draw() {
		this.stats.update();
		this.fpsTxt.word = "FPS: " + this.stats.data;
		this.ctx.clearRect(0, 0, uiWidth, uiHeight);
		// this.uiGroup.forEach(item => {
		// 	item.draw(this.ctx);
		// })
		this.uiGroup.draw(this.ctx);
		this.texture.needsUpdate = true;
	}
}