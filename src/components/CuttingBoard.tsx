import { Box } from "@mui/material";
import { ItemSlot } from "./ItemSlot";
import { storeActions, useDungeonHavinnStore, type DungeonHavinnState } from "../store";


const selectCuttingBoardSlot = (state: DungeonHavinnState) => state.cuttingBoard;


export const CuttingBoard: React.FC = () => {
  const cuttingBoardSlot = useDungeonHavinnStore(selectCuttingBoardSlot);
  return <Box flexDirection={'column'} display='flex' alignItems='center'>
    <ItemSlot
      slotId="cutting-board"
      itemStack={cuttingBoardSlot}
      setItemStack={storeActions.setCuttingBoard}
    />
  </Box>
}