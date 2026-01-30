import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import './App.css';
import { Pantry } from './components/Pantry/Pantry';
import type { DroppableData } from './constants/droppableData';
import type { DraggableData } from './constants/draggableData';
import { ItemStackUtils } from './classes/ItemStack';

function App() {
  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over) {
      return;
    }
    console.log("Yes")

    const activeData = event.active.data.current as DraggableData | undefined;
    const dropData = event.over.data.current as DroppableData | undefined;
    console.log(activeData, dropData);
    if (dropData === undefined) {
      console.warn("No drop data");
      return;
    }
    if (activeData === undefined) {
      console.warn("No active data");
      return;
    }

    const combinedStack = ItemStackUtils.combine(dropData.itemStack, activeData.itemStack);
    console.log("Combined stack:", combinedStack);
    if (combinedStack === null) {
      return;
    }

    activeData.setItemStack(ItemStackUtils.newEmpty());
    dropData.setItemStack(combinedStack);
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
