import { useState } from 'react';
import './App.css';
import { DndContext, type DragEndEvent, useSensor, PointerSensor } from '@dnd-kit/core';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Credits } from './components/Credits';
import { DraggableItem } from './components/DraggableItem';
import { CANVAS_WIDTH, CANVAS_HEIGHT, MENU_ITEM_ID } from './constants';
import { useGameStore, type GameState } from './store';
import { ItemUtils } from './utils/ItemUtils';
import { ItemId } from './constants/ItemId';
import type { ActiveDragData } from './types';
import { IngredientMenu } from './components/IngredientMenu';

const CANVAS_STYLE = {
  position: 'relative' as const,
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  border: '2px solid gray',
  overflow: 'hidden',
};

const sensor = useSensor(PointerSensor, {
  activationConstraint: {
    distance: 5, // Minimum drag distance in pixels
  },
});

const objectSelector = (state: GameState) => state.objects;
/**
 * Main application component
 * Manages drag and drop functionality and image positioning using Zustand store
 */
export default function App() {
  const objects = useGameStore(objectSelector);

  const updateObject = useGameStore((state) => state.updateObject);

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta, active } = event;
    const activeDragData: ActiveDragData | undefined = active.data.current;
    const activeItem = activeDragData?.item;
    if (!active.id) return;
    const id = active.id.toString();

    // Special handling for dragging from the menu
    if (activeItem?.id.startsWith(MENU_ITEM_ID)) {
      const finalPosition = {
        x: activeItem.position.x + delta.x,
        y: activeItem.position.y + delta.y,
      };
      const finalItem = { ...activeItem, id: crypto.randomUUID(), position: finalPosition };
      useGameStore.getState().addItem(finalItem);
      return;
    }

    // Update the position of the dragged object
    const item = objects[id];
    if (!item) return;

    // Get the new position after drag
    const newPosition = {
      x: item.position.x + delta.x,
      y: item.position.y + delta.y,
    };

    // Update the dragged object's position
    updateObject(id, newPosition);

    // If the dragged object is the plate, move all overlapping objects by the same delta
    if (item.itemId === ItemId.PLATE) {
      const getOverlappingObjects = useGameStore.getState().getOverlappingObjects;
      const overlappingObjects = getOverlappingObjects(
        item.position.x,
        item.position.y,
        ItemUtils.getItemSize(item),
        ItemUtils.getItemSize(item),
      );

      overlappingObjects.forEach((obj) => {
        if (obj.id !== id) {
          updateObject(obj.id, {
            x: obj.position.x + delta.x,
            y: obj.position.y + delta.y,
          });
        }
      });
    }
  };
  const [ingredientMenuOpen, setIngredientMenuOpen] = useState(false);
  return (
    <DndContext sensors={[sensor]} onDragEnd={handleDragEnd}>
      <Box style={CANVAS_STYLE}>
        {Object.entries(objects).map(([id, item]) => (
          <DraggableItem key={id} item={item} />
        ))}
        {ingredientMenuOpen && <IngredientMenu />}
      </Box>
      <Button onClick={() => setIngredientMenuOpen((prev) => !prev)}>Toggle Ingredient Menu</Button>
      <Credits />
    </DndContext>
  );
}

// Export the main App component as a named export
export { default as App } from './App';
