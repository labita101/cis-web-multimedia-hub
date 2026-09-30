import { Renderable } from "melonjs";
import { COLS, MAZE, ROWS, TILE_SIZE } from "../maze";

class MazeRenderer extends Renderable {
    constructor() {
    super(0, 0, COLS * TILE_SIZE, ROWS * TILE_SIZE);

    // Position the maze from its top-left corner
    this.anchorPoint.set(0, 0);
}

    draw(renderer: any) {
        for (let row = 0; row < ROWS; row++) {
            for (let column = 0; column < COLS; column++) {
                const tile = MAZE[row][column];
                const x = column * TILE_SIZE;
                const y = row * TILE_SIZE;

                if (tile === 1) {
                    // Draw a blue wall
                    renderer.setColor("#1919A6");
                    renderer.fillRect(x, y, TILE_SIZE, TILE_SIZE);

                    // Add a darker center to make the walls look outlined
                    renderer.setColor("#050530");
                    renderer.fillRect(
                        x + 3,
                        y + 3,
                        TILE_SIZE - 6,
                        TILE_SIZE - 6
                    );
                } else if (tile === 0) {
                    // Draw a small food dot
                    renderer.setColor("#FFB897");
                    renderer.fillRect(
                        x + TILE_SIZE / 2 - 2,
                        y + TILE_SIZE / 2 - 2,
                        4,
                        4
                    );
                }
            }
        }
    }
}

export default MazeRenderer;