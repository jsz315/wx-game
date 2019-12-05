import * as THREE from '../libs/three/index.js'

function getOffsetVector3(obj){
    let box = new THREE.Box3().setFromObject(obj);
    let x = (box.min.x + box.max.x) / 2;
    let y = (box.min.y + box.max.y) / 2;
    let z = (box.min.z + box.max.z) / 2;
    return new THREE.Vector3(x, y, z);;
}

function getBoxSize(obj){
    let box = new THREE.Box3().setFromObject(obj);
    let size = box.getSize(new THREE.Vector3());
    return size;
}

function getFitScale(obj, num){
    let size = getBoxSize(obj);
    let max = Math.max(size.x, size.y, size.z);
    let scale = num / max;
    return scale;
}


export default {
    getOffsetVector3,
    getBoxSize,
    getFitScale
}