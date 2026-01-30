import type { ItemStack } from "../classes/ItemStack";

export type DraggableData = {
  itemStack: ItemStack;
  setItemStack: (itemStack: ItemStack) => void;
}