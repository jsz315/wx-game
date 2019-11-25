import * as THREE from '../libs/three/index.js'

export default class Store {
    constructor() {
        this.sphereGeos = [];
        this.boxGeos = [];
        this.mats = [];
        this.cylinderGeos = [];

        for (var i = 0; i < 8; i++) {
            // let size = 1 + Math.random() * 6;
            let size = 1.5;
            this.sphereGeos.push(new THREE.SphereGeometry(size, 10, 10));
            this.boxGeos.push(new THREE.BoxGeometry(size, size, size));
            this.cylinderGeos.push(new THREE.CylinderGeometry(size, size, size * 4));

            let color = new THREE.Color(0xffffff);
            let mat = new THREE.MeshStandardMaterial({ color });
            mat.map = new THREE.TextureLoader().load("images/texture/m" + 5 + ".jpg");
            mat.emissive = new THREE.Color(0, 0, 0);
            mat.metalness = 0.1;
            mat.roughness = 0.7;

            this.mats.push(mat);
            // this.mats.push(new THREE.MeshNormalMaterial());
        }

    }

    getBufferGeometry(type) {
        let geo;
        if (type == "box") {
            geo = this.getBoxBufferGeometry();
        }
        else if (type == "sphere") {
            geo = this.getSphereBufferGeometry();
        }
        else if (type == "cylinder") {
            geo = this.getCylinderBufferGeometry();
        }
        return geo;
    }

    getCylinderBufferGeometry() {
        let n = Math.floor(Math.random() * this.cylinderGeos.length);
        let geometry = this.cylinderGeos[n];
        // return new THREE.BufferGeometry().fromGeometry(geometry);
        return geometry;
    }

    getSphereBufferGeometry() {
        let n = Math.floor(Math.random() * this.sphereGeos.length);
        let geometry = this.sphereGeos[n];
        // return new THREE.BufferGeometry().fromGeometry(geometry);
        return geometry;
    }

    getBoxBufferGeometry() {
        let n = Math.floor(Math.random() * this.boxGeos.length);
        let geometry = this.boxGeos[n];
        // return new THREE.BufferGeometry().fromGeometry(geometry);
        return geometry;
    }

    getMaterial() {
        let n = Math.floor(Math.random() * this.mats.length);
        return this.mats[n];
    }
}