import { useCallback } from "react"
import { ItemUtils } from "../classes/Item"
import { EMPTY_ITEM_STACK, ItemStackUtils, type ItemStack } from "../classes/ItemStack"
import { noop } from "../utils"
import { ItemSlot } from "./ItemSlot"




export const WaterSpout = () => {


  const canReceiveItems = useCallback((itemStack: ItemStack) => ItemUtils.isWashable(itemStack.item), [])

  return <ItemSlot
    slotId={"water-spout"}
    itemStack={EMPTY_ITEM_STACK}
    canReceiveItems={canReceiveItems}
    combineItems={(sourceStack, targetStack) => {
      if (!canReceiveItems(sourceStack)) {
        return null;
      }
      return {
        remainingStack: ItemStackUtils.addWater(sourceStack),
        resultStack: targetStack
      }
    }}
    setItemStack={noop} />
}