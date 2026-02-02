import { isDefined } from '../utils';
import type { Item } from './Item';

export type ItemStack = {
  /** A UUID that uniquely identifies this stack */
  stackId: string;
  item: Item | null;
  quantity: number;
};

export class ItemStackUtils {
  static addWater(itemStack: ItemStack): ItemStack {
    return {
      ...itemStack,
      item: itemStack.item === null ? null : { ...itemStack.item, watered: true },
    };
  }

  static new(item: Item, quantity = 1): ItemStack {
    return { stackId: crypto.randomUUID(), item, quantity };
  }

  static newEmpty(): ItemStack {
    return { stackId: crypto.randomUUID(), item: null, quantity: 0 };
  }

  static combine(
    stackSource: ItemStack,
    stackTarget: ItemStack,
    maxCapacity = Number.POSITIVE_INFINITY,
  ): { remainingStack: ItemStack; resultStack: ItemStack } | null {
    // Combining stacks onto itself results in no change
    if (stackSource.stackId === stackTarget.stackId) {
      return { remainingStack: stackSource, resultStack: stackTarget };
    }
    // Invalid if the source item stack is empty
    if (stackSource.item === null || stackSource.quantity <= 0) {
      return { remainingStack: stackSource, resultStack: stackTarget };
    }
    // Different types of items cannot be combined
    if (
      isDefined(stackSource.item?.itemId) &&
      isDefined(stackTarget.item?.itemId) &&
      stackSource.item?.itemId !== stackTarget.item?.itemId
    ) {
      return null;
    }
    // Items that have different chopped/boiled progress cannot be combined
    if (isDefined(stackSource.item) && isDefined(stackTarget.item)) {
      if (
        stackSource.item.choppedProgress !== stackTarget.item.choppedProgress ||
        stackSource.item.boiledProgress !== stackTarget.item.boiledProgress
      ) {
        return null;
      }
    }

    const totalQuantity = stackSource.quantity + stackTarget.quantity;
    if (totalQuantity > maxCapacity) {
      return {
        remainingStack: {
          stackId: stackSource.stackId,
          item: stackSource.item,
          quantity: totalQuantity - maxCapacity,
        },
        resultStack: {
          stackId: crypto.randomUUID(),
          item: stackSource.item,
          quantity: maxCapacity,
        },
      };
    }

    return {
      remainingStack: ItemStackUtils.newEmpty(),
      resultStack: {
        stackId: crypto.randomUUID(),
        item: stackSource.item,
        quantity: totalQuantity,
      },
    };
  }

  static clone(itemStack: ItemStack) {
    return {
      ...structuredClone(itemStack),
      stackId: crypto.randomUUID(),
    };
  }
}

export const EMPTY_ITEM_STACK: ItemStack = Object.freeze(ItemStackUtils.newEmpty());
