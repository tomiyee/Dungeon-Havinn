import { ItemSlot } from './ItemSlot';
import { useDungeonHavinnStore, type DungeonHavinnState } from '../store';
import useSound from 'use-sound';
import knifeSound1 from '../assets/sounds/knife-throw-1.mp3';
import knifeSound2 from '../assets/sounds/knife-throw-2.mp3';
import { isDefined } from '../utils';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import type { ItemStack } from '../classes/ItemStack';
import { ItemId } from '../constants/items';

const selectCuttingBoardSlot = (state: DungeonHavinnState) => state.cuttingBoard;

const increaseChopProgress = () => {
  const currentItem = useDungeonHavinnStore.getState().cuttingBoard;
  useDungeonHavinnStore.setState(() => ({
    cuttingBoard: {
      ...currentItem,
      item:
        currentItem.item === null
          ? null
          : {
              ...currentItem.item,
              choppedProgress: Math.min(100, (currentItem.item?.choppedProgress || 0) + 10),
            },
    },
  }));
};

export const CuttingBoard: React.FC = () => {
  const cuttingBoardSlot = useDungeonHavinnStore(selectCuttingBoardSlot);
  const hasItem = cuttingBoardSlot.item !== null && cuttingBoardSlot.quantity > 0;

  const [playKnifeSound1] = useSound(knifeSound1);
  const [playKnifeSound2] = useSound(knifeSound2);

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
          if (Math.random() > 0.5) playKnifeSound1({});
          else playKnifeSound2();
          increaseChopProgress();
        }}
      >
        Chop
      </Button>
    </Box>
  );
};

const NOT_CHOPPABLE_ITEMS = new Set<ItemId>([ItemId.CAMPFIRE_POT, ItemId.BOWL_OF_SOUP]);

const itemCanBeChopped = (itemStack: ItemStack): boolean => {
  const item = itemStack.item;
  if (item === null) return false;
  return !NOT_CHOPPABLE_ITEMS.has(item.itemId);
};
