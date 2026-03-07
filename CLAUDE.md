# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Setup

This is a React + TypeScript + Vite project with the following key dependencies:

- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.4
- @dnd-kit/core 6.3.1 for drag and drop functionality
- @mui/material 7.3.7 for UI components
- Zustand 5.0.10 for state management

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Codebase Structure

The project follows a component-based architecture with:

- `src/App.tsx` - Main application component with DnD context
- `src/components/` - React components organized by feature
- `src/assets/` - Static assets including mushroom.png
- `src/constants/` - Constants and configuration
- `src/hooks/` - Custom React hooks
- `src/store/` - State management with Zustand

The main drag and drop functionality is implemented using @dnd-kit, with the DndContext configured in App.tsx and components using useDraggable for draggable elements.

The CuttingBoard component demonstrates how to create a draggable element with an image asset.

## Testing

Do not test using npm start.
