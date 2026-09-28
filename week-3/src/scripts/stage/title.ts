import {
    type Application,
    Stage,
    Text,
    state,
} from "melonjs";

class TitleScreen extends Stage {
    private startGame = (event: KeyboardEvent): void => {
        if (event.key === "Enter") {
            state.change(state.PLAY);
        }
    };

    /**
     * Runs whenever the MENU state becomes active.
     */
    onResetEvent(app: Application): void {
        app.world.backgroundColor.parseCSS("#030313");

        const title = new Text(
            app.viewport.width / 2,
            app.viewport.height / 2 - 70,
            {
                font: "Arial",
                size: 72,
                fillStyle: "#ffeb00",
                textAlign: "center",
                textBaseline: "middle",
                text: "PAC-MAN",
            },
        );

        const instructions = new Text(
            app.viewport.width / 2,
            app.viewport.height / 2 + 30,
            {
                font: "Arial",
                size: 32,
                fillStyle: "#63e5ff",
                textAlign: "center",
                textBaseline: "middle",
                text: "Press ENTER to Start",
            },
        );

        const description = new Text(
            app.viewport.width / 2,
            app.viewport.height / 2 + 90,
            {
                font: "Arial",
                size: 20,
                fillStyle: "#ffffff",
                textAlign: "center",
                textBaseline: "middle",
                text: "melonJS Menu State",
            },
        );

        app.world.addChild(title);
        app.world.addChild(instructions);
        app.world.addChild(description);

        window.addEventListener("keydown", this.startGame);
    }

    /**
     * Runs when leaving the MENU state.
     */
    onDestroyEvent(): void {
        window.removeEventListener("keydown", this.startGame);
    }
}

export default TitleScreen;