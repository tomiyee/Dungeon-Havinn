import type { EnumOf } from '../utils';

export const ItemTag = {
  /** An item that can be chopped on the cutting board */
  CHOPPABLE: 'CHOPPABLE',
  /** An item that can be added to a pot for cooking */
  INGREDIENT: 'INGREDIENT',
  /** An item that can be heated on the campfire */
  HEATABLE: 'HEATABLE',
};

export type ItemTag = EnumOf<typeof ItemTag>;
