import { input, Text } from "melonjs";
import gameState from "../game-state";
import PlayerEntity from "./player";

class ScoreDisplay extends Text {
    private player: PlayerEntity;

    constructor(player: PlayerEntity) {
        super(12, 540, {
            font: "Arial",
            size: 16,
            fillStyle: "#FFFFFF",
            text: "SCORE: 0",
            textAlign: "left",
            textBaseline: "top"
        });

        this.player = player;
        this.anchorPoint.set(0, 0);
        this.floating = true;
        this.alwaysUpdate = true;
    }

    override update(): boolean {
        if (
            (gameState.gameOver || gameState.gameWon) &&
            input.isKeyPressed("restart")
        ) {
            window.location.reload();
            return true;
        }

        if (gameState.gameOver) {
            this.setText(
                `GAME OVER! SCORE: ${gameState.score} — PRESS R TO RESTART`
            );
        } else if (gameState.gameWon) {
            this.setText(
                `YOU WIN! SCORE: ${gameState.score} — PRESS R TO RESTART`
            );
        } else {
            this.setText(
                `SCORE: ${gameState.score}   X: ${this.player.getTileX()}   Y: ${this.player.getTileY()}`
            );
        }

        return true;
    }
}

export default ScoreDisplay;