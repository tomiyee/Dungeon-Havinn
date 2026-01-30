import type { ItemStack } from "../classes/ItemStack";


export type DroppableData = {
  itemStack: ItemStack;
  setItemStack: (itemStack: ItemStack) => void;
  maxCapacity?: number;
};