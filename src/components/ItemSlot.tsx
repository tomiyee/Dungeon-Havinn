import { Box, type SxProps } from "@mui/material";
import { type ItemStack } from "../classes/ItemStack";
import { ItemStackDisplay } from "./ItemStackDisplay";
import { useDroppable } from "@dnd-kit/core";
import { useMemo } from "react";
import type { DroppableData } from "../constants/droppableData";


type ItemSlotProps = {
  /** Needs to be globally unique */
  slotId: string;
  itemStack: ItemStack;
  setItemStack: (itemStack: ItemStack) => void;
}

export const ItemSlot = (props: ItemSlotProps) => {
  const { slotId, itemStack, setItemStack } = props;

  const droppableData: DroppableData = useMemo(() => ({
    itemStack,
    setItemStack
  }), [itemStack, setItemStack]);

  const { setNodeRef } = useDroppable({ id: slotId, data: droppableData });

  return <Box sx={styles.itemSlot} ref={setNodeRef}>
    <ItemStackDisplay
      itemStack={itemStack}
      setItemStack={setItemStack}
    />
  </Box>;
}

const styles: Record<string, SxProps> = {
  itemSlot: {
    width: "80px",
    height: "80px",
  }
}