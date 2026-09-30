import { Text } from "melonjs";
import gameState from "../game-state";

class StatusDisplay extends Text {
    constructor() {
        super(228, 270, {
            font: "Arial",
            size: 34,
            fillStyle: "#FF0000",
            text: " ",
            textAlign: "center",
            textBaseline: "middle"
        });

        this.anchorPoint.set(0.5, 0.5);
        this.floating = true;
        this.alwaysUpdate = true;
        
    }

    override update(): boolean {
        if (gameState.gameOver) {
            this.setText("GAME OVER!");
        } else if (gameState.gameWon) {
            this.setText("YOU WIN!");
        } else {
            this.setText(" ");
        }

        return true;
    }
}

export default StatusDisplay;