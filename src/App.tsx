import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import './App.css';
import { Pantry } from './components/Pantry/Pantry';
import type { DroppableData } from './constants/droppableData';
import type { DraggableData } from './constants/draggableData';
import { ItemStackUtils } from './classes/ItemStack';
import { Box } from '@mui/material';
import { CuttingBoard } from './components/CuttingBoard';
import { Credits } from './components/Credits';
import { CampfirePot } from './components/CampfirePot';
import { WaterSpout } from './components/WaterSpout';

function App() {
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
    if (!dropData.canReceiveItemStack(activeData.itemStack)) {
      return;
    }

    const combine = dropData.combineItems ?? ItemStackUtils.combine;

    const combinationResult = combine(activeData.itemStack, dropData.itemStack, dropData.maxCapacity);

    if (combinationResult === null) {
      return;
    }
    const { remainingStack, resultStack } = combinationResult;

    activeData.setItemStack(remainingStack);
    dropData.setItemStack(resultStack);
  }
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Box display="flex">
        <Pantry />
        <CuttingBoard />
        <CampfirePot />
        <WaterSpout />
      </Box>
      <Credits />
    </DndContext>
  )
}

export default App;
