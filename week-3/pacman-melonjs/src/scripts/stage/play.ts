import {
    type Application,
    Stage,
    ColorLayer,
    input
} from "melonjs";

import MazeRenderer from "../renderables/maze-renderer";
import PlayerEntity from "../renderables/player";
import GhostEntity from "../renderables/ghost";
import ScoreDisplay from "../renderables/score-display";

class PlayScreen extends Stage {
    onResetEvent(app: Application) {
        // Movement controls
        input.bindKey(input.KEY.LEFT, "left");
        input.bindKey(input.KEY.RIGHT, "right");
        input.bindKey(input.KEY.UP, "up");
        input.bindKey(input.KEY.DOWN, "down");

        input.bindKey(input.KEY.A, "left");
        input.bindKey(input.KEY.D, "right");
        input.bindKey(input.KEY.W, "up");
        input.bindKey(input.KEY.S, "down");

        // Restart control
        input.bindKey(input.KEY.R, "restart");

        // Black background
        app.world.addChild(
            new ColorLayer("background", "#000000")
        );

        // Maze
        app.world.addChild(new MazeRenderer());

        // Pac-Man
        const player = new PlayerEntity();
        app.world.addChild(player);

        // Ghost
        app.world.addChild(new GhostEntity(player));

        // Score, coordinates, Game Over, win, and restart message
        app.world.addChild(new ScoreDisplay(player));
    }

    onDestroyEvent() {
        input.unbindKey(input.KEY.LEFT);
        input.unbindKey(input.KEY.RIGHT);
        input.unbindKey(input.KEY.UP);
        input.unbindKey(input.KEY.DOWN);

        input.unbindKey(input.KEY.A);
        input.unbindKey(input.KEY.D);
        input.unbindKey(input.KEY.W);
        input.unbindKey(input.KEY.S);

        input.unbindKey(input.KEY.R);
    }
}

export default PlayScreen;