import Group from "../component/Group";
import Sprite from "../component/Sprite";
import DataCenter from "../../core/DataCenter";
import Text from '../component/Text.js'
let { uiWidth, uiHeight, pixelRatio, windowHeight, windowWidth, fitScale } = DataCenter;

export default class Result{
    constructor(){
        this.group = new Group();
        this.group.name = "result group";

        var bg = new Sprite("images/score.png", 618, 524);
        bg.x = (750 - bg.width) / 2;
        bg.y = (uiHeight - bg.height) / 2;
        bg.name = "result panel bg";
        this.group.add(bg);

        var playBtn = new Sprite("images/play.png", 271, 93);
        playBtn.x = (750 - playBtn.width) / 2;
        playBtn.y = bg.y + bg.height - playBtn.height - 20;
        playBtn.name = "result panel playBtn";
        this.group.add(playBtn);

        this.scoreTxt = new Text();
        this.scoreTxt.x = 428;
        this.scoreTxt.y = bg.y + 246;
        this.scoreTxt.format("left", "#ffffff", 30);
        this.scoreTxt.name = "result panel scoreTxt";
        this.group.add(this.scoreTxt);

        playBtn.onClick(() => {
            console.log("gameRestart");
            this.group.visible = false;
			DataCenter.gameEvent.emit("gameStart");
        })

    }

    show(n){
        console.log("show result");
        this.group.visible = true;
        this.scoreTxt.word = n;
    }
}