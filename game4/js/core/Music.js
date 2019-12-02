const TWEEN = require('../libs/Tween.js');
let instance

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.bgmAudio = new Audio()
    this.bgmAudio.loop = false
    this.bgmAudio.src  = 'audio/bg.mp3'

    this.shootAudio     = new Audio()
    this.shootAudio.src = 'audio/bullet.mp3'

    this.boomAudio     = new Audio()
    this.boomAudio.src = 'audio/boom.mp3'

    console.log("this.bgmAudio");
    console.log(this.bgmAudio);
  }

  playBgm() {
    this.bgmAudio.currentTime = 2
    this.bgmAudio.play()
  }

  stopBgm(){
    this.bgmAudio.pause();
    // new TWEEN.Tween(this.bgmAudio).to({currentTime}, 1)
    // .onComplete(()=>{this.bgmAudio.pause();})
    // .start();
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
