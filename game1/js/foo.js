"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foo = (function () {
    function foo(n) {
        this.name = n;
    }
    foo.prototype.say = function () {
        console.log("name " + this.name);
    };
    foo.prototype.run = function () {
        console.log(this.name + " run!");
    };
    return foo;
}());
exports.default = foo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm9vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7SUFFSSxhQUFZLENBQVE7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUNELGlCQUFHLEdBQUg7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNELGlCQUFHLEdBQUg7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVMLFVBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIGZvb3tcclxuICAgIG5hbWU6c3RyaW5nXHJcbiAgICBjb25zdHJ1Y3RvcihuOnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gbjtcclxuICAgIH1cclxuICAgIHNheSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibmFtZSBcIiArIHRoaXMubmFtZSk7XHJcbiAgICB9XHJcbiAgICBydW4oKXtcclxuICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgXCIgcnVuIVwiKTtcclxuICAgIH1cclxuICAgIFxyXG59Il19