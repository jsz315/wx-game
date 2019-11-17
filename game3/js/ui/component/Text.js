import DataCenter from '../../core/DataCenter.js';

let { fitScale } = DataCenter;

export default class Text {

    constructor(word = '', x = 0, y = 0) {
        this.word = word;
        this.x = x;
        this.y = y;
        this.visible = true;
        this.format();
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
        DataCenter.listeners.push(this);
    }

    checkClick(x, y) {
        let w = this.textWidth;
        let h = this.fitFontSize * 1.2;
        console.log(this.textWidth, h);
        if (x > this.fitX && x < this.fitX + w) {
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
            return
        ctx.save();
        ctx.font = `${this.fitFontSize}px ${this.fontFamily}`;
        ctx.textAlign = this.textAlign;
        ctx.fillStyle = this.color;
        this.textWidth = ctx.measureText(this.word).width;
        ctx.fillText(this.word, this.fitX, this.fitY);
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "red";
        ctx.rect(this.fitX, this.fitY, this.textWidth, this.fitFontSize * 1.2);
        ctx.stroke();
        ctx.restore();
        this.ctx = ctx;
    }
}