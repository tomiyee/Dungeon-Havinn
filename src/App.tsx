import './App.css';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Credits } from './components/Credits';
import { DraggableItem } from './components/DraggableImage';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants';
import { useGameStore } from './store';
import { ItemUtils } from './utils/ItemUtils';
import { ItemId } from './constants/ItemId';

const SPAWN_BOUNDS = {
  minX: 50,
  maxX: 350,
  minY: 50,
  maxY: 250,
};

const CANVAS_STYLE = {
  position: 'relative' as const,
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  border: '2px solid gray',
  overflow: 'hidden',
};

/**
 * Main application component
 * Manages drag and drop functionality and image positioning using Zustand store
 */
export default function App() {
  const objects = useGameStore((state) => state.objects);

  const updateObject = useGameStore((state) => state.updateObject);

  const handleAddImage = () => {
    const newX = Math.random() * (SPAWN_BOUNDS.maxX - SPAWN_BOUNDS.minX) + SPAWN_BOUNDS.minX;
    const newY = Math.random() * (SPAWN_BOUNDS.maxY - SPAWN_BOUNDS.minY) + SPAWN_BOUNDS.minY;

    useGameStore.getState().addItem(ItemUtils.newItem(ItemId.MUSHROOM, { x: newX, y: newY }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta, active } = event;

    // Update the position of the dragged object
    if (active.id) {
      const id = active.id.toString();
      updateObject(id, {
        x: objects[id]?.position.x + delta.x,
        y: objects[id]?.position.y + delta.y,
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Box style={CANVAS_STYLE}>
        {Object.entries(objects).map(([id, item]) => (
          <DraggableItem key={id} item={item} position={item.position} />
        ))}
      </Box>
      <Button onClick={handleAddImage}>+ Add Mushroom</Button>
      <Credits />
    </DndContext>
  );
}

// Export the main App component as a named export
export { default as App } from './App';
