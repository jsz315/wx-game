import DataCenter from '../../core/DataCenter.js';
export default class Text{

    constructor(word = '', x = 0, y = 0){
        this.word = word;
        this.x = x;
        this.y = y;
        this.visible = true;
        this.format();
    }

    format(textAlign = 'left', color = "#000000", fontSize = 16, fontFamily = "Arial"){
        this.textAlign = textAlign;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.color = color;
    }

    onClick(callback){
        this.callback = callback;
        DataCenter.listeners.push(this);
    }

    checkClick(x, y){
        let w = this.textWidth;
        let h = this.fontSize * 1.2;
        console.log(this.textWidth, h);
        if(x > this.x && x < this.x + w){
          if(y > this.y && y < this.y + h){
            this.callback();
            return true;
          }
        }
        return false;
    }

    draw(ctx) {
        if ( !this.visible )
          return
        ctx.save();
        ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        ctx.textAlign = this.textAlign;
        ctx.fillStyle = this.color;
        this.textWidth = ctx.measureText(this.word).width;
        ctx.fillText(this.word, this.x, this.y);
        ctx.restore();
        this.ctx = ctx;
    }
}