/**
 * Type definitions for the Dungeon Havinn application
 */

import type { Item } from './Item';

export type Position = {
  x: number;
  y: number;
};

export type ActiveDragData = {
  item?: Item;
};
