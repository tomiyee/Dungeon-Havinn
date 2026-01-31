import type { ItemStack, ItemStackUtils } from "../classes/ItemStack";


export type DroppableData = {
  itemStack: ItemStack;
  setItemStack: (itemStack: ItemStack) => void;
  canReceiveItemStack: (itemStack: ItemStack) => boolean;
  combineItems?: typeof ItemStackUtils.combine;
  maxCapacity?: number;
};