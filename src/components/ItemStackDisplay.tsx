import { Box, Badge, Typography, type SxProps, LinearProgress } from '@mui/material';
import type { ItemStack } from '../classes/ItemStack';
import { useCustomItemName } from '../hooks/useCustomItemNames';
import { ITEM_STACK_WIDTH } from '../constants/items';
import { useDraggable } from '@dnd-kit/core';
import type { DraggableData } from '../constants/draggableData';
import { isDefined } from '../utils';
import { ItemUtils } from '../classes/Item';

type PantryCubbyProps = {
  itemStack: ItemStack;
  setItemStack: (itemStack: ItemStack) => void;
};

export const ItemStackDisplay = (props: PantryCubbyProps) => {
  const { itemStack, setItemStack } = props;
  const { item, quantity } = itemStack;
  const itemName = useCustomItemName(item?.itemId);

  const draggableData: DraggableData = {
    itemStack,
    setItemStack,
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: itemStack.stackId,
    data: draggableData,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  if (item?.itemId === undefined) {
    return <Box sx={styles.itemStack} />;
  }

  const icon = ItemUtils.getIcon(item);

  const hasBoiledProgress =
    isDefined(itemStack.item?.boiledProgress) && itemStack.item.boiledProgress !== 0;
  const hasChoppedProgress =
    isDefined(itemStack.item?.choppedProgress) && itemStack.item.choppedProgress !== 0;

  return (
    <Box sx={styles.itemStack} ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <Box
        flex={1}
        display="flex"
        width="100%"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <Badge badgeContent={quantity > 1 ? quantity : undefined} color="primary">
          <img
            src={icon}
            alt={itemName}
            width={itemName !== '' ? 40 : 70}
            height={itemName !== '' ? 40 : 70}
          />
        </Badge>
        {hasBoiledProgress && (
          <LinearProgress
            sx={styles.boiledProgressBar}
            variant="determinate"
            value={itemStack.item?.boiledProgress}
            color="error"
          />
        )}
        {hasChoppedProgress && (
          <LinearProgress
            sx={styles.choppedProgressBar}
            variant="determinate"
            value={itemStack.item?.choppedProgress}
            color="warning"
          />
        )}
      </Box>
      {itemName !== '' && (
        <Box flex={0} display="flex" justifyContent="center">
          <Typography
            variant="body1"
            color="black"
            sx={{ backgroundColor: '#fffa', px: 0.25, borderRadius: 1 }}
          >
            {itemName}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
const styles = {
  itemStack: {
    flexDirection: 'column',
    display: 'flex',
    alignContent: 'center',
    width: `${ITEM_STACK_WIDTH}px`,
    height: `${ITEM_STACK_WIDTH}px`,
  },
  choppedProgressBar: {
    position: 'absolute',
    bottom: 4,
    width: 'calc(100% - 8px)',
    left: 4,
  },
  boiledProgressBar: {
    position: 'absolute',
    bottom: 10,
    width: 'calc(100% - 8px)',
    left: 4,
  },
} satisfies Record<string, SxProps>;
