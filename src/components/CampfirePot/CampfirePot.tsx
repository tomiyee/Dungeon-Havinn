import { useCallback, useState } from 'react';
import { ItemStackUtils, type ItemStack } from '../../classes/ItemStack';
import { ItemSlot } from '../ItemSlot';
import { useDungeonHavinnStore, type DungeonHavinnState } from '../../store';
import litFireSource from '../../assets/bonfire.png';
import unlitFireSource from '../../assets/bonfire_unlit.png';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { isDefined } from '../../utils';
import { STATIC_ITEM_PROPERTIES } from '../../constants/items';
import { ItemTag } from '../../constants/ItemTag';
const selectCampfirePot = (store: DungeonHavinnState) => store.campfirePotSlot;

export const CampfirePot = () => {
  const campfirePotSlot = useDungeonHavinnStore(selectCampfirePot);
  const isHeatable =
    campfirePotSlot.item !== null &&
    STATIC_ITEM_PROPERTIES[campfirePotSlot.item?.itemId]?.tags.has(ItemTag.HEATABLE);
  const [cooking, setCooking] = useState(false);

  /**
   * @note Assume that the item is allowed to be dragged onto the campfire pot.
   */
  const onAddIngredient = useCallback(
    (incomingItemStack: ItemStack) => {
      if (isDefined(incomingItemStack.item) && isDefined(campfirePotSlot.item)) {
        campfirePotSlot.item.recipe ??= [];
        campfirePotSlot.item.recipe?.push({
          type: 'ingredient',
          ingredient: incomingItemStack.item,
        });
        useDungeonHavinnStore.setState({ campfirePotSlot: campfirePotSlot });
        return;
      }
      useDungeonHavinnStore.setState({ campfirePotSlot: incomingItemStack });
      return;
    },
    [campfirePotSlot],
  );

  return (
    <Box display="flex" alignItems="center" flexDirection="column" gap={2}>
      <Box position="relative">
        <ItemSlot
          // Always show an empty pot
          itemStack={campfirePotSlot}
          // When a user successfully "places" an ingredient onto the pot, it gets added to the pot
          setItemStack={onAddIngredient}
          // Ensure the user can only add one item to the campfire at a time
          maxCapacity={1}
          canReceiveItems={() => true}
          combineItems={(sourceStack) => {
            const { remainingStack, resultStack } = ItemStackUtils.splitStack(sourceStack, 1);
            return {
              remainingStack,
              resultStack,
            };
          }}
          slotId="campfire-pot"
        />
        {cooking && isHeatable && (
          <CircularProgress color="warning" disableShrink sx={styles.loadingOverlay} />
        )}
      </Box>

      <Button color="error" onClick={() => setCooking((old) => !old)}>
        <Box sx={styles.campfireIconWrapper}>
          <img src={cooking ? litFireSource : unlitFireSource} width={80} />
          <img
            className="lit-preview"
            src={litFireSource}
            width={80}
            style={styles.litCampfireIconPreview}
          />
        </Box>
      </Button>
    </Box>
  );
};

const styles = {
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    margin: 'auto',
  },
  campfireIconWrapper: {
    position: 'relative',
    '&:hover': {
      '& > .lit-preview': {
        opacity: '0.5 !important',
      },
    },
  },
  litCampfireIconPreview: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
  } as const,
};
