import { ItemUtils } from '../classes/Item';
import { ItemStackUtils, type ItemStack } from '../classes/ItemStack';
import { ItemSlot } from './ItemSlot';
import waterSpoutSource from '../assets/water_tap.png';
import waterFaucetSound from '../assets/sounds/faucet.mp3';
import useSound from 'use-sound';
import Box from '@mui/material/Box';
import { useDungeonHavinnStore } from '../store';
import { useCallback } from 'react';

/**
 * WaterSpout component that allows players to wash items with water.
 * This component displays a water spout icon and an item slot where players can place items
 * that can be washed. When an item is placed in the slot and the player interacts with it,
 * the item gets washed (water is added to it) using the combineItems function.
 *
 * The component uses a sound effect when items are washed and maintains state for the
 * current item in the water spout slot.
 */
export const WaterSpout = () => {
  const [playSound] = useSound(waterFaucetSound, { volume: 0.4 });

  const waterSpoutItem = useDungeonHavinnStore((state) => state.waterSpoutSlot);

  const combineItems = useCallback(
    (sourceStack: ItemStack) => {
      if (!itemStackIsWashable(sourceStack)) {
        return null;
      }
      const { remainingStack, resultStack } = ItemStackUtils.splitStack(sourceStack, 1);

      playSound();
      return {
        remainingStack: remainingStack,
        resultStack: ItemStackUtils.addWater(resultStack),
      };
    },
    [playSound],
  );

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <img src={waterSpoutSource} width={80} />
      <ItemSlot
        slotId="water-spout"
        itemStack={waterSpoutItem}
        setItemStack={setItemStack}
        canReceiveItems={itemStackIsWashable}
        combineItems={combineItems}
      />
    </Box>
  );
};

const setItemStack = (itemStack: ItemStack) =>
  useDungeonHavinnStore.setState({ waterSpoutSlot: itemStack });
const itemStackIsWashable = (itemStack: ItemStack) => ItemUtils.isWashable(itemStack.item);
