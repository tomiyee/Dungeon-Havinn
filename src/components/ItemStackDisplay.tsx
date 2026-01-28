import { Box, Badge, Typography, type SxProps } from "@mui/material";
import type { ItemStack } from "../classes/ItemStack";
import { useCustomItemName } from "../hooks/useCustomItemNames";
import { STATIC_ITEM_PROPERTIES } from "../constants/items";
import { useDraggable } from "@dnd-kit/core";
import type { DraggableData } from "../constants/draggableData";

type PantryCubbyProps = {
  itemStack: ItemStack;
  /** Callback for when the item has been moved away */
  onMoved: () => void;
}

export const ItemStackDisplay = (props: PantryCubbyProps) => {
  const { itemStack, onMoved } = props;
  const { item, quantity } = itemStack;
  const itemName = useCustomItemName(item?.itemId);


  const draggableData: DraggableData = {
    type: 'item-stack',
    itemStack,
    onMoved,
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: itemStack.stackId,
    data: draggableData
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;
  if (item?.itemId === undefined) {
    return <Box sx={styles.cubby} />;
  }
  const staticItemData = STATIC_ITEM_PROPERTIES[item.itemId];

  return (<Box sx={styles.itemStack} ref={setNodeRef} {...listeners} {...attributes} style={style}>
    <Box flex={1} display='flex' width={"100%"} alignItems="center" justifyContent='center'>
      <Badge
        badgeContent={quantity}
        color="primary"
      >
        <img src={staticItemData.icon} alt={itemName} width={32} height={32} />
      </Badge>
    </Box>
    <Box flex={0} display='flex' justifyContent='center'>
      <Typography variant='body1'>
        {itemName}
      </Typography>
    </Box>
  </Box>);
}
const styles: Record<string, SxProps> = {
  itemStack: {
    flexDirection: 'column',
    display: 'flex',
    alignContent: 'center',
    width: "80px",
    height: "80px",
  }
}