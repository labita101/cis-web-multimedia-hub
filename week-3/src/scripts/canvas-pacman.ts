type Direction = "right" | "left" | "up" | "down";

export function startCanvasPacman(): void {
   const canvas = document.querySelector<HTMLCanvasElement>("#pacman-canvas")!;
const coordinateX = document.querySelector<HTMLElement>("#coordinate-x")!;
const coordinateY = document.querySelector<HTMLElement>("#coordinate-y")!;

    if (!canvas || !coordinateX || !coordinateY) {
        throw new Error("Canvas Pac-Man elements were not found.");
    }

    const context = canvas.getContext("2d")!;

    if (!context) {
        throw new Error("The browser could not create a 2D canvas context.");
    }

    const player = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 18,
        speed: 180,
        direction: "right" as Direction,
    };

    const activeKeys = new Set<string>();
    const movementKeys = [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
    ];

    window.addEventListener("keydown", (event) => {
        if (movementKeys.includes(event.key)) {
            event.preventDefault();
            activeKeys.add(event.key);
        }
    });

    window.addEventListener("keyup", (event) => {
        if (movementKeys.includes(event.key)) {
            event.preventDefault();
            activeKeys.delete(event.key);
        }
    });

    function update(deltaTime: number): void {
        let velocityX = 0;
        let velocityY = 0;

        if (activeKeys.has("ArrowLeft")) {
            velocityX = -player.speed;
            player.direction = "left";
        } else if (activeKeys.has("ArrowRight")) {
            velocityX = player.speed;
            player.direction = "right";
        } else if (activeKeys.has("ArrowUp")) {
            velocityY = -player.speed;
            player.direction = "up";
        } else if (activeKeys.has("ArrowDown")) {
            velocityY = player.speed;
            player.direction = "down";
        }

        player.x += velocityX * deltaTime;
        player.y += velocityY * deltaTime;

        const border = 10;

        player.x = Math.max(
            player.radius + border,
            Math.min(canvas.width - player.radius - border, player.x),
        );

        player.y = Math.max(
            player.radius + border,
            Math.min(canvas.height - player.radius - border, player.y),
        );

        coordinateX.textContent = Math.round(player.x).toString();
        coordinateY.textContent = Math.round(player.y).toString();
    }

    function drawBackground(): void {
        context.fillStyle = "#000000";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.strokeStyle = "#182cff";
        context.lineWidth = 4;
        context.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

        context.strokeStyle = "rgba(48, 79, 254, 0.2)";
        context.lineWidth = 1;

        for (let x = 40; x < canvas.width; x += 40) {
            context.beginPath();
            context.moveTo(x, 10);
            context.lineTo(x, canvas.height - 10);
            context.stroke();
        }

        for (let y = 40; y < canvas.height; y += 40) {
            context.beginPath();
            context.moveTo(10, y);
            context.lineTo(canvas.width - 10, y);
            context.stroke();
        }

        context.fillStyle = "#ffffff";

        for (let x = 50; x < canvas.width - 30; x += 50) {
            context.beginPath();
            context.arc(x, 50, 4, 0, Math.PI * 2);
            context.fill();
        }
    }

    function drawPacman(): void {
        let rotation = 0;

        if (player.direction === "down") {
            rotation = Math.PI / 2;
        } else if (player.direction === "left") {
            rotation = Math.PI;
        } else if (player.direction === "up") {
            rotation = Math.PI * 1.5;
        }

        context.save();
        context.translate(player.x, player.y);
        context.rotate(rotation);

        context.fillStyle = "#ffeb00";
        context.beginPath();
        context.moveTo(0, 0);
        context.arc(
            0,
            0,
            player.radius,
            Math.PI * 0.25,
            Math.PI * 1.75,
        );
        context.closePath();
        context.fill();

        context.restore();
    }

    function draw(): void {
        drawBackground();
        drawPacman();
    }

    let previousTime = performance.now();

    function gameLoop(currentTime: number): void {
        const deltaTime = Math.min(
            (currentTime - previousTime) / 1000,
            0.05,
        );

        previousTime = currentTime;

        update(deltaTime);
        draw();

        requestAnimationFrame(gameLoop);
    }

    draw();
    requestAnimationFrame(gameLoop);
}