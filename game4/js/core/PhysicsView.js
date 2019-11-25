const TORAN = 180 / Math.PI;

export default class PhysicsView {
    constructor(mesh, move, world) {
        this.mesh = mesh;
        this.world = world;
        let type = mesh.geometry.type;
        let parameters = mesh.geometry.parameters;

        let param = {
            pos: [mesh.position.x, mesh.position.y, mesh.position.z],
            rot: [mesh.rotation.x * TORAN, mesh.rotation.y * TORAN, mesh.rotation.z * TORAN],
            move: move,
            density: 1.6,
            friction: 0.8,
            restitution: 0.01,
            belongsTo: 1,
            collidesWith: 0xffffffff
        }

        if (type == "CylinderGeometry") {
            param.type = "cylinder";
            param.size = [parameters.radiusTop, parameters.height];
        }
        else if (type == "BoxGeometry") {
            param.type = "box";
            param.size = [parameters.width, parameters.height, parameters.depth];
        }
        else if (type == "SphereGeometry") {
            param.type = "sphere";
            param.size = [parameters.radius];
        }

        this.body = world.add(param);
    }

    setPositon(x, y, z){
        this.body.resetPosition(x, y, z);
        this.body.resetRotation(0, 0, 0);
        this.update();
    }

    update() {
        this.mesh.position.copy(this.body.getPosition());
        this.mesh.quaternion.copy(this.body.getQuaternion());
        // this.body.updateMesh();
        this.destory();
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