import DataCenter from '../../core/DataCenter.js';
let { fitScale } = DataCenter;


export default class Sprite {

    constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0) {
        // this.img = wx.createImage();
        this.img = new Image();
        this.img.onload = () => {
            this.loaded = true;
            this.fitSize();
        }
        this.img.src = imgSrc;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.alpha = 1;
        this.visible = true;
        this.loaded = false;
    }

    onClick(callback) {
        this.callback = callback;
        DataCenter.listeners.push(this);
    }

    checkClick(x, y) {
        if (x > this.fitX && x < this.fitX + this.fitWidth) {
            if (y > this.fitY && y < this.fitY + this.fitHeight) {
                this.callback();
                return true;
            }
        }
        return false;
    }

    fitSize() {
        let w = this.width || this.img.width;
        let h = this.height || this.img.height;
        this.fitX = this.x * fitScale;
        this.fitY = this.y * fitScale;
        this.fitWidth = w * fitScale;
        this.fitHeight = h * fitScale;
    }

    draw(ctx) {
        if (!this.visible || !this.loaded)
            return
        ctx.save();

        ctx.globalAlpha = this.alpha;
        ctx.drawImage(
            this.img, //图片源y
            0, //图片裁剪x坐标
            0, //图片裁剪y坐标
            this.img.width, //图片裁剪宽度
            this.img.height, //图片裁剪高度
            this.fitX, //绘制到画布x坐标
            this.fitY, //绘制到画布y坐标
            this.fitWidth, //绘制到画布宽度
            this.fitHeight //绘制到画布高度
        )
        ctx.restore();
    }

}