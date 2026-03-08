import type { EnumOf } from '../utils';

export const ItemId = {
  MUSHROOM: 'MUSHROOM',
  GARLIC: 'GARLIC',
  ONION: 'ONION',
  PLATE: 'PLATE',
} as const;

export type ItemId = EnumOf<typeof ItemId>;
