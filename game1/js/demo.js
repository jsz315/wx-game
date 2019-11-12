import Foo from './foo'
import App from './core/App'
import { canvas } from "./libs/weapp-adapter";

export default class Main{
    constructor(){
        console.log("npm");
        console.log(THREE);
        var foo = new Foo("jsz")
        foo.say();
        foo.run();
        new App(canvas);
    }
}