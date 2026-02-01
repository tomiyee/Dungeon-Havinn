import { create } from 'zustand';
import { ItemId } from './constants/items';
import { type ItemStack, ItemStackUtils } from './classes/ItemStack';
import { ItemUtils } from './classes/Item';

export interface DungeonHavinnState {
  customItemNames: Record<ItemId, string>;
  pantry: ItemStack[];
  cuttingBoard: ItemStack;
  campfirePot: ItemStack;
  actions: {
    setCubby: (cubbyIndex: number, itemStack: ItemStack) => void;
    setCuttingBoard: (itemStack: ItemStack) => void;
  };
}

/** Zustand store */
export const useDungeonHavinnStore = create<DungeonHavinnState>((set) => ({
  customItemNames: {
    [ItemId.MUSHROOM]: 'Mushroom',
    [ItemId.ONION]: 'Onion',
    [ItemId.GARLIC]: 'Garlic',
    [ItemId.CAMPFIRE_POT]: '',
  },

  campfirePot: ItemStackUtils.new(ItemUtils.new(ItemId.CAMPFIRE_POT)),

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

  cuttingBoard: ItemStackUtils.newEmpty(),

  actions: {
    setCubby(cubbyIndex: number, itemStack: ItemStack) {
      set((state) => ({
        pantry: state.pantry.map((cubby, index) => (index === cubbyIndex ? itemStack : cubby)),
      }));
    },
    setCuttingBoard(itemStack: ItemStack) {
      set(() => ({
        cuttingBoard: itemStack,
      }));
    },
  },
}));

export const storeActions = useDungeonHavinnStore.getState().actions;
