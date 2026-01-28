import { useDungeonHavinnStore, type DungeonHavinnState } from "../../store"
import { PantryCubby } from "./PantryCubby"
import type { SxProps } from "@mui/material"
import { Box } from "@mui/system"


const selectPantryState = (state: DungeonHavinnState) => state.pantry

export const Pantry = () => {

  const pantryState = useDungeonHavinnStore(selectPantryState);

  return <Box sx={styles.pantry}>
    {pantryState.map((itemStack, cubbyIndex) => (
      <PantryCubby
        key={cubbyIndex}
        cubbyIndex={cubbyIndex}
        itemStack={itemStack}
      />
    ))}

  </Box>
}

const styles: Record<string, SxProps> = {
  pantry: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    backgroundColor: "orange",
    width: "fit-content",
    padding: 2,
    gap: 1,
  },
}


