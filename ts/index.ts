
import * as THREE from 'three'

let mesh:THREE.Mesh;
mesh.scale.multiplyScalar(1);
mesh.visible = false;

let mat:THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
    color: Math.floor(Math.random() * 0xffffff),
	opacity: 1
})

mat.opacity