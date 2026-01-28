import { useDungeonHavinnStore, type DungeonHavinnState } from "../store";

const selectSetCubbyAction = (state: DungeonHavinnState) => state.actions.setCubby;

export const useSetCubby = () => {
  return useDungeonHavinnStore(selectSetCubbyAction);
};