
import * as THREE from 'three'

let mesh:THREE.Mesh;
mesh.scale.multiplyScalar(1);
mesh.visible = false;

let mat:THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
    color: Math.floor(Math.random() * 0xffffff),
	opacity: 1
})



let material = new THREE.SpriteMaterial({
    color: 0xff9900,
	sizeAttenuation: false
})
let sprite = new THREE.Sprite(material);
sprite.visible = false;