import goblinSource from '../assets/goblin-me.png';
import { ItemSlot } from './ItemSlot';
import { EMPTY_ITEM_STACK, ItemStackUtils, type ItemStack } from '../classes/ItemStack';
import { useState } from 'react';
import { ItemUtils } from '../classes/Item';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

export const LittleChef = () => {
  const [observedItem, setObservedItem] = useState(EMPTY_ITEM_STACK);

  const observedItemDescription = ItemUtils.getObservation(observedItem.item);

  return (
    <Box position="absolute" bottom="50px" left="50px">
      <Stack direction="row" spacing={1}>
        <Stack alignItems="center" spacing={1}>
          <img src={goblinSource} width={90} />
          <Box sx={{ backgroundColor: '#555a' }} p={0.5} borderRadius={2}>
            <Box sx={{ opacity: 0.5 }}>
              <ItemSlot
                slotId="goblin-inspector-slot"
                itemStack={observedItem}
                canReceiveItems={() => true}
                combineItems={(source) => ({
                  remainingStack: source,
                  resultStack: getItemToObserve(source),
                })}
                setItemStack={(itemStack) => {
                  setObservedItem(itemStack);
                }}
                disableDrag
              />
            </Box>
          </Box>
        </Stack>
        {!!observedItemDescription && (
          <Card>
            <CardContent sx={{ position: 'relative', maxWidth: '400px' }}>
              <Stack direction="row" alignItems="start">
                {observedItemDescription}
                <IconButton onClick={() => setObservedItem(EMPTY_ITEM_STACK)}>
                  <ClearIcon />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Stack>
    </Box>
  );
};

const getItemToObserve = (itemStack: ItemStack) => {
  const clone = ItemStackUtils.clone(itemStack);
  clone.quantity = 1;
  return clone;
};
