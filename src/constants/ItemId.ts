import type { EnumOf } from '../utils';

export const ItemId = {
  MUSHROOM: 'MUSHROOM',
  PLATE: 'PLATE',
} as const;

export type ItemId = EnumOf<typeof ItemId>;
