import { create } from "zustand";
import { ItemId } from "./constants/items";
import { type ItemStack, ItemStackUtils } from "./classes/ItemStack";
import { ItemUtils } from "./classes/Item";

export interface DungeonHavinnState {
  customItemNames: Record<ItemId, string>;
  pantry: ItemStack[];
}

/** Zustand store */
export const useDungeonHavinnStore = create<DungeonHavinnState>(() => ({
  customItemNames: {
    [ItemId.MUSHROOM]: 'Mushroom',
    [ItemId.ONION]: 'Onion',
    [ItemId.GARLIC]: 'Garlic',
  },

  pantry: [
    ItemStackUtils.new(ItemUtils.new(ItemId.MUSHROOM), 3),
    ItemStackUtils.new(ItemUtils.new(ItemId.MUSHROOM), 3),
    ItemStackUtils.new(ItemUtils.new(ItemId.ONION), 5),
    ItemStackUtils.newEmpty(),
    ItemStackUtils.newEmpty(),
    ItemStackUtils.newEmpty(),
    ItemStackUtils.newEmpty(),
    ItemStackUtils.newEmpty(),
  ],
}));
