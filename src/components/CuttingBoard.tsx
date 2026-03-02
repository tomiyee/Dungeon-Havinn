import { ItemSlot } from './ItemSlot';
import { useDungeonHavinnStore, type DungeonHavinnState } from '../store';
import useSound from 'use-sound';
import knifeSound1 from '../assets/sounds/knife-throw-1.mp3';
import knifeSound2 from '../assets/sounds/knife-throw-2.mp3';
import { isDefined } from '../utils';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ItemStackUtils, type ItemStack } from '../classes/ItemStack';
import { STATIC_ITEM_PROPERTIES } from '../constants/items';
import { useCallback } from 'react';
import type { Item } from '../classes/Item';
import { ItemTag } from '../constants/ItemTag';

const selectCuttingBoardSlot = (state: DungeonHavinnState) => state.cuttingBoard;

export const CuttingBoard: React.FC = () => {
  const cuttingBoardSlot = useDungeonHavinnStore(selectCuttingBoardSlot);
  const hasItem = cuttingBoardSlot.item !== null && cuttingBoardSlot.quantity > 0;

  const playChopSound = usePlayChopSound();

  return (
    <Box flexDirection="column" display="flex" alignItems="center" gap={1} padding={1}>
      <ItemSlot
        slotId="cutting-board"
        itemStack={cuttingBoardSlot}
        canReceiveItems={itemCanBeChopped}
        setItemStack={(itemStack) => useDungeonHavinnStore.setState({ cuttingBoard: itemStack })}
        maxCapacity={1}
      />
      <Box sx={{ width: '100%', height: 10, backgroundColor: 'orange' }} />
      <Button
        variant="contained"
        disabled={!hasItem} // Button is disabled when there is no item
        onClick={() => {
          if (!hasItem) return;
          if (isDefined(cuttingBoardSlot.item) && cuttingBoardSlot.item.choppedProgress >= 100)
            return;
          playChopSound();
          increaseChopProgress();
        }}
      >
        Chop
      </Button>
    </Box>
  );
};

/**
 * @returns A function that plays a random chopping sound effect
 */
const usePlayChopSound = () => {
  const [playKnifeSound1] = useSound(knifeSound1);
  const [playKnifeSound2] = useSound(knifeSound2);

  return useCallback(() => {
    if (Math.random() > 0.5) {
      playKnifeSound1({});
    } else {
      playKnifeSound2();
    }
  }, [playKnifeSound1, playKnifeSound2]);
};

/**
 * Helper function to determine if an item can be chopped on the cutting board
 * @param itemStack The item stack to check
 * @returns true if the item can be chopped, false otherwise
 */
const itemCanBeChopped = (itemStack: ItemStack): boolean => {
  const item = itemStack.item;
  if (item === null) return false;
  const staticProperties = STATIC_ITEM_PROPERTIES[item.itemId];
  return staticProperties.tags.has(ItemTag.CHOPPABLE);
};

const increaseChopProgress = () => {
  const cuttingBoardItemStack = useDungeonHavinnStore.getState().cuttingBoard;
  const addChopProgress = (item: Item) => ({
    ...item,
    choppedProgress: Math.min(100, (cuttingBoardItemStack.item?.choppedProgress || 0) + 10),
  });
  const newCuttingBoardSlot = ItemStackUtils.updateItemInStack(
    cuttingBoardItemStack,
    addChopProgress,
  );
  useDungeonHavinnStore.setState(() => ({ cuttingBoard: newCuttingBoardSlot }));
};
