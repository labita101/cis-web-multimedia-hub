# Week 3: Pac-Man Canvas and melonJS

## Project Overview

This project demonstrates the transition from Scratch-style game logic to browser-based JavaScript and melonJS.

The webpage contains two rendering systems:

- A custom HTML5 Canvas Pac-Man simulation
- A melonJS engine view with Menu and Play states

## Features

- Responsive dual-rendering layout
- Pac-Man drawn dynamically with the Canvas API
- Four-direction arrow-key movement
- Live X and Y coordinate display
- Boundary-constrained movement
- Delta-time-based updates
- melonJS Menu and Play states
- Asynchronous asset preloading through `resources.js`
- Production build through Vite

## Controls

- **Arrow keys:** Move Pac-Man
- **Enter:** Open the melonJS Play state
- **Escape:** Return to the melonJS Menu state

## Run Locally

```bash
npm install
npm run dev
```

Create and preview a production build:

```bash
npm run build
npm run preview
```

## Important Files

- `index.html`: Contains both rendering areas
- `src/index.ts`: Initializes melonJS and preloads resources
- `src/scripts/canvas-pacman.ts`: Controls Canvas Pac-Man
- `src/scripts/stage/title.ts`: melonJS Menu state
- `src/scripts/stage/play.ts`: melonJS Play state
- `src/resources.js`: Asset preloader registry
- `src/index.css`: Responsive page styling