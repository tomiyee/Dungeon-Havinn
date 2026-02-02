import { EMPTY_ARRAY, type EnumOf } from '../utils';
import type { Item } from './Item';
import type { ItemStack } from './ItemStack';

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
      heatDuration: number;
    };

export type Recipe = RecipeStep[];

export class RecipeUtils {
  static getFinalPotState(recipe: Recipe): ItemStack[] {
    if (recipe.length === 0) {
      return EMPTY_ARRAY;
    }
    // TODO
    return EMPTY_ARRAY;
  }
}
