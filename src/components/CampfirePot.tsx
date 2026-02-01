import { useCallback, useId, useState } from 'react';
import { type ItemStack } from '../classes/ItemStack';
import { ItemId } from '../constants/items';
import { ItemSlot } from './ItemSlot';
import { useDungeonHavinnStore, type DungeonHavinnState } from '../store';
import { Box, Button, CircularProgress, Popover, Stack, Typography } from '@mui/material';
import litFireSource from '../assets/bonfire.png';
import unlitFireSource from '../assets/bonfire_unlit.png';

const selectCampfirePot = (store: DungeonHavinnState) => store.campfirePot;

export const CampfirePot = () => {
  const campfirePot = useDungeonHavinnStore(selectCampfirePot);
  const [cooking, setCooking] = useState(false);

  const onAddIngredient = useCallback((itemStack: ItemStack) => {
    if (itemStack.item?.itemId === ItemId.CAMPFIRE_POT) {
      useDungeonHavinnStore.setState({ campfirePot: itemStack });
    }
    return;
  }, []);

  const popoverId = useId();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isViewingRecipe = Boolean(anchorEl);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" alignItems="center" flexDirection="column" gap={2}>
      <Box
        position="relative"
        aria-haspopup="true"
        aria-owns={isViewingRecipe ? popoverId : undefined}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <ItemSlot
          // Always show an empty pot
          itemStack={campfirePot}
          // When a user "places" an ingredient onto the pot, it gets added to the pot
          setItemStack={onAddIngredient}
          // Ensure the user can only add one item to the campfire at a time
          maxCapacity={1}
          canReceiveItems={() => true}
          slotId="campfire-pot"
        />
        {cooking && (
          <CircularProgress
            color="warning"
            disableShrink
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              margin: 'auto',
            }}
          />
        )}
      </Box>

      <Popover
        open={isViewingRecipe}
        sx={{ pointerEvents: 'none' }}
        id={popoverId}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Stack p={1}>
          <Typography>Current Recipe</Typography>
        </Stack>
      </Popover>
      <Button color="error" onClick={() => setCooking((old) => !old)}>
        <Box
          sx={{
            position: 'relative',
            '&:hover': {
              '& > .lit-preview': {
                opacity: '0.5 !important',
              },
            },
          }}
        >
          <img src={cooking ? litFireSource : unlitFireSource} width={80} />
          <img
            className="lit-preview"
            src={litFireSource}
            width={80}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: 0,
            }}
          />
        </Box>
      </Button>
    </Box>
  );
};
