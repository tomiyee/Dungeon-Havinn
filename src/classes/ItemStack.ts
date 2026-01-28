import type { Item } from "./Item";

export type ItemStack = {
  /** A UUID that uniquely identifies this stack */
  stackId: string;
  item: Item | null;
  quantity: number;
}

export class ItemStackUtils {
  static new(item: Item, quantity: number): ItemStack {
    return { stackId: crypto.randomUUID(), item, quantity }
  }
  static newEmpty(): ItemStack {
    return { stackId: crypto.randomUUID(), item: null, quantity: 0 }
  }

  static combine(stackA: ItemStack, stackB: ItemStack): ItemStack | null {
    if (stackA.stackId === stackB.stackId) {
      return stackA;
    }
    if (stackA.item === null) {
      return stackB;
    }
    if (stackB.item === null) {
      return stackA;
    }
    if (stackA.item?.itemId !== stackB.item?.itemId) {
      return null;
    }
    return {
      stackId: crypto.randomUUID(),
      item: stackA.item,
      quantity: stackA.quantity + stackB.quantity
    }
  }
}