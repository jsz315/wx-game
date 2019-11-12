import * as THREE from '../libs/three/index.js'

export default class Store{
    constructor(){
        this.sphereGeos = [];
        this.boxGeos = [];
        this.mats = [];
        this.cylinderGeos = [];

        for(var i = 0; i < 8; i++){
            let size = 0.4 + Math.random() * 4;
            this.sphereGeos.push(new THREE.SphereGeometry(size, 10, 10));
            this.boxGeos.push(new THREE.BoxGeometry(size, size, size));
            this.cylinderGeos.push(new THREE.CylinderGeometry(size, size, size));

            let color = new THREE.Color(0xffffff);
            let mat = new THREE.MeshStandardMaterial({color});
            mat.map = new THREE.TextureLoader().load("images/texture/m" + (i % 6 + 1) + ".jpg");
            mat.emissive = new THREE.Color(0, 0, 0);
            mat.metalness = 0.3;
            mat.roughness = 0.3;

            this.mats.push(mat);
            // this.mats.push(new THREE.MeshNormalMaterial());
        }
        
    }

    getBufferGeometry(type){
        let geo;
        if(type == "box"){
            geo = this.getBoxBufferGeometry();
        }
        else if(type == "sphere"){
            geo = this.getSphereBufferGeometry();
        }
        if(type == "cylinder"){
            geo = this.getCylinderBufferGeometry();
        }
        return geo;
    }

    getCylinderBufferGeometry(){
        let n = Math.floor(Math.random() * this.cylinderGeos.length);
        return this.cylinderGeos[n];
    }

    getSphereBufferGeometry(){
        let n = Math.floor(Math.random() * this.sphereGeos.length);
        return this.sphereGeos[n];
    }

    getBoxBufferGeometry(){
        let n = Math.floor(Math.random() * this.boxGeos.length);
        return this.boxGeos[n];
    }

    getMaterial(){
        let n = Math.floor(Math.random() * this.mats.length);
        return this.mats[n];
    }
}