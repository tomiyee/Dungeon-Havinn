import type { Position } from '.';
import { ItemId } from '../constants/ItemId';

export type Item = {
  /** The ID for the draggable instance */
  id: string;
  /** The type of Item this is */
  itemId: ItemId;

  position: Position;
};
