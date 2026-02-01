import { useCallback } from 'react';
import type { ItemId } from '../constants/items';
import { useDungeonHavinnStore, type DungeonHavinnState } from '../store';
import { isDefined } from '../utils';

const selectCustomItemNames = (state: DungeonHavinnState) => state.customItemNames;

export const useCustomItemNames = () => {
  return useDungeonHavinnStore(selectCustomItemNames);
};

export const useCustomItemName = (itemId: ItemId | undefined) => {
  const customItemNames = useCustomItemNames();
  const customItemName = itemId !== undefined ? customItemNames[itemId] : null;
  const setCustomItemName = useCallback(
    (customItemName: string) => {
      if (!isDefined(itemId)) {
        return;
      }
      useDungeonHavinnStore.setState((state) => ({
        customItemNames: {
          ...state.customItemNames,
          [itemId]: customItemName,
        },
      }));
    },
    [itemId],
  );

  return { customItemName, setCustomItemName };
};
