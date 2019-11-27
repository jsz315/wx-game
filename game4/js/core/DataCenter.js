let { pixelRatio, windowHeight, windowWidth } = wx.getSystemInfoSync();
pixelRatio = Math.min(pixelRatio, 2);
let uiWidth = windowWidth * pixelRatio;
let uiHeight = windowHeight * pixelRatio;
let fitScale = uiWidth / 750;

let listeners = [];
let state = {
    onGround: false
}

function checkClick(x, y) {
    x = x * pixelRatio;
    y = y * pixelRatio;
    for (var j = listeners.length - 1; j >= 0; j--) {
        if (listeners[j].callback && listeners[j].checkClick(x, y)) {
            return true;
        }
    }
    return false;
}

function onClick(obj){
    listeners.push(obj);
}

const gameEvent = {
    handles: {},
    on: function (eventName, callback) {
        if (!this.handles[eventName]) {
            this.handles[eventName] = [];
        }
        this.handles[eventName].push(callback);
    },
    emit: function () {
        var key = arguments[0];
        var list = this.handles[key] || [];
        for (var i = 0; i < list.length; i++) {
            this.handles[key][i](arguments[1]);
        }
    }
}

// Event.on("dome", function (params) {
//     console.log(params);
// });
// Event.emit("dome", "holle world");


export default {
    pixelRatio,
    windowWidth,
    windowHeight,
    uiWidth,
    uiHeight,
    fitScale,
    listeners,
    checkClick,
    onClick,    
    gameEvent,
    state
}