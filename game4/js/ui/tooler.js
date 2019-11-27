function globalToLocal(x, y, obj){
    let parent = obj.parent;
    // console.log("世界: ", x, y);
    while(parent){
        x -= parent.x;
        y -= parent.y;
        parent = parent.parent;
    }
    // console.log("本地: ", x, y);
    return {x, y};
}

function globalAlpha(obj){
    let parent = obj.parent;
    let alpha = obj.alpha;
    while(parent){
        alpha *= parent.alpha;
        parent = parent.parent;
    }
    return alpha;
}

function globalVisible(obj){
    let parent = obj.parent;
    let visible = obj.visible;
    if(!visible){
        return false;
    }
    while(parent){
        if(!parent.visible){
            return false;
        }
        parent = parent.parent;
    }
    return true;
}


var Stats = function () {
	var beginTime = Date.now(), prevTime = beginTime, frames = 0;
	return {
        data: 0,
		end: function () {
			frames ++;
			var time = Date.now();
			if ( time >= prevTime + 1000 ) {
                this.data = Math.floor((frames * 1000) / (time - prevTime));
				prevTime = time;
				frames = 0;
			}
			return time;

		},
		update: function () {
			beginTime = this.end();
		}
	};

};

export default {
    globalToLocal,
    globalAlpha,
    globalVisible,
    Stats
}

