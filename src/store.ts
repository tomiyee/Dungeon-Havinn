import { create } from 'zustand';
import { ItemId } from './constants/items';
import { type ItemStack, ItemStackUtils } from './classes/ItemStack';
import { ItemUtils } from './classes/Item';

export interface DungeonHavinnState {
  customItemNames: Record<ItemId, string | null>;
  pantry: ItemStack[];
  cuttingBoard: ItemStack;
  campfirePotSlot: ItemStack;
  waterSpoutSlot: ItemStack;
  /** Integer from 0 - 10 */
  satiation: number;
  actions: {
    setCubby: (cubbyIndex: number, itemStack: ItemStack) => void;
    setCuttingBoard: (itemStack: ItemStack) => void;
    /**
     * The amount of heat to add to the active recipe
     * @param heatDuration A number from 0-100
     */
    heatRecipe: (heatDuration: number) => void;
  };
}

/** Zustand store */
export const useDungeonHavinnStore = create<DungeonHavinnState>((set, get) => ({
  satiation: 0,
  customItemNames: {
    [ItemId.MUSHROOM]: 'Mushroom',
    [ItemId.ONION]: 'Onion',
    [ItemId.GARLIC]: 'Garlic',
    [ItemId.CAMPFIRE_POT]: null,
    [ItemId.BOWL]: 'Bowl',
  },

  waterSpoutSlot: ItemStackUtils.newEmpty(),

  campfirePotSlot: ItemStackUtils.new(ItemUtils.new(ItemId.CAMPFIRE_POT)),

  pantry: [
    ItemStackUtils.new(ItemUtils.new(ItemId.MUSHROOM), 3),
    ItemStackUtils.new(ItemUtils.new(ItemId.MUSHROOM), 3),
    ItemStackUtils.new(ItemUtils.new(ItemId.ONION), 5),
    ItemStackUtils.newEmpty(),
    ItemStackUtils.newEmpty(),
    ItemStackUtils.newEmpty(),
    ItemStackUtils.newEmpty(),
    ItemStackUtils.new(ItemUtils.new(ItemId.BOWL), 1),
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
    heatRecipe(heatDuration: number) {
      const currentCampfireItem = get().campfirePotSlot.item;
      if (currentCampfireItem?.itemId !== ItemId.CAMPFIRE_POT) {
        return;
      }
      set((state) => {
        const currentRecipeState = currentCampfireItem.recipe;
        const newRecipeState = structuredClone(currentRecipeState ?? []);
        const lastRecipeStep = newRecipeState.at(-1);
        // Add to the existing heat step if it exists and is last, otherwise create a new heat step
        if (lastRecipeStep?.type !== 'heat') {
          newRecipeState.push({ type: 'heat', heatDuration });
        } else {
          lastRecipeStep.heatDuration += heatDuration;
        }
        return {
          campfirePotSlot: {
            ...state.campfirePotSlot,
            item:
              state.campfirePotSlot.item === null
                ? null
                : { ...state.campfirePotSlot.item, recipe: newRecipeState },
          },
        };
      });
    },
  },
}));

export const storeActions = useDungeonHavinnStore.getState().actions;
