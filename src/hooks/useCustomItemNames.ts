import type { ItemId } from '../constants/items';
import { useDungeonHavinnStore, type DungeonHavinnState } from '../store';

const selectCustomItemNames = (state: DungeonHavinnState) => state.customItemNames;

export const useCustomItemNames = () => {
  return useDungeonHavinnStore(selectCustomItemNames);
};

export const useCustomItemName = (itemId: ItemId | undefined): string => {
  const customItemNames = useCustomItemNames();
  return itemId !== undefined ? (customItemNames[itemId] ?? '') : '';
};
