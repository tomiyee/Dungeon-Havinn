import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import './App.css';
import { Credits } from './components/Credits';
import Box from '@mui/material/Box';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { CuttingBoard } from './components/CuttingBoard';

function App() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // pixels before drag starts
      },
    }),
  );

  return (
    <DndContext sensors={sensors} modifiers={[restrictToWindowEdges]}>
      <Box sx={styles.gameViewport}>
        <Box sx={styles.cookingScreen}>
          <CuttingBoard />
        </Box>
      </Box>
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
