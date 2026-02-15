import { ItemId } from '../constants/items';
import { assertUnreachable, EMPTY_ARRAY, type EnumOf } from '../utils';
import { ItemUtils, type Item } from './Item';
import { ItemStackUtils, type ItemStack } from './ItemStack';

export const RecipeStepType = {
  INGREDIENT: 'ingredient',
  HEAT: 'heat',
  WATER: 'water',
} as const;

export type RecipeStepType = EnumOf<typeof RecipeStepType>;

export type RecipeStep =
  | {
      type: typeof RecipeStepType.WATER;
    }
  | {
      type: typeof RecipeStepType.INGREDIENT;
      ingredient: Item;
    }
  | {
      type: typeof RecipeStepType.HEAT;
      /** An number on the range 0 to 100 */
      heatDuration: number;
    };

export type Recipe = RecipeStep[];

export class RecipeUtils {
  static new() {
    return EMPTY_ARRAY;
  }

  static getFinalPotState(recipe: Recipe): ItemStack[] {
    if (recipe.length === 0) {
      return EMPTY_ARRAY;
    }
    let watered = false;
    const ingredientStates: Item[] = [];
    for (const recipeStep of recipe) {
      switch (recipeStep.type) {
        case RecipeStepType.INGREDIENT: {
          ingredientStates.push(recipeStep.ingredient);
          continue;
        }
        case RecipeStepType.WATER: {
          watered = true;
          continue;
        }
        case RecipeStepType.HEAT: {
          if (!watered) {
            for (const i in ingredientStates) {
              ingredientStates[i].burnt = true;
            }
          } else {
            for (const i in ingredientStates) {
              ingredientStates[i].boiledProgress += Math.min(recipeStep.heatDuration, 100);
              if (ingredientStates[i].boiledProgress === 100) {
                ingredientStates[i].burnt = true;
              }
            }
          }
          continue;
        }
        default: {
          assertUnreachable(recipeStep);
        }
      }
    }
    return ingredientStates.map((ingredientItem) => ItemStackUtils.new(ingredientItem));
  }

  /**
   * Given the procedure of the recipe
   */
  static getRecipeResult(recipe: Recipe): ItemStack {
    if (recipe.length === 0) {
      return ItemStackUtils.newEmpty();
    }
    // If you heated a pot with no water, create

    return ItemStackUtils.new(ItemUtils.new(ItemId.BOWL_OF_SOUP, recipe));
  }
}
