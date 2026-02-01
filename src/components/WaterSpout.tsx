import { useCallback } from "react"
import { ItemUtils } from "../classes/Item"
import { EMPTY_ITEM_STACK, ItemStackUtils, type ItemStack } from "../classes/ItemStack"
import { noop } from "../utils"
import { ItemSlot } from "./ItemSlot"
import { Box } from "@mui/material"
import waterSpoutSource from "../assets/water_tap.png";
import waterFaucetSound from "../assets/sounds/faucet.mp3";
import useSound from "use-sound"



export const WaterSpout = () => {
  const [playSound] = useSound(waterFaucetSound, { volume: 0.4 })

  const canReceiveItems = useCallback((itemStack: ItemStack) => ItemUtils.isWashable(itemStack.item), [])

  return (
    <Box display='flex' flexDirection="column" gap={2}>
      <img src={waterSpoutSource} width={80} />
      <ItemSlot
        slotId={"water-spout"}
        itemStack={EMPTY_ITEM_STACK}
        canReceiveItems={canReceiveItems}
        combineItems={(sourceStack, targetStack) => {
          if (!canReceiveItems(sourceStack)) {
            return null;
          }
          playSound();
          return {
            remainingStack: ItemStackUtils.addWater(sourceStack),
            resultStack: targetStack
          }
        }}
        setItemStack={noop} />
    </Box>)
}