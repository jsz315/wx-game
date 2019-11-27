import DataCenter from '../../core/DataCenter.js';
import Tooler from '../tooler.js';
let { fitScale } = DataCenter;

export default class Text {

    constructor(word = '', x = 0, y = 0) {
        this.word = word;
        this.x = x;
        this.y = y;
        this.visible = true;
        this.format();
        this.alpha = 1;
        this.parent = null;
        this.name = "Text";
    }

    format(textAlign = 'left', color = "#000000", fontSize = 16, fontFamily = "Arial") {
        this.textAlign = textAlign;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.color = color;
        this.fitSize();
    }

    onClick(callback) {
        this.callback = callback;
        DataCenter.onClick(this);
    }

    checkClick(ox, oy) {
        if(!Tooler.globalVisible(this)){
            // console.log(this.name + " no visible");
            return false;
        }
        let {x, y} = Tooler.globalToLocal(ox, oy, this);

        let w = this.textWidth;
        let h = this.fitFontSize * 1.2;
        let sx;
        if(this.textAlign == "left"){
            sx = this.fitX;
        }
        else if(this.textAlign == "center"){
            sx = this.fitX - this.textWidth / 2;
        }
        else if(this.textAlign == "right"){
            sx = this.fitX - this.textWidth;
        }

        if (x > sx && x < sx + w) {
            if (y > this.fitY && y < this.fitY + h) {
                this.callback();
                return true;
            }
        }
        return false;
    }

    fitSize() {
        this.fitX = this.x * fitScale;
        this.fitY = this.y * fitScale;
        this.fitFontSize = this.fontSize * fitScale;
    }

    draw(ctx) {
        if (!this.visible)
            return;
        ctx.save();

        ctx.globalAlpha = Tooler.globalAlpha(this);
        ctx.font = `${this.fitFontSize}px ${this.fontFamily}`;
        ctx.textAlign = this.textAlign;
        ctx.fillStyle = this.color;
        this.textWidth = ctx.measureText(this.word).width;
        ctx.textBaseline = 'top';
        ctx.fillText(this.word, this.fitX, this.fitY);


        // ctx.beginPath();
        // ctx.lineWidth = "2";
        // ctx.strokeStyle = "red";
        // if(this.textAlign == "left"){
        //     ctx.rect(this.fitX, this.fitY, this.textWidth, this.fitFontSize * 1.2);
        // }
        // else if(this.textAlign == "center"){
        //     ctx.rect(this.fitX - this.textWidth / 2, this.fitY, this.textWidth, this.fitFontSize * 1.2);
        // }
        // else if(this.textAlign == "right"){
        //     ctx.rect(this.fitX - this.textWidth, this.fitY, this.textWidth, this.fitFontSize * 1.2);
        // }
        // ctx.stroke();


        ctx.restore();
        this.ctx = ctx;
    }
}