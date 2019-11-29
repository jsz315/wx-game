
const OIMO = require('../libs/oimo/index.js')
let world, timerId, bodyList, player;
const TORAN = 180 / Math.PI;

worker.onMessage(function(res) {
    // console.log(res);
    switch(res.type){
        case 0:
            init();
            break;
        case 1:
            play();
            break;
        case 2:
            stop();
            break;
        case 3:
            reset(res.index, res.position);
            break;
        case 4:
            addBody(res.data);
            break;
        case 5:
            addPlayer(res.size);
            break;
        case 6:
            resetPlayer(res.position);
            break;
        case 7:
            movePlayer(res.position);
            break;
        default:
            break;
        
    }
})


function init(){
    world = new OIMO.World({
        info: false,
        timestep: 1 / 60,
        iterations: 7, 
        broadphase: 2,
        worldscale: 16
    });
    bodyList =[];    
}

function play(){
    timerId && clearInterval(timerId);
    timerId = setInterval(() => {
        console.log("update ==");
    }, 2000);
}

function stop(){
    timerId && clearInterval(timerId);
}

function reset(index, position){
    bodyList[index].resetPosition(position[0], position[1], position[2]);
    bodyList[index].resetRotation(0, 0, 0);
}

function resetPlayer(position){
    player.resetPosition(position[0], position[1], position[2]);
    player.resetRotation(0, 0, 0);
}

function movePlayer(position){
    player.linearVelocity.set(position[0], position[1], position[2]);
}

function addBody(data){
    let {type, parameters, position, rotation, move} = data;

    let param = {
        type: type,
        pos: [position.x, position.y, position.z],
        rot: [rotation._x * TORAN, rotation._y * TORAN, rotation._z * TORAN],
        move: move,
        density: 1,
        friction: 0.72,
        restitution: 0,
        belongsTo: 1,
        collidesWith: 0xffffffff
    }

    if (type == "cylinder") {
        param.size = [parameters.radiusTop, parameters.height];
    }
    else if (type == "box") {
        param.size = [parameters.width, parameters.height, parameters.depth];
    }
    else if (type == "sphere") {
        param.size = [parameters.radius];
    }

    let body = world.add(param);
    bodyList.push(body);
}

function addPlayer(size){
    let param = {
        pos: [0, 0, 0],
        rot: [0, 0, 0],
        move: true,
        density: 20,
        friction: 0.72,
        restitution: 0.1,
        belongsTo: 1,
        collidesWith: 0xffffffff
    }

    param.type = "sphere";
    param.size = [size];
    player = world.add(param);
}

function update(){
    world.step();
    let list = [];
    bodyList.forEach(item => {
        list.push({
            position: item.getPosition(),
            quaternion: item.getQuaternion()
        })
    })
    worker.postMessage({
        type: 0,
        list: list,
        player: {
            position: player.getPosition(),
            quaternion: player.getQuaternion()
        }
    })
}