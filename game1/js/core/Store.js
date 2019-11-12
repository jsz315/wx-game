"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var Store = (function () {
    function Store() {
        this.sphereGeos = [];
        this.boxGeos = [];
        this.mats = [];
        for (var i = 0; i < 8; i++) {
            this.sphereGeos.push(new THREE.SphereGeometry(0.2 + Math.random() * 2, 10, 10));
            var size = 0.2 + Math.random() * 2;
            this.boxGeos.push(new THREE.BoxGeometry(size, size, size));
            var mat = new THREE.MeshNormalMaterial();
            this.mats.push(mat);
        }
    }
    Store.prototype.getSphereBufferGeometry = function () {
        var n = Math.floor(Math.random() * this.sphereGeos.length);
        return this.sphereGeos[n];
    };
    Store.prototype.getBoxBufferGeometry = function () {
        var n = Math.floor(Math.random() * this.boxGeos.length);
        return this.boxGeos[n];
    };
    Store.prototype.getMaterial = function () {
        var n = Math.floor(Math.random() * this.mats.length);
        return this.mats[n];
    };
    return Store;
}());
exports.default = Store;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUErQjtBQUcvQjtJQU1JO1FBSkEsZUFBVSxHQUFPLEVBQUUsQ0FBQztRQUNwQixZQUFPLEdBQU8sRUFBRSxDQUFDO1FBQ2pCLFNBQUksR0FBTyxFQUFFLENBQUM7UUFJVixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDO1lBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVoRixJQUFJLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBUzNELElBQUksR0FBRyxHQUE0QixJQUFJLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQ2xFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO0lBRUwsQ0FBQztJQUVELHVDQUF1QixHQUF2QjtRQUNJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxvQ0FBb0IsR0FBcEI7UUFDSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsMkJBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFDTCxZQUFDO0FBQUQsQ0FBQyxBQXpDRCxJQXlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xyXG5pbXBvcnQgT0lNTyBmcm9tICdvaW1vJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmV7XHJcblxyXG4gICAgc3BoZXJlR2VvczphbnkgPSBbXTtcclxuICAgIGJveEdlb3M6YW55ID0gW107XHJcbiAgICBtYXRzOmFueSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcblxyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCA4OyBpKyspe1xyXG4gICAgICAgICAgICB0aGlzLnNwaGVyZUdlb3MucHVzaChuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC4yICsgTWF0aC5yYW5kb20oKSAqIDIsIDEwLCAxMCkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNpemUgPSAwLjIgKyBNYXRoLnJhbmRvbSgpICogMjtcclxuICAgICAgICAgICAgdGhpcy5ib3hHZW9zLnB1c2gobmV3IFRIUkVFLkJveEdlb21ldHJ5KHNpemUsIHNpemUsIHNpemUpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGxldCBjb2xvciA9IG5ldyBUSFJFRS5Db2xvcigweGZmZmZmZik7XHJcbiAgICAgICAgICAgIC8vIGxldCBtYXQ6VEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe2NvbG9yfSk7XHJcbiAgICAgICAgICAgIC8vIG1hdC5tYXAgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpLmxvYWQoXCJpbWFnZXMvaW1nL21cIiArIChpICUgNiArIDEpICsgXCIuanBnXCIpO1xyXG4gICAgICAgICAgICAvLyBtYXQuZW1pc3NpdmUgPSBuZXcgVEhSRUUuQ29sb3IoMCwgMCwgMCk7XHJcbiAgICAgICAgICAgIC8vIG1hdC5tZXRhbG5lc3MgPSAwLjE7XHJcbiAgICAgICAgICAgIC8vIG1hdC5yb3VnaG5lc3MgPSAwLjc7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWF0OlRIUkVFLk1lc2hOb3JtYWxNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTm9ybWFsTWF0ZXJpYWwoKTtcclxuICAgICAgICAgICAgdGhpcy5tYXRzLnB1c2gobWF0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3BoZXJlQnVmZmVyR2VvbWV0cnkoKXtcclxuICAgICAgICBsZXQgbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuc3BoZXJlR2Vvcy5sZW5ndGgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNwaGVyZUdlb3Nbbl07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Qm94QnVmZmVyR2VvbWV0cnkoKXtcclxuICAgICAgICBsZXQgbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuYm94R2Vvcy5sZW5ndGgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJveEdlb3Nbbl07XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWF0ZXJpYWwoKXtcclxuICAgICAgICBsZXQgbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMubWF0cy5sZW5ndGgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hdHNbbl07XHJcbiAgICB9XHJcbn0iXX0=