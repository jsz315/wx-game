import DataCenter from '../../core/DataCenter.js';
export default class Sprite {

  constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0) {
    // this.img = wx.createImage();
    this.img = new Image();
    this.img.onload = () => {
      this.loaded = true;
      console.log(this.img);
    }
    this.img.src = imgSrc;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.visible = true;
    this.loaded = false;
  }

  onClick(callback){
    this.callback = callback;
    DataCenter.listeners.push(this);
  }

  checkClick(x, y){
    let w = this.width || this.img.width;
    let h = this.height || this.img.height;
    if(x > this.x && x < this.x + w){
      if(y > this.y && y < this.y + h){
        this.callback();
        return true;
      }
    }
    return false;
  }

  draw(ctx) {
    if (!this.visible || !this.loaded)
      return
    ctx.save();
    let w = this.width || this.img.width;
    let h = this.height || this.img.height;
    ctx.drawImage(
      this.img, //图片源y
      0, //图片裁剪x坐标
      0, //图片裁剪y坐标
      this.img.width, //图片裁剪宽度
      this.img.height, //图片裁剪高度
      this.x, //绘制到画布x坐标
      this.y, //绘制到画布y坐标
      w, //绘制到画布宽度
      h //绘制到画布高度
    )
    ctx.restore();
  }

}