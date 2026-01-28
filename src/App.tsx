import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import './App.css'
import { Pantry } from './components/Pantry/Pantry'
import type { DroppableData } from './constants/droppableData';
import type { DraggableData } from './constants/draggableData';
import { useSetCubby } from './hooks/useSetCubby';
import { ItemStackUtils } from './classes/ItemStack';
import { useDungeonHavinnStore } from './store';

function App() {
  const setCubbyState = useSetCubby();
  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over) {
      return;
    }
    const activeData = event.active.data.current as DraggableData | undefined;
    const dropData = event.over.data.current as DroppableData | undefined;

    if (dropData === undefined) {
      console.warn("No drop data");
      return;
    }
    if (activeData === undefined) {
      console.warn("No active data");
      return;
    }

    switch (dropData.type) {
      case 'pantry-cubby': {
        const cubbyStack = useDungeonHavinnStore.getState().pantry[dropData.cubbyIndex];
        const activeStack = activeData.itemStack;
        // Ignore dropping onto self
        if (activeStack.stackId === cubbyStack.stackId) {
          return;
        }
        const combinedStack = ItemStackUtils.combine(cubbyStack, activeStack);
        if (combinedStack === null) {
          return;
        }
        setCubbyState(dropData.cubbyIndex, combinedStack);
        activeData.onMoved();
        break;
      }
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div >
        <Pantry />
      </div>
    </DndContext>
  )
}

export default App;
