import { ItemIcon } from '../constants/ItemIcons';
import { ItemId } from '../constants/items';
import { assertUnreachable, isDefined } from '../utils';

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

  static getObservation(item: Item | null): string | undefined {
    if (!isDefined(item)) {
      return undefined;
    }
    switch (item.itemId) {
      case ItemId.ONION: {
        return 'Spicy, crunchy thing grows from the ground.';
      }
      case ItemId.CAMPFIRE_POT: {
        if (item.watered) {
          return 'It has water inside!';
        }
        return 'I use this for food';
      }
      case ItemId.MUSHROOM: {
        if (item.choppedProgress > 0) {
          if (item.choppedProgress < 10) return 'This is not very chopped';
          if (item.choppedProgress < 50) {
            return 'This is sliced';
          }
          if (item.choppedProgress < 80) {
            return 'This is diced';
          }
          if (item.choppedProgress < 100) {
            return 'This is minced';
          }

          return 'This is mush';
        }

        return "It's a squishy brown thing. Good if I cook it.";
      }
      case ItemId.GARLIC: {
        return 'Stinky bulb';
      }
      default:
        try {
          assertUnreachable(item.itemId);
        } catch {
          return "I don't know what this is.";
        }
    }
  }
}
