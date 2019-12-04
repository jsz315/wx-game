const TWEEN = require('../libs/Tween.js');
import DataCenter from "./DataCenter";
let instance

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.explode = false;

    this.bgmAudio = wx.createInnerAudioContext()
    this.bgmAudio.loop = false
    this.bgmAudio.src  = 'audio/bg.mp3'
    this.bgmAudio.volume = 1;
    

    console.log(" this.bgmAudio ",  this.bgmAudio);
    this.bgmAudio.onPlay(()=>{
      console.log("duration: " + this.bgmAudio.duration);
    })
    this.bgmAudio.onCanplay(()=>{
      console.log("currentTime: " + this.bgmAudio.currentTime);
    })

    let ms = this.bgmAudio;
    ms.onTimeUpdate(()=>{
      console.log(ms.currentTime);
      if(ms.currentTime >= 10.2 && !this.explode){
        this.explode = true;
        // ms.offTimeUpdate(cf);
        console.log("over sound update");
        DataCenter.gameEvent.emit("explode");
      }
    });

    this.shootAudio     = wx.createInnerAudioContext()
    this.shootAudio.src = 'audio/bullet.mp3'

    this.boomAudio     = new Audio()
    this.boomAudio.src = 'audio/boom.mp3'

    console.log("this.bgmAudio");
    console.log(this.bgmAudio);
  }

  playBgm() {
    let ms = this.bgmAudio;
    ms.volume = 0;
    new TWEEN.Tween(ms).to({volume: 1}, 1)
      .onComplete(()=>{})
      .start();
    this.explode = false;
    ms.seek(2);
    ms.play();
  }

  // updateTime(){
  //   console.log(this.bgmAudio.currentTime);
  //   if(this.bgmAudio.currentTime >=8 ){
  //     this.bgmAudio.offTimeUpdate(this.updateTime);
  //     console.log("over sound update");
  //   }
  // }

  stopBgm(){
    new TWEEN.Tween(this.bgmAudio).to({volume: 0}, 1)
    .onComplete(()=>{this.bgmAudio.stop();})
    .start();
  }

  playShoot() {
    this.shootAudio.currentTime = 0
    this.shootAudio.play()
  }

  playExplosion() {
    this.boomAudio.currentTime = 0
    this.boomAudio.play()
  }
}
