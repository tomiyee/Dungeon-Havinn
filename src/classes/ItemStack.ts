import type { Item } from "./Item";

export type ItemStack = {
  item: Item | null;
  quantity: number;
}

export class ItemStackUtils {
  static new(item: Item, quantity: number): ItemStack {
    return { item, quantity }
  }
  static newEmpty(): ItemStack {
    return { item: null, quantity: 0 }
  }
}