import { Renderable } from "melonjs";
import { isWall, TILE_SIZE } from "../maze";
import gameState from "../game-state";
import PlayerEntity from "./player";

type Direction = {
    x: number;
    y: number;
};

class GhostEntity extends Renderable {
    private tileX = 9;
    private tileY = 10;

    private moveTimer = 0;
    private readonly moveDelay = 220;

    private player: PlayerEntity;

    constructor(player: PlayerEntity) {
        super(
            9 * TILE_SIZE,
            10 * TILE_SIZE,
            TILE_SIZE,
            TILE_SIZE
        );

        this.player = player;
        this.anchorPoint.set(0, 0);
        this.alwaysUpdate = true;
    }

    override update(dt: number): boolean {
        if (gameState.gameOver || gameState.gameWon) {
            return false;
        }

        // Check whether Pac-Man moved onto the ghost
        this.checkCollision();

        if (gameState.gameOver) {
            return true;
        }

        this.moveTimer += dt;

        if (this.moveTimer >= this.moveDelay) {
            this.moveTimer = 0;
            this.moveTowardPlayer();

            // Check whether the ghost moved onto Pac-Man
            this.checkCollision();
        }

        return true;
    }

    private checkCollision(): void {
        if (
            this.tileX === this.player.getTileX() &&
            this.tileY === this.player.getTileY()
        ) {
            gameState.gameOver = true;
        }
    }

    private moveTowardPlayer(): void {
        const targetX = this.player.getTileX();
        const targetY = this.player.getTileY();

        const directions: Direction[] = [
            { x: 0, y: -1 },
            { x: 0, y: 1 },
            { x: -1, y: 0 },
            { x: 1, y: 0 }
        ];

        const queue: {
            x: number;
            y: number;
            firstStep: Direction | null;
        }[] = [
            {
                x: this.tileX,
                y: this.tileY,
                firstStep: null
            }
        ];

        const visited = new Set<string>();
        visited.add(`${this.tileX},${this.tileY}`);

        while (queue.length > 0) {
            const current = queue.shift();

            if (!current) {
                break;
            }

            if (current.x === targetX && current.y === targetY) {
                if (current.firstStep) {
                    this.tileX += current.firstStep.x;
                    this.tileY += current.firstStep.y;

                    this.pos.x = this.tileX * TILE_SIZE;
                    this.pos.y = this.tileY * TILE_SIZE;
                }

                return;
            }

            for (const direction of directions) {
                const nextX = current.x + direction.x;
                const nextY = current.y + direction.y;
                const key = `${nextX},${nextY}`;

                if (!isWall(nextX, nextY) && !visited.has(key)) {
                    visited.add(key);

                    queue.push({
                        x: nextX,
                        y: nextY,
                        firstStep: current.firstStep ?? direction
                    });
                }
            }
        }
    }

    override draw(renderer: any): void {
        const x = this.pos.x;
        const y = this.pos.y;

        // Red ghost body
        renderer.setColor("#FF0000");
        renderer.fillArc(
            x + TILE_SIZE / 2,
            y + TILE_SIZE / 2,
            TILE_SIZE / 2 - 2,
            Math.PI,
            Math.PI * 2
        );

        renderer.fillRect(
            x + 2,
            y + TILE_SIZE / 2,
            TILE_SIZE - 4,
            TILE_SIZE / 2 - 2
        );

        // White eyes
        renderer.setColor("#FFFFFF");
        renderer.fillArc(
            x + 8,
            y + 10,
            3,
            0,
            Math.PI * 2
        );

        renderer.fillArc(
            x + 16,
            y + 10,
            3,
            0,
            Math.PI * 2
        );

        // Blue pupils
        renderer.setColor("#0000FF");
        renderer.fillArc(
            x + 8,
            y + 10,
            1.5,
            0,
            Math.PI * 2
        );

        renderer.fillArc(
            x + 16,
            y + 10,
            1.5,
            0,
            Math.PI * 2
        );
    }
}

export default GhostEntity;