import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RecipeUtils, type Recipe } from '../classes/Recipe';
import { ItemStackDisplay } from './ItemStackDisplay';
import { noop } from '../utils';
import { useMemo } from 'react';

type CurrentRecipeProps = {
  recipe: Recipe | undefined;
};

export const CurrentRecipe = (props: CurrentRecipeProps) => {
  const { recipe: currentRecipeState } = props;
  const currentRecipeItems = useMemo(
    () => (currentRecipeState ? RecipeUtils.getFinalPotState(currentRecipeState) : []),
    [currentRecipeState],
  );

  if (currentRecipeState === undefined) {
    return null;
  }

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
