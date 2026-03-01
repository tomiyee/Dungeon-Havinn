import type { EnumOf } from '../utils';

export const ITEM_STACK_WIDTH = 80;

export const ItemId = {
  MUSHROOM: 'MUSHROOM',
  ONION: 'ONION',
  GARLIC: 'GARLIC',
  // Special Items
  CAMPFIRE_POT: 'CAMPFIRE_POT',
  /** A bowl with food in it after having cooked from the pot */
  BOWL_OF_SOUP: 'BOWL_OF_SOUP',
} as const;

export type ItemId = EnumOf<typeof ItemId>;

type StaticItemProperties = {
  description: string;
  /** In seconds */
  chopTime: number;
  /** If true, the item can be chopped when placed on the cutting board */
  choppable: boolean;
};

export const STATIC_ITEM_PROPERTIES: Record<ItemId, StaticItemProperties> = {
  [ItemId.MUSHROOM]: {
    description: 'A magical mushroom that grows in the dark.',
    chopTime: 2,
    choppable: true,
  },
  [ItemId.ONION]: {
    description: 'A pungent onion used for cooking.',
    chopTime: 3,
    choppable: true,
  },
  [ItemId.GARLIC]: {
    description: 'A strong-smelling bulb used for flavoring.',
    chopTime: 4,
    choppable: true,
  },
  [ItemId.CAMPFIRE_POT]: {
    description: 'A pot used for cooking over a campfire.',
    chopTime: Number.POSITIVE_INFINITY,
    choppable: false,
  },
  [ItemId.BOWL_OF_SOUP]: {
    description: 'Yummy food',
    chopTime: Number.POSITIVE_INFINITY,
    choppable: false,
  },
};
