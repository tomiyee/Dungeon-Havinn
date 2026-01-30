import { Box } from "@mui/material";
import { type ItemStack } from "../classes/ItemStack";
import { ItemStackDisplay } from "./ItemStackDisplay";
import { useDroppable } from "@dnd-kit/core";
import { useMemo } from "react";
import type { DroppableData } from "../constants/droppableData";
import type { CSSProperties } from "@mui/material/styles";
import { ITEM_STACK_WIDTH } from "../constants/items";


type ItemSlotProps = {
  /** Needs to be globally unique */
  slotId: string;
  itemStack: ItemStack;
  setItemStack: (itemStack: ItemStack) => void;
  maxCapacity?: number;
}

export const ItemSlot = (props: ItemSlotProps) => {
  const { slotId, itemStack, setItemStack, maxCapacity } = props;

  const droppableData: DroppableData = useMemo(() => ({
    itemStack,
    setItemStack,
    maxCapacity
  }), [itemStack, setItemStack, maxCapacity]);

  const { setNodeRef, active } = useDroppable({ id: slotId, data: droppableData });

  const isDragging = active !== null;

  return <Box sx={[styles.itemSlot, isDragging && styles.itemSlotHovered]} ref={setNodeRef}>
    <ItemStackDisplay
      itemStack={itemStack}
      setItemStack={setItemStack}
    />
  </Box>;
}

const styles: Record<string, CSSProperties> = {
  itemSlot: {
    width: `${ITEM_STACK_WIDTH}px`,
    height: `${ITEM_STACK_WIDTH}px`,
    border: "2px dashed #0000",
  },
  itemSlotHovered: {
    border: "2px dashed #000",
  }
}