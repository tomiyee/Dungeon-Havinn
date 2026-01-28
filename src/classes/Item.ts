import type { ItemId } from "../constants/items";

export type Item = {
  itemId: ItemId;
  choppedProgress: number;
  boiledProgress: number;
}

export class ItemUtils {
  static new(itemId: ItemId): Item {
    return {
      itemId,
      choppedProgress: 0,
      boiledProgress: 0,
    }
  }
}