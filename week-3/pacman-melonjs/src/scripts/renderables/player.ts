import { input, Renderable } from "melonjs";
import {
    hasRemainingDots,
    isWall,
    MAZE,
    TILE_SIZE
} from "../maze";
import gameState from "../game-state";

type Direction = {
    x: number;
    y: number;
};

class PlayerEntity extends Renderable {
    private tileX = 9;
    private tileY = 16;

    private currentDirection: Direction = { x: 0, y: 0 };
    private requestedDirection: Direction = { x: 0, y: 0 };

    private moveTimer = 0;
    private readonly moveDelay = 85;

    constructor() {
        super(
            9 * TILE_SIZE,
            16 * TILE_SIZE,
            TILE_SIZE,
            TILE_SIZE
        );

        this.anchorPoint.set(0, 0);
        this.alwaysUpdate = true;
    }

    override update(dt: number): boolean {
if (gameState.gameOver || gameState.gameWon) {
    return false;
}
        this.readKeyboard();

        this.moveTimer += dt;

        if (this.moveTimer >= this.moveDelay) {
            this.moveTimer = 0;
            this.moveOneTile();
        }

        return true;
    }

    private readKeyboard(): void {
        if (input.isKeyPressed("left")) {
            this.requestedDirection = { x: -1, y: 0 };
        }

        if (input.isKeyPressed("right")) {
            this.requestedDirection = { x: 1, y: 0 };
        }

        if (input.isKeyPressed("up")) {
            this.requestedDirection = { x: 0, y: -1 };
        }

        if (input.isKeyPressed("down")) {
            this.requestedDirection = { x: 0, y: 1 };
        }
    }

    private moveOneTile(): void {
        const requestedX = this.tileX + this.requestedDirection.x;
        const requestedY = this.tileY + this.requestedDirection.y;

        // Use the newest requested direction when that path is open
        if (!isWall(requestedX, requestedY)) {
            this.currentDirection = this.requestedDirection;
        }

        const nextX = this.tileX + this.currentDirection.x;
        const nextY = this.tileY + this.currentDirection.y;

        // Stop Pac-Man from entering a wall
        if (isWall(nextX, nextY)) {
            return;
        }

        this.tileX = nextX;
        this.tileY = nextY;

        this.pos.x = this.tileX * TILE_SIZE;
        this.pos.y = this.tileY * TILE_SIZE;

        // Remove a dot when Pac-Man enters its square
        if (MAZE[this.tileY][this.tileX] === 0) {
    MAZE[this.tileY][this.tileX] = 2;
    gameState.addScore(10);
}
    }
getTileX(): number {
    return this.tileX;
}

getTileY(): number {
    return this.tileY;
}

    override draw(renderer: any): void {
    const centerX = this.pos.x + TILE_SIZE / 2;
    const centerY = this.pos.y + TILE_SIZE / 2;

    let facingAngle = 0;

    if (this.currentDirection.x === -1) {
        facingAngle = Math.PI;
    } else if (this.currentDirection.y === -1) {
        facingAngle = -Math.PI / 2;
    } else if (this.currentDirection.y === 1) {
        facingAngle = Math.PI / 2;
    }

    renderer.setColor("#FFFF00");
    renderer.fillArc(
        centerX,
        centerY,
        TILE_SIZE / 2 - 2,
        facingAngle + 0.38,
        facingAngle + Math.PI * 2 - 0.38
    );
}
}

export default PlayerEntity;