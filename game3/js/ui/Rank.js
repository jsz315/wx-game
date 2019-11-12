import * as THREE from '../libs/three/index.js'

export default class Rank{

    constructor(){
        this.scene = new THREE.Scene()
        this.camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0, 10000);
        this.open = wx.getOpenDataContext();
        this.sharedCanvas = this.open.canvas;
        const {pixelRatio, windowHeight, windowWidth} = wx.getSystemInfoSync();
        
        this.sharedCanvas.width = windowWidth * pixelRatio;
        this.sharedCanvas.height = windowHeight * pixelRatio;
       
        this.rankingTexture = new THREE.CanvasTexture(this.sharedCanvas);
        this.rankingTexture.minFilter = this.rankingTexture.magFilter = THREE.LinearFilter;
        this.rankingTexture.needsUpdate = true;

        let geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
        let material = new THREE.MeshBasicMaterial({ map: this.rankingTexture, transparent: true });

        this.view = new THREE.Mesh(geometry, material);
    }

    draw(msg){
        var ctx = this.sharedCanvas.getContext("2d");
        ctx.fillStyle = "#ff9900";
        ctx.fillRect(20, 20, 150, 100);
        ctx.fillStyle = "#004455";
        ctx.rect(200, 300, 800, 400);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font="40px Georgia";
        ctx.fillText(msg, 100, 200);
        this.rankingTexture.needsUpdate = true;
    }
}