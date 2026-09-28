import {
    type Application,
    Stage,
    ColorLayer,
    BitmapText,
    Sprite,
    state,
} from "melonjs";

class PlayScreen extends Stage {
    private returnToMenu = (event: KeyboardEvent): void => {
        if (event.key === "Escape") {
            state.change(state.MENU);
        }
    };

    /**
     * Runs whenever the PLAY state becomes active.
     */
    onResetEvent(app: Application): void {
        // Background color behind all game objects.
        app.world.addChild(
            new ColorLayer("background-color", "#030313"),
            0,
        );

        // This image was loaded asynchronously through resources.js.
        const background = new Sprite(
            app.viewport.width / 2,
            app.viewport.height / 2,
            {
                image: "background",
            },
        );

        app.world.addChild(background, 1);

        app.world.addChild(
            new BitmapText(
                app.viewport.width / 2,
                app.viewport.height / 2 - 40,
                {
                    font: "PressStart2P",
                    size: 1.8,
                    textBaseline: "middle",
                    textAlign: "center",
                    text: "MELONJS PLAY STATE",
                },
            ),
            5,
        );

        app.world.addChild(
            new BitmapText(
                app.viewport.width / 2,
                app.viewport.height / 2 + 45,
                {
                    font: "PressStart2P",
                    size: 0.8,
                    textBaseline: "middle",
                    textAlign: "center",
                    text: "ASSETS LOADED - ENGINE RUNNING",
                },
            ),
            5,
        );

        app.world.addChild(
            new BitmapText(
                app.viewport.width / 2,
                app.viewport.height / 2 + 95,
                {
                    font: "PressStart2P",
                    size: 0.65,
                    textBaseline: "middle",
                    textAlign: "center",
                    text: "PRESS ESC TO RETURN TO MENU",
                },
            ),
            5,
        );

        window.addEventListener("keydown", this.returnToMenu);
    }

    /**
     * Runs when leaving the PLAY state.
     */
    onDestroyEvent(): void {
        window.removeEventListener("keydown", this.returnToMenu);
    }
}

export default PlayScreen;