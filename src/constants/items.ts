import type { EnumOf } from '../utils';

export const ITEM_STACK_WIDTH = 80;

export const ItemId = {
  MUSHROOM: 'MUSHROOM',
  ONION: 'ONION',
  GARLIC: 'GARLIC',
  // Special Items
  CAMPFIRE_POT: 'CAMPFIRE_POT',
} as const;

export type ItemId = EnumOf<typeof ItemId>;

type StaticItemProperties = {
  description: string;
  /** In seconds */
  chopTime: number;
};

export const STATIC_ITEM_PROPERTIES: Record<ItemId, StaticItemProperties> = {
  [ItemId.MUSHROOM]: {
    description: 'A magical mushroom that grows in the dark.',
    chopTime: 2,
  },
  [ItemId.ONION]: {
    description: 'A pungent onion used for cooking.',
    chopTime: 3,
  },
  [ItemId.GARLIC]: {
    description: 'A strong-smelling bulb used for flavoring.',
    chopTime: 4,
  },
  [ItemId.CAMPFIRE_POT]: {
    description: 'A pot used for cooking over a campfire.',
    chopTime: Number.POSITIVE_INFINITY,
  },
};
