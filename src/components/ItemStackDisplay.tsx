import type { ItemStack } from '../classes/ItemStack';
import { useCustomItemName } from '../hooks/useCustomItemNames';
import { ITEM_STACK_WIDTH, ItemId } from '../constants/items';
import { useDraggable } from '@dnd-kit/core';
import type { DraggableData } from '../constants/draggableData';
import { isDefined } from '../utils';
import { ItemUtils } from '../classes/Item';
import { useState, type CSSProperties } from 'react';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';

const MAX_ITEM_NAME_LENGTH = 8;

type ItemStackDisplayProps = {
  itemStack: ItemStack;
  setItemStack: (itemStack: ItemStack) => void;
  /** If disabled, prevents users from dragging the ItemStack away */
  disabled?: boolean;
};

export const ItemStackDisplay = (props: ItemStackDisplayProps) => {
  const { itemStack, setItemStack, disabled } = props;
  const { item, quantity } = itemStack;
  const { customItemName, setCustomItemName } = useCustomItemName(item?.itemId);

  const draggableData: DraggableData = {
    itemStack,
    setItemStack,
  };

  const [editing, setEditing] = useState(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: itemStack.stackId,
    data: draggableData,
    disabled: editing || disabled,
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
        <Badge
          badgeContent={item.watered ? <WaterDropOutlinedIcon fontSize="small" /> : undefined}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          color="primary"
        >
          <Badge badgeContent={quantity > 1 ? quantity : undefined} color="primary">
            <img
              src={icon}
              alt={customItemName ?? 'Unnamed Item'}
              width={customItemName !== null ? 40 : 70}
              height={customItemName !== null ? 40 : 70}
              draggable={false}
            />
          </Badge>
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
      {customItemName !== null && (
        <Box flex={0} display="flex" justifyContent="center">
          {editing ? (
            <ItemNameInput
              itemId={item.itemId}
              onCommit={(newName) => {
                setCustomItemName(newName);
                setEditing(false);
              }}
            />
          ) : (
            <Typography
              variant="body1"
              color="black"
              sx={{
                backgroundColor: '#fffa',
                px: 0.25,
                borderRadius: 1,
                ':hover': { backgroundColor: `#fffd` },
              }}
              onClick={() => setEditing(true)}
            >
              {customItemName}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

type ItemNameInputProps = {
  itemId: ItemId;
  onCommit: (itemName: string) => void;
};

const ItemNameInput = (props: ItemNameInputProps) => {
  const { itemId, onCommit } = props;

  const { customItemName } = useCustomItemName(itemId);

  const [wipName, setWipName] = useState(customItemName ?? '');

  return (
    <TextField
      autoFocus
      value={wipName}
      onChange={(e) => setWipName(e.target.value.slice(0, MAX_ITEM_NAME_LENGTH))}
      onBlur={() => {
        // Resets the item name when the user commits an empty string
        if (validItemName(wipName)) {
          onCommit(wipName);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          if (validItemName(wipName)) {
            onCommit(wipName);
          }
        }
      }}
      style={{ background: '#fff7' }}
      // Removes the crazy amount of vertical padding
      inputProps={{
        style: {
          padding: 0,
          paddingLeft: 6,
          paddingRight: 6,
          fontSize: '0.8em',
        },
      }}
    />
  );
};

const validItemName = (itemName: string) => itemName !== '';

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
} satisfies Record<string, CSSProperties>;
