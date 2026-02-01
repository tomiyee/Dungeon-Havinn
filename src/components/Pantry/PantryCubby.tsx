import { Box } from "@mui/material";
import { type ItemStack } from "../../classes/ItemStack";
import { ItemSlot } from "../ItemSlot";
import type { CSSProperties } from "react";
import { storeActions } from "../../store";

const NUM_COLS = 2;

type PantryCubbyProps = {
  itemStack: ItemStack;
  /** Determines the ID and the position in the Pantry */
  cubbyIndex: number;
}

export const PantryCubby: React.FC<PantryCubbyProps> = (props) => {
  const { itemStack, cubbyIndex } = props;

  const row = Math.floor(cubbyIndex / NUM_COLS);
  const col = cubbyIndex % NUM_COLS;



  return <Box sx={[styles.cubby, { top: 20 + 110 * row, left: 40 + col * 120 }]}>
    <ItemSlot
      slotId={`pantry-cubby-${cubbyIndex}`}
      itemStack={itemStack}
      setItemStack={(newStack) => storeActions.setCubby(cubbyIndex, newStack)}
    />
  </Box>;
}

const styles = {
  cubby: {
    position: "absolute"
  }
} satisfies Record<string, CSSProperties>
