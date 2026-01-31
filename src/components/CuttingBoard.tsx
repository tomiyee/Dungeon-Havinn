import { Box, Button } from "@mui/material";
import { ItemSlot } from "./ItemSlot";
import { useDungeonHavinnStore, type DungeonHavinnState } from "../store";
import useSound from "use-sound";
import knifeSound1 from "../assets/sounds/knife-throw-1.mp3";
import knifeSound2 from "../assets/sounds/knife-throw-2.mp3";

const selectCuttingBoardSlot = (state: DungeonHavinnState) => state.cuttingBoard;

const increaseChopProgress = () => {
  const currentItem = useDungeonHavinnStore.getState().cuttingBoard;
  useDungeonHavinnStore.setState(() => ({
    cuttingBoard: {
      ...currentItem,
      item: currentItem.item === null ? null : {
        ...currentItem.item,
        choppedProgress: Math.min(100, (currentItem.item?.choppedProgress || 0) + 5)
      }
    }
  }))
}


export const CuttingBoard: React.FC = () => {
  const cuttingBoardSlot = useDungeonHavinnStore(selectCuttingBoardSlot);
  const hasItem = cuttingBoardSlot.item !== null && cuttingBoardSlot.quantity > 0;

  const [playKnifeSound1] = useSound(knifeSound1)
  const [playKnifeSound2] = useSound(knifeSound2)

  return <Box flexDirection={'column'} display='flex' alignItems='center' gap={1} padding={1}>
    <ItemSlot
      slotId="cutting-board"
      itemStack={cuttingBoardSlot}
      setItemStack={(itemStack) => useDungeonHavinnStore.setState({ cuttingBoard: itemStack })}
      maxCapacity={1}
    />
    <Box sx={{ width: '100%', height: 10, backgroundColor: 'orange' }} />
    <Button variant='contained' onClick={() => {
      if (!hasItem)
        return;
      if (Math.random() > 0.5)
        playKnifeSound1()
      else
        playKnifeSound2();
      increaseChopProgress();
    }}>Chop</Button>
  </Box>
}