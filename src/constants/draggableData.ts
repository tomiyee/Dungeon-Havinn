import type { ItemStack } from "../classes/ItemStack";

export type DraggableData = {
  type: 'item-stack';
  itemStack: ItemStack;
  onMoved: () => void;
}