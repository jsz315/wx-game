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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9vLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm9vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7SUFFSSxhQUFZLENBQVE7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUNELGlCQUFHLEdBQUg7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNELGlCQUFHLEdBQUg7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVMLFVBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIGZvb3tcbiAgICBuYW1lOnN0cmluZ1xuICAgIGNvbnN0cnVjdG9yKG46c3RyaW5nKXtcbiAgICAgICAgdGhpcy5uYW1lID0gbjtcbiAgICB9XG4gICAgc2F5KCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibmFtZSBcIiArIHRoaXMubmFtZSk7XG4gICAgfVxuICAgIHJ1bigpe1xuICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgXCIgcnVuIVwiKTtcbiAgICB9XG4gICAgXG59Il19