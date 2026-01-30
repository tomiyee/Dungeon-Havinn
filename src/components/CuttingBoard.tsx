import { Box, Button, LinearProgress } from "@mui/material";
import { ItemSlot } from "./ItemSlot";
import { storeActions, useDungeonHavinnStore, type DungeonHavinnState } from "../store";


const selectCuttingBoardSlot = (state: DungeonHavinnState) => state.cuttingBoard;

const increaseChopProgress = () => {
  const currentItem = useDungeonHavinnStore.getState().cuttingBoard;
  storeActions.setCuttingBoard({
    ...currentItem,
    item: currentItem.item === null ? null : {
      ...currentItem.item,
      choppedProgress: Math.min(100, (currentItem.item?.choppedProgress || 0) + 5)
    }
  })
}

export const CuttingBoard: React.FC = () => {
  const cuttingBoardSlot = useDungeonHavinnStore(selectCuttingBoardSlot);
  const hasItem = cuttingBoardSlot.item !== null && cuttingBoardSlot.quantity > 0;
  return <Box flexDirection={'column'} display='flex' alignItems='center' gap={1} padding={1}>
    <Box height={20} width={"90%"} visibility={hasItem ? 'visible' : 'hidden'}>
      <LinearProgress sx={{ height: 10 }} variant="determinate" value={cuttingBoardSlot.item?.choppedProgress ?? 0} />
    </Box>
    <ItemSlot
      slotId="cutting-board"
      itemStack={cuttingBoardSlot}
      setItemStack={storeActions.setCuttingBoard}
      maxCapacity={1}
    />
    <Box sx={{ width: '100%', height: 10, backgroundColor: 'orange' }} />
    <Button variant='contained' onClick={increaseChopProgress}>Chop</Button>
  </Box>
}