import { Badge, Box, Typography, type SxProps } from "@mui/material";
import { useCustomItemName } from "../../hooks/useCustomItemNames";
import type { ItemStack } from "../../classes/ItemStack";
import { STATIC_ITEM_PROPERTIES } from "../../constants/items";

type PantryCubbyProps = {
  itemStack: ItemStack;
}

export const PantryCubby: React.FC<PantryCubbyProps> = (props) => {
  const { itemStack } = props;
  const { item, quantity } = itemStack;
  const itemName = useCustomItemName(item?.itemId);

  if (item?.itemId === undefined) {
    return <Box sx={styles.cubby} />;
  }

  const staticItemData = STATIC_ITEM_PROPERTIES[item.itemId];


  return <Box sx={styles.cubby}>
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
  </Box>;
}

const styles: Record<string, SxProps> = {
  cubby: {
    backgroundColor: "beige",
    flexDirection: 'column',
    display: 'flex',
    alignContent: 'center',
    width: "80px",
    height: "80px",
  }
}