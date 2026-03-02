import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import './App.css';
import { Pantry } from './components/Pantry/Pantry';
import type { DroppableData } from './constants/droppableData';
import type { DraggableData } from './constants/draggableData';
import { ItemStackUtils } from './classes/ItemStack';
import { CuttingBoard } from './components/CuttingBoard';
import { Credits } from './components/Credits';
import { CampfirePot } from './components/CampfirePot/CampfirePot';
import { WaterSpout } from './components/WaterSpout';
import { LittleChef } from './components/LittleChef';
import Box from '@mui/material/Box';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

function App() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // pixels before drag starts
      },
    }),
  );

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors} modifiers={[restrictToWindowEdges]}>
      <Box sx={styles.gameViewport}>
        <Box sx={styles.cookingScreen}>
          <Pantry />
          <CuttingBoard />
          <CampfirePot />
          <WaterSpout />
        </Box>
      </Box>
      <LittleChef />
      <Credits />
    </DndContext>
  );
}

export default App;

const styles = {
  gameViewport: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    padding: 2,
  },
  cookingScreen: {
    display: 'flex',
    width: 'fit-content',
    alignItems: 'end',
    border: '2px solid black',
    padding: 2,
  },
};

const handleDragEnd = (event: DragEndEvent) => {
  if (!event.over) {
    return;
  }

  const activeData = event.active.data.current as DraggableData | undefined;
  const dropData = event.over.data.current as DroppableData | undefined;

  if (dropData === undefined) {
    console.warn('No drop data');
    return;
  }
  if (activeData === undefined) {
    console.warn('No active data');
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
};
