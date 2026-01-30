import { Box, type SxProps } from "@mui/material";
import { type ItemStack } from "../../classes/ItemStack";
import { useSetCubby } from "../../hooks/useSetCubby";
import { ItemSlot } from "../ItemSlot";

type PantryCubbyProps = {
  itemStack: ItemStack;
  cubbyIndex: number;
  onDrop?: (itemStack: ItemStack) => void;
}

export const PantryCubby: React.FC<PantryCubbyProps> = (props) => {
  const { itemStack, cubbyIndex } = props;

  const setCubbyState = useSetCubby();

  return <Box sx={styles.cubby}>
    <ItemSlot
      slotId={`pantry-cubby-${cubbyIndex}`}
      itemStack={itemStack}
      setItemStack={(newStack) => setCubbyState(cubbyIndex, newStack)}
    />
  </Box>;
}

const styles: Record<string, SxProps> = {
  cubby: {
    backgroundColor: "beige",
  }
}
