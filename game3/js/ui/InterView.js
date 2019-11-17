/// <reference path="../libs/three/index.js">
import * as THREE from '../libs/three/index.js'
import Text from './component/Text.js'
import Sprite from './component/Sprite.js'
import DataCenter from '../core/DataCenter.js';

let { uiWidth, uiHeight, pixelRatio, windowHeight, windowWidth, fitScale } = DataCenter;

export default class InterView {

	constructor() {
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

		var titleTxt = new Text("💃第1关", 750 / 2, 60);
		titleTxt.format("center", "#ffffff", 36);
		this.uiList.push(titleTxt);

		var nameTxt = new Text("昵称: jsz", 30, 80);
		nameTxt.format("left", "#ffffff", 36);
		this.uiList.push(nameTxt);

		var scoreTxt = new Text("score: 0", 30, 150);
		scoreTxt.format("left", "#ffffff", 36);
		this.uiList.push(scoreTxt);

		var helpTxt = new Text("帮助", 750 - 30, 150);
		helpTxt.format("right", "#ffffff", 36);
		this.uiList.push(helpTxt);

		// var leftTxt = new Sprite('images/left.png', 84, 84);
		// leftTxt.x = 100;
		// leftTxt.y = 640;
		// this.uiList.push(leftTxt);

		// var rightTxt = new Sprite('images/right.png', 84, 84);
		// rightTxt.x = 750 - 100 - 84;
		// rightTxt.y = 640;
		// this.uiList.push(rightTxt);

		var shadowBtn = new Sprite('images/shadow.png', 54, 54);
		shadowBtn.x = 30;
		shadowBtn.y = uiHeight / fitScale - 54 - 60;
		this.uiList.push(shadowBtn);

		nameTxt.onClick(() => {
			scoreTxt.word = "score: " + Math.floor(Math.random() * 100);
			var obj = {};
			obj['defaultValue'] = '';
			obj['maxLength'] = 100;
			obj['multiple'] = true;
			obj['confirmHold'] = true;
			obj['confirmType'] = 'done';
			// wx.showKeyboard(obj);
		})

		shadowBtn.onClick(() => {
			shadowBtn.fitSize();
			DataCenter.gameEvent.emit("shadow");
		})

		// leftTxt.onClick(() => {
		// 	console.log("toLeft");
		// 	DataCenter.gameEvent.emit("toLeft");
		// })

		// rightTxt.onClick(() => {
		// 	console.log("toRight");
		// 	DataCenter.gameEvent.emit("toRight");
		// })

	}

	draw() {
		this.ctx.clearRect(0, 0, uiWidth, uiHeight);
		this.uiList.forEach(item => {
			item.draw(this.ctx);
		})
		this.texture.needsUpdate = true;
	}
}