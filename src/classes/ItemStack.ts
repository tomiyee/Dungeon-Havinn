import { isDefined } from '../utils';
import type { Item } from './Item';

/**
 * Represents a stack of items in the game inventory
 */
export type ItemStack = {
  /** A UUID that uniquely identifies this stack */
  stackId: string;
  item: Item | null;
  quantity: number;
};

/**
 * Utility class for working with ItemStacks
 */
export class ItemStackUtils {
  /**
   * Adds water to the item in the stack
   * @param itemStack - The ItemStack to add water to
   * @returns A new ItemStack with water applied to the item (if it exists)
   */
  static addWater(itemStack: ItemStack): ItemStack {
    return {
      ...itemStack,
      item: itemStack.item === null ? null : { ...itemStack.item, watered: true },
    };
  }

  /**
   * Creates a new ItemStack with the specified item and quantity
   * @param item - The item to create a stack for
   * @param quantity - The quantity of items in the stack (default: 1)
   * @returns A new ItemStack with a unique stackId
   */
  static new(item: Item, quantity = 1): ItemStack {
    return { stackId: crypto.randomUUID(), item, quantity };
  }

  /**
   * Creates a new empty ItemStack
   * @returns An empty ItemStack with stackId, null item, and 0 quantity
   */
  static newEmpty(): ItemStack {
    return { stackId: crypto.randomUUID(), item: null, quantity: 0 };
  }

  /**
   * Combines two ItemStacks together
   * @param stackSource - The source ItemStack to combine from
   * @param stackTarget - The target ItemStack to combine into
   * @param maxCapacity - The maximum capacity of the resulting stack (default: Infinity)
   * @returns An object containing the remaining stack and result stack, or null if combination is not possible
   */
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

  /**
   * Creates a clone of an ItemStack with a new unique stackId
   * @param itemStack - The ItemStack to clone
   * @returns A new ItemStack with the same properties but a new stackId
   */
  static clone(itemStack: ItemStack) {
    return {
      ...structuredClone(itemStack),
      stackId: crypto.randomUUID(),
    };
  }

  /**
   * Subtracts quantity from an ItemStack
   * @param itemStack - The ItemStack to subtract from
   * @param quantity - The quantity to subtract
   * @returns A new ItemStack with the updated quantity, or EMPTY_ITEM_STACK if result would be empty
   */
  static subtract(itemStack: ItemStack, quantity: number) {
    if (itemStack.quantity - quantity <= 0) {
      return EMPTY_ITEM_STACK;
    }
    const clonedItemStack = ItemStackUtils.clone(itemStack);
    clonedItemStack.quantity -= quantity;
    return clonedItemStack;
  }

  /**
   * Splits an ItemStack into two separate stacks
   * @param itemStack - The ItemStack to split
   * @param quantity - The quantity to move to the new stack
   * @returns An object containing the remaining stack and the new stack
   * @throws Error if the requested quantity exceeds the stack's quantity
   */
  static splitStack(itemStack: ItemStack, quantity: number) {
    if (itemStack.quantity < quantity) {
      throw new Error(`Attempted to split stack ${itemStack} into a stack with ${quantity}.`);
    }
    const remainingStack = ItemStackUtils.subtract(itemStack, quantity);
    // The remaining stack
    const resultStack = ItemStackUtils.clone(itemStack);
    resultStack.quantity = quantity;
    resultStack.stackId = crypto.randomUUID();
    return {
      remainingStack,
      resultStack,
    };
  }

  /**
   * Updates an item within an ItemStack using a transformation function
   * @param itemStack - The ItemStack containing the item to update
   * @param change - A function that takes the current item and returns an updated item
   * @returns A new ItemStack with the updated item
   */
  static updateItemInStack(itemStack: ItemStack, change: (item: Item) => Item): ItemStack {
    const currentItem = itemStack.item;
    if (currentItem === null) {
      return itemStack;
    }
    const updatedItem = change(currentItem);
    return {
      ...itemStack,
      item: updatedItem,
    };
  }
}

/**
 * An empty ItemStack constant
 */
export const EMPTY_ITEM_STACK: ItemStack = Object.freeze(ItemStackUtils.newEmpty());
