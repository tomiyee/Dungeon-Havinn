import { ItemIcon } from '../constants/ItemIcons';
import { ItemId } from '../constants/items';

export type Item = {
  itemId: ItemId;
  choppedProgress: number;
  boiledProgress: number;
  /** If the item has had water applied */
  watered: boolean;
};

export class ItemUtils {
  static new(itemId: ItemId): Item {
    return {
      itemId,
      choppedProgress: 0,
      boiledProgress: 0,
      watered: false,
    };
  }

  static isWashable(item: Item | null): boolean {
    return (
      item !== null &&
      !item.watered &&
      (item.itemId === ItemId.MUSHROOM || item.itemId === ItemId.CAMPFIRE_POT)
    );
  }

  static getIcon(item: Item | null): string {
    if (item === null) {
      return '';
    }
    switch (item.itemId) {
      case ItemId.CAMPFIRE_POT: {
        return item.watered ? ItemIcon.CAMPFIRE_POT_FILLED : ItemIcon.CAMPFIRE_POT_EMPTY;
      }
      case ItemId.GARLIC:
        return ItemIcon.GARLIC;
      case ItemId.MUSHROOM:
        return ItemIcon.MUSHROOM;
      case ItemId.ONION:
        return ItemIcon.ONION;
      default:
        return '';
    }
  }
}
