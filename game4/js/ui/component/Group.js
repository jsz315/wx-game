import Tooler from '../tooler.js';

export default class Group{

    constructor(x = 0, y = 0){
        this.children = [];
        this.x = x;
        this.y = y;
        this.alpha = 1;
        this.visible = true;
        this.parent = null;
        this.name = "Group";
    }

    add(view){
        view.parent = this;
        this.children.push(view);
    }

    // checkClick(x, y) {
    //     let ax = x - this.x;
    //     let ay = y - this.y;
    //     for(let i = this.children.length - 1; i >= 0; i--){
    //         if(this.children[i].checkClick(ax, ay)){
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    draw(ctx){
        if (!this.visible)
            return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.globalAlpha = Tooler.globalAlpha(this);
        this.children.forEach(view => {
            view.draw(ctx);
        })
        ctx.restore();
    }

}