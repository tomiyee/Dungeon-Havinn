import { create } from 'zustand';
import { ItemId } from './constants/items';
import { type ItemStack, ItemStackUtils } from './classes/ItemStack';
import { ItemUtils } from './classes/Item';
import { RecipeUtils, type Recipe, type RecipeStep } from './classes/Recipe';

export interface DungeonHavinnState {
  customItemNames: Record<ItemId, string | null>;
  pantry: ItemStack[];
  cuttingBoard: ItemStack;
  campfirePot: ItemStack;
  campfirePotActiveRecipe: Recipe;
  waterSpoutSlot: ItemStack;
  /** Integer from 0 - 10 */
  satiation: number;
  actions: {
    setCubby: (cubbyIndex: number, itemStack: ItemStack) => void;
    setCuttingBoard: (itemStack: ItemStack) => void;
    addRecipeStep: (recipeStep: RecipeStep) => void;
    /**
     * The amount of heat to add to the active recipe
     * @param heatDuration A number from 0-100
     */
    heatRecipe: (heatDuration: number) => void;
  };
}

/** Zustand store */
export const useDungeonHavinnStore = create<DungeonHavinnState>((set) => ({
  satiation: 0,
  customItemNames: {
    [ItemId.MUSHROOM]: 'Mushroom',
    [ItemId.ONION]: 'Onion',
    [ItemId.GARLIC]: 'Garlic',
    [ItemId.CAMPFIRE_POT]: null,
    [ItemId.BOWL_OF_SOUP]: null,
  },

  waterSpoutSlot: ItemStackUtils.newEmpty(),

  campfirePot: ItemStackUtils.new(ItemUtils.new(ItemId.CAMPFIRE_POT)),
  campfirePotActiveRecipe: RecipeUtils.new(),

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
    addRecipeStep(recipeStep: RecipeStep) {
      set((state) => ({
        campfirePotActiveRecipe: [...state.campfirePotActiveRecipe, recipeStep],
      }));
    },
    heatRecipe(heatDuration: number) {
      set((state) => {
        const newRecipeState = structuredClone(state.campfirePotActiveRecipe);
        const lastRecipeStep = newRecipeState.at(-1);
        // Add to the existing heat step if it exists and is last, otherwise create a new heat step
        if (lastRecipeStep?.type !== 'heat') {
          newRecipeState.push({ type: 'heat', heatDuration });
        } else {
          lastRecipeStep.heatDuration += heatDuration;
        }
        return { campfirePotActiveRecipe: newRecipeState };
      });
    },
  },
}));

export const storeActions = useDungeonHavinnStore.getState().actions;
