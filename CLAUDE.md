# Dungeon Havinn

A React application featuring drag and drop mechanics using @dnd-kit and Material UI.

## Tech Stack

- React 18 + TypeScript
- @dnd-kit/core - Drag and drop
- Material UI - UI components
- Vite - Build tool

## Project Structure

```
src/
├── components/
│   ├── DraggableImage.tsx   # Draggable image with local styles
│   └── Credits.tsx          # Attribution dialog
├── constants/
│   └── index.ts             # Shared constants (CANVAS_WIDTH, CANVAS_HEIGHT)
├── types/
│   └── index.ts             # Shared type definitions
├── App.tsx                  # Main app component
├── main.tsx                 # Entry point
└── utils.ts                 # Utilities
```

## Components

- **App** - Manages drag state and canvas layout
- **DraggableImage** - Individual draggable image
- **Credits** - Modal for asset attribution

## Architecture

- Constants used by only one component are defined locally
- Shared constants (`CANVAS_WIDTH`, `CANVAS_HEIGHT`) remain in `constants/index.ts`
- All components use TypeScript with shared types from `types/index.ts`

## Key Features

- Drag and drop with @dnd-kit
- Dynamic image addition with random positioning
- Credits modal for asset attribution

## Asset Attribution

- Icons: Freepik - freepik.com
- Sound: Pixabay - pixabay.com
- Images: Custom (mushroom.png)