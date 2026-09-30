class GameState {
    score = 0;
    gameOver = false;
    gameWon = false;

    reset(): void {
        this.score = 0;
        this.gameOver = false;
        this.gameWon = false;
    }

    addScore(points: number): void {
        this.score += points;
    }
}

const gameState = new GameState();

export default gameState;