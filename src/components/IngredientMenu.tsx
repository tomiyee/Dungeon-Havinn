import { DraggableItem } from './DraggableItem';
import { ItemUtils } from '../utils/ItemUtils';
import { ItemId } from '../constants/ItemId';
import { MENU_ITEM_ID } from '../constants';
import Box from '@mui/material/Box';
import { sum } from '../utils';
import type { Item } from '../types/Item';

const MENU_ONION = {
  ...ItemUtils.newItem(ItemId.ONION, { x: 0, y: 0 }),
  id: `${MENU_ITEM_ID}-${ItemId.ONION}`,
};
const MENU_MUSHROOM = {
  ...ItemUtils.newItem(ItemId.MUSHROOM, { x: 0, y: 0 }),
  id: `${MENU_ITEM_ID}-${ItemId.MUSHROOM}`,
};

const MENU_ITEMS = [MENU_ONION, MENU_MUSHROOM];

const MENU_HEIGHT = sum(MENU_ITEMS.map((item) => ItemUtils.getItemSize(item)));

const getPositionedMenuItems = (menuItems: Item[]) => {
  let currentY = 0;
  return menuItems.map((item) => {
    const positionedItem = { ...item, position: { x: 0, y: currentY } };
    currentY += ItemUtils.getItemSize(item);
    return positionedItem;
  });
};

const FINAL_MENU_ITEMS = getPositionedMenuItems(MENU_ITEMS);

export const IngredientMenu: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        position: 'absolute',
        top: 10,
        left: 10,
        width: 100,
        height: MENU_HEIGHT,
      }}
    >
      <Box sx={{ opacity: 0.7 }}>
        {FINAL_MENU_ITEMS.map((item) => (
          <DraggableItem key={item.id} item={item} />
        ))}
      </Box>
    </Box>
  );
};
