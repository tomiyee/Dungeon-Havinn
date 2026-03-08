import { ItemIcon } from '../constants/ItemIcon';
import { ItemId } from '../constants/ItemId';
import type { Position } from '../types';
import type { Item } from '../types/Item';
import { assertUnreachable } from '../utils';

export class ItemUtils {
  static newItem(itemId: ItemId, position: Position): Item {
    return {
      id: crypto.randomUUID(),
      itemId,
      position,
    };
  }

  static getItemIcon(item: Item) {
    switch (item.itemId) {
      case ItemId.MUSHROOM:
        return ItemIcon.MUSHROOM;
      case ItemId.PLATE:
        return ItemIcon.PLATE;
      case ItemId.GARLIC:
        return ItemIcon.GARLIC;
      case ItemId.ONION:
        return ItemIcon.ONION;
      default:
        return assertUnreachable(item.itemId);
    }
  }

  static getItemSize(item: Item): number {
    switch (item.itemId) {
      case ItemId.MUSHROOM:
      case ItemId.ONION:
      case ItemId.GARLIC:
        return 50;
      case ItemId.PLATE:
        return 160;
      default:
        return assertUnreachable(item.itemId);
    }
  }
}
