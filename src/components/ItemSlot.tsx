import { Box } from '@mui/material';
import { ItemStackUtils, type ItemStack } from '../classes/ItemStack';
import { ItemStackDisplay } from './ItemStackDisplay';
import { useDroppable } from '@dnd-kit/core';
import { useMemo } from 'react';
import type { DroppableData } from '../constants/droppableData';
import type { CSSProperties } from '@mui/material/styles';
import { ITEM_STACK_WIDTH, ItemId } from '../constants/items';

/** The rule that most item slots will follow */
const generalSlotRule = (itemStack: ItemStack) => {
  return itemStack.item?.itemId !== ItemId.CAMPFIRE_POT;
};

type ItemSlotProps = {
  /** Needs to be globally unique */
  slotId: string;
  itemStack: ItemStack;
  setItemStack: (itemStack: ItemStack) => void;
  maxCapacity?: number;
  canReceiveItems?: (itemStack: ItemStack) => boolean;
  /** Override of the default behavior for moving a stack onto this item slot */
  combineItems?: typeof ItemStackUtils.combine;
};

export const ItemSlot = (props: ItemSlotProps) => {
  const {
    slotId,
    itemStack,
    setItemStack,
    maxCapacity,
    canReceiveItems = generalSlotRule,
    combineItems,
  } = props;
  const droppableData: DroppableData = useMemo(
    () => ({
      itemStack,
      setItemStack,
      canReceiveItemStack: canReceiveItems,
      combineItems,
      maxCapacity,
    }),
    [itemStack, setItemStack, canReceiveItems, combineItems, maxCapacity],
  );

  const { setNodeRef, active } = useDroppable({
    id: slotId,
    data: droppableData,
  });

  /** True if the currently dragged item can be dropped into this slot */
  const showSlotReceivable = useMemo((): boolean => {
    const isDragging = active !== null;
    const activeData = active?.data.current as DroppableData | undefined;
    if (!isDragging || activeData === undefined) {
      return false;
    }
    return canReceiveItems(activeData.itemStack);
  }, [active, canReceiveItems]);

  const hasItem = itemStack.item !== null && itemStack.quantity > 0;

  return (
    <Box
      ref={setNodeRef}
      sx={[
        styles.itemSlot,
        hasItem && styles.pointer,
        showSlotReceivable && styles.itemSlotHovered,
      ]}
    >
      <ItemStackDisplay itemStack={itemStack} setItemStack={setItemStack} />
    </Box>
  );
};

const styles = {
  itemSlot: {
    width: `${ITEM_STACK_WIDTH}px`,
    height: `${ITEM_STACK_WIDTH}px`,
    border: '2px dashed #0000',
  },
  pointer: {
    cursor: 'pointer',
  },
  itemSlotHovered: {
    border: '2px dashed #000',
  },
} satisfies Record<string, CSSProperties>;
