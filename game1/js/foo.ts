export default class foo{
    name:string
    constructor(n:string){
        this.name = n;
    }
    say(){
        console.log("name " + this.name);
    }
    run(){
      console.log(this.name + " run!");
    }
    
}