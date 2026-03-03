import type { EnumOf } from '../utils';
import { ItemTag } from './ItemTag';

export const ITEM_STACK_WIDTH = 80;

export const ItemId = {
  MUSHROOM: 'MUSHROOM',
  ONION: 'ONION',
  GARLIC: 'GARLIC',
  // Special Items
  CAMPFIRE_POT: 'CAMPFIRE_POT',
  /** A bowl possibly with soup */
  BOWL: 'BOWL',
} as const;

export type ItemId = EnumOf<typeof ItemId>;

type StaticItemProperties = {
  description: string;
  /** In seconds */
  chopTime: number;

  tags: Set<ItemTag>;
};

export const STATIC_ITEM_PROPERTIES: Record<ItemId, StaticItemProperties> = {
  [ItemId.MUSHROOM]: {
    description: 'A magical mushroom that grows in the dark.',
    chopTime: 2,
    tags: new Set([ItemTag.CHOPPABLE, ItemTag.INGREDIENT]),
  },
  [ItemId.ONION]: {
    description: 'A pungent onion used for cooking.',
    chopTime: 3,
    tags: new Set([ItemTag.CHOPPABLE, ItemTag.INGREDIENT]),
  },
  [ItemId.GARLIC]: {
    description: 'A strong-smelling bulb used for flavoring.',
    chopTime: 4,
    tags: new Set([ItemTag.CHOPPABLE, ItemTag.INGREDIENT]),
  },
  [ItemId.CAMPFIRE_POT]: {
    description: 'A pot used for cooking over a campfire.',
    chopTime: Number.POSITIVE_INFINITY,
    tags: new Set([ItemTag.HEATABLE]),
  },
  [ItemId.BOWL]: {
    description: 'Holds yummy food',
    chopTime: Number.POSITIVE_INFINITY,
    tags: new Set([]),
  },
};
