import * as THREE from '../libs/three/index.js'

export default class Store {
    constructor() {
        this.total = 200;
        this.sphereGeos = [];
        this.boxGeos = [];
        this.mats = [];
        this.cylinderGeos = [];

        this.geometryList = [];
        this.materialList = [];

        for (var i = 0; i < 1; i++) {
            // let size = 1 + Math.random() * 6;
            let size = 1.5;
            // this.sphereGeos.push(new THREE.SphereGeometry(size, 10, 10));
            // this.boxGeos.push(new THREE.BoxGeometry(size, size, size));
            // this.cylinderGeos.push(new THREE.CylinderGeometry(size, size, size * 3.6));

            this.geometryList.push({
                type: "sphere",
                param: {
                    radius: size
                },
                geometry: new THREE.SphereBufferGeometry(size)
            })

            this.geometryList.push({
                type: "cylinder",
                param: {
                    radiusTop: size,
                    radiusBottom: size,
                    height: size * 3.6
                },
                geometry: new THREE.CylinderBufferGeometry(size, size, size * 3.6)
            })

            this.geometryList.push({
                type: "box",
                param: {
                    width: size,
                    height: size,
                    depth: size
                },
                geometry: new THREE.BoxBufferGeometry(size)
            })

            let color = new THREE.Color(0xffffff);
            let material = new THREE.MeshStandardMaterial({ color });
            material.map = new THREE.TextureLoader().load("images/texture/m" + 5 + ".jpg");
            material.emissive = new THREE.Color(0, 0, 0);
            material.metalness = 0.1;
            material.roughness = 0.7;

            this.materialList.push({
                type: "material",
                material: material
            })
        }

        // if (type == "CylinderGeometry") {
        //     param.type = "cylinder";
        //     param.size = [parameters.radiusTop, parameters.height];
        // }
        // else if (type == "BoxGeometry") {
        //     param.type = "box";
        //     param.size = [parameters.width, parameters.height, parameters.depth];
        // }
        // else if (type == "SphereGeometry") {
        //     param.type = "sphere";
        //     param.size = [parameters.radius];
        // }

    }

    getBufferGeometry(type) {
        // let geo;
        return this.geometryList.find(item => item.type == type);
        // if (type == "box") {
        //     geo = this.getBoxBufferGeometry();
        // }
        // else if (type == "sphere") {
        //     geo = this.getSphereBufferGeometry();
        // }
        // else if (type == "cylinder") {
        //     geo = this.getCylinderBufferGeometry();
        // }
        // return geo;
    }n

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
        // let n = Math.floor(Math.random() * this.mats.length);
        // return this.mats[n];
        return this.materialList[0].material;
    }
}