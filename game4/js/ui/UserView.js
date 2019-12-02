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

export default class UserView {
    constructor(canvas){

        this.canvas = canvas;
        this.canvas.width = uiWidth;
        this.canvas.height = uiHeight;
        this.ctx = this.canvas.getContext("2d");

        this.uiGroup = new Group(0, 0);

        var titleTxt = new Text("💃第1关", 750 / 2, 54);
		titleTxt.format("center", "#ffffff", 36);
		this.uiGroup.add(titleTxt);

		this.fpsTxt = new Text("球球", 30, 72);
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
		// this.stats.update();
		// this.fpsTxt.word = "FPS: " + this.stats.data;
		this.ctx.clearRect(0, 0, uiWidth, uiHeight);
		// this.uiGroup.forEach(item => {
		// 	item.draw(this.ctx);
		// })
		this.uiGroup.draw(this.ctx);
		// this.texture.needsUpdate = true;
	}


}