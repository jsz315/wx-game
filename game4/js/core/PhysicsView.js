import DataCenter from "./DataCenter";

let { pixelRatio, windowHeight, windowWidth, state, worker, physicsList } = DataCenter;
const TORAN = 180 / Math.PI;

export default class PhysicsView {
    constructor(mesh, move, item) {
        this.mesh = mesh;

        worker.postMessage({
            type: 4,
            data: {
                move: move,
                type: item.type,
                parameters: item.param,
                position: mesh.position,
                rotation: mesh.rotation
            }
        })

        physicsList.push(this);

        // this.world = world;
        // let type = mesh.geometry.type;
        // let parameters = mesh.geometry.parameters;

        // let param = {
        //     pos: [mesh.position.x, mesh.position.y, mesh.position.z],
        //     rot: [mesh.rotation.x * TORAN, mesh.rotation.y * TORAN, mesh.rotation.z * TORAN],
        //     move: move,
        //     density: 1,
        //     friction: 0.72,
        //     restitution: 0,
        //     belongsTo: 1,
        //     collidesWith: 0xffffffff
        // }

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

        // this.body = world.add(param);
    }

    step(item){
        this.mesh.position.copy(item.position);
        this.mesh.quaternion.copy(item.quaternion);
    }

    setPositon(x, y, z){
        // this.body.sleep();
        // this.body.resetPosition(x, y, z);
        // this.body.resetRotation(0, 0, 0);
        // this.update();
    }

    update() {
        // this.mesh.position.copy(this.body.getPosition());
        // this.mesh.quaternion.copy(this.body.getQuaternion());
        // this.body.updateMesh();
        // this.destory();
    }

    destory() {
        if (this.mesh.position.y < -30) {
            let x = (0.5 - Math.random()) * 40;
            let y = 100;
            let z = (0.5 - Math.random()) * 40;
            this.body.resetPosition(x, y, z);
        }
    }
}