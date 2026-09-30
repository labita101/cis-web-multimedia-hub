import {
    type Application,
    Stage,
    ColorLayer,
    Text,
    input,
    state
} from "melonjs";

class TitleScreen extends Stage {
    onResetEvent(app: Application) {
        input.bindKey(input.KEY.ENTER, "start");

        app.world.addChild(
            new ColorLayer("title-background", "#000000")
        );

        const title = new Text(
            app.viewport.width / 2,
            190,
            {
                font: "Arial",
                size: 52,
                fillStyle: "#FFFF00",
                text: "PAC-MAN",
                textAlign: "center",
                textBaseline: "middle"
            }
        );

        const instructions = new Text(
            app.viewport.width / 2,
            300,
            {
                font: "Arial",
                size: 22,
                fillStyle: "#FFFFFF",
                text: "PRESS ENTER TO START",
                textAlign: "center",
                textBaseline: "middle"
            }
        );

        const controls = new Text(
            app.viewport.width / 2,
            365,
            {
                font: "Arial",
                size: 16,
                fillStyle: "#FFB897",
                text: "ARROW KEYS OR WASD TO MOVE",
                textAlign: "center",
                textBaseline: "middle"
            }
        );

        app.world.addChild(title);
        app.world.addChild(instructions);
        app.world.addChild(controls);
    }

    override update(): boolean {
        if (input.isKeyPressed("start")) {
            state.change(state.PLAY);
        }

        return true;
    }

    onDestroyEvent() {
        input.unbindKey(input.KEY.ENTER);
    }
}

export default TitleScreen;