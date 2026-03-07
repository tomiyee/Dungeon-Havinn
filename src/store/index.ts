import { create } from 'zustand';
import type { Item } from '../types/Item';
import { ItemUtils } from '../utils/ItemUtils';
import { ItemId } from '../constants/ItemId';

const plate = ItemUtils.newItem(ItemId.PLATE, { x: 100, y: 100 });

type GameState = {
  /** Map of object ID to position */
  objects: Record<string, Item>;

  /** Add a new draggable item to the store */
  addItem: (item: Item) => void;

  /** Remove an object from the store */
  removeObject: (id: string) => void;

  /** Update the position of an object */
  updateObject: (id: string, position: { x: number; y: number }) => void;
};

/**
 * Zustand store for managing game object positions
 * Stores all objects in a Record<string, Item> for O(1) lookups
 */
export const useGameStore = create<GameState>((set) => ({
  objects: {
    [plate.id]: plate,
  },

  addItem: (item) =>
    set((state) => ({
      objects: {
        ...state.objects,
        [item.id]: item,
      },
    })),

  removeObject: (id) =>
    set((state) => {
      const { [id]: _, ...rest } = state.objects;
      return { objects: rest };
    }),

  updateObject: (id, position) =>
    set((state) => ({
      objects: {
        ...state.objects,
        [id]: {
          ...state.objects[id],
          position,
        },
      },
    })),
}));
