import Group from "../component/Group";
import Sprite from "../component/Sprite";
import DataCenter from "../../core/DataCenter";
let { uiWidth, uiHeight, pixelRatio, windowHeight, windowWidth, fitScale } = DataCenter;

export default class Start{
    constructor(){
        this.group = new Group();
        this.group.name = "start group";

        var bg = new Sprite("images/start.png", 618, 524);
        bg.x = (750 - bg.width) / 2;
        bg.y = (uiHeight - bg.height) / 3;
        bg.name = "start panel bg";
        this.group.add(bg);

        var playBtn = new Sprite("images/play.png", 271, 93);
        playBtn.x = (750 - playBtn.width) / 2;
        playBtn.y = bg.y + bg.height - playBtn.height;
        playBtn.name = "start panel playBtn";
        this.group.add(playBtn);

        playBtn.onClick(() => {
            console.log("gameStart");
            this.group.visible = false;
			DataCenter.gameEvent.emit("gameStart");
		})
    }
}