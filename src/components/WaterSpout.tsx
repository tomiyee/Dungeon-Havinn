import { ItemUtils } from '../classes/Item';
import { ItemStackUtils, type ItemStack } from '../classes/ItemStack';
import { ItemSlot } from './ItemSlot';
import waterSpoutSource from '../assets/water_tap.png';
import waterFaucetSound from '../assets/sounds/faucet.mp3';
import useSound from 'use-sound';
import Box from '@mui/material/Box';
import { useDungeonHavinnStore } from '../store';

export const WaterSpout = () => {
  const [playSound] = useSound(waterFaucetSound, { volume: 0.4 });

  const waterSpoutItem = useDungeonHavinnStore((state) => state.waterSpoutSlot);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <img src={waterSpoutSource} width={80} />
      <ItemSlot
        slotId="water-spout"
        itemStack={waterSpoutItem}
        setItemStack={(itemStack) => useDungeonHavinnStore.setState({ waterSpoutSlot: itemStack })}
        canReceiveItems={itemStackIsWashable}
        combineItems={(sourceStack) => {
          if (!itemStackIsWashable(sourceStack)) {
            return null;
          }
          const { remainingStack, resultStack } = ItemStackUtils.splitStack(sourceStack, 1);

          playSound();
          return {
            remainingStack: remainingStack,
            resultStack: ItemStackUtils.addWater(resultStack),
          };
        }}
      />
    </Box>
  );
};

const itemStackIsWashable = (itemStack: ItemStack) => ItemUtils.isWashable(itemStack.item);
