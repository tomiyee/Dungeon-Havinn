import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useDungeonHavinnStore, type DungeonHavinnState } from '../../store';
import { RecipeUtils } from '../../classes/Recipe';
import { ItemStackDisplay } from '../ItemStackDisplay';
import { noop } from '../../utils';
import { useMemo } from 'react';

const selectRecipeState = (state: DungeonHavinnState) => state.campfirePotActiveRecipe;

export const CurrentRecipe = () => {
  const currentRecipeState = useDungeonHavinnStore(selectRecipeState);
  const currentRecipeItems = useMemo(
    () => RecipeUtils.getFinalPotState(currentRecipeState),
    [currentRecipeState],
  );
  return (
    <Stack p={1}>
      <Typography>Current Recipe</Typography>
      <Stack direction="row">
        {currentRecipeItems.map((itemStack) => (
          <ItemStackDisplay itemStack={itemStack} key={itemStack.stackId} setItemStack={noop} />
        ))}
      </Stack>
    </Stack>
  );
};
