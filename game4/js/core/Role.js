import * as THREE from '../libs/three/index.js'
import {FBXLoader} from '../libs/three/tool/FBXLoader.js'
// const OIMO = require('../libs/oimo/index.js')
import DataCenter from "./DataCenter";
import Tooler from "./Tooler";

let { pixelRatio, windowHeight, windowWidth, state, worker, physicsList, mapSize } = DataCenter;
const TORAN = 180 / Math.PI;

export default class Role{
    constructor(scene){
        this.scene = scene;
    }

    readFile(path){
        wx.getFileSystemManager().readFile({
            filePath: path,
            success: (res)=>{
                console.log("readFile success");
                console.log(res);
                this.parseData(res.data);
            },
            complete: (res)=>{
                console.log("readFile complete");
                console.log(res);
            }
        })
    }

    parseData(data){
        var list = this.url.split("/");
        list.pop();
        var path = list.join("/");
        var loader = new FBXLoader();
        var object = loader.parse(data, path);
        this.mixer = new THREE.AnimationMixer( object );
        var action = this.mixer.clipAction( object.animations[ 0 ] );
        action.play();

        object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        } );

        // let scale = Tooler.getFitScale(parent, 10);
        // object.scale.multiplyScalar(scale);
        object.scale.multiplyScalar(0.3);
        this.scene.add(object);
    }

    loadObj(url){
        this.url = url;
        // wx.request({
        //     header: {
        //         'content-type': 'application/octet-stream'
        //     }
        // })
        wx.downloadFile({
            url: url,
            success: (res)=>{
                console.log(res);
                this.readFile(res.tempFilePath);

                // var list = url.split("/");
                // list.pop();
                // var path = list.join("/");
                // var loader = new FBXLoader();
                // var object = loader.parse(res.data, path);
                // this.mixer = new THREE.AnimationMixer( object );
                // var action = this.mixer.clipAction( object.animations[ 0 ] );
                // action.play();

                // object.traverse( function ( child ) {
                //     if ( child.isMesh ) {
                //         child.castShadow = true;
                //         child.receiveShadow = true;
                //     }
                // } );

                // let scale = Tooler.getFitScale(parent, 10);
                // object.scale.multiplyScalar(scale);
                // this.scene.add(object);
            }
        })

        /*
        var loader = new FBXLoader();
        loader.load(url, ( object )=> {
            this.mixer = new THREE.AnimationMixer( object );
            var action = this.mixer.clipAction( object.animations[ 0 ] );
            action.play();

            object.traverse( function ( child) {

                if ( child.isMesh ) {

                    child.castShadow = true;
                    child.receiveShadow = true;

                }

            } );

            let scale = Tooler.getFitScale(parent, 10);
            // parent.position.set(0, 0, 0);
            object.scale.multiplyScalar(scale);
            // parent.rotateX(-Math.PI / 2);
            this.scene.add(object);
        } );
        */
    }
}
