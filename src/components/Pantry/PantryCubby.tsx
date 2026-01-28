import { Box, type SxProps } from "@mui/material";
import { ItemStackUtils, type ItemStack } from "../../classes/ItemStack";
import { useDroppable } from "@dnd-kit/core";
import { ItemStackDisplay } from "../ItemStackDisplay";
import type { DroppableData } from "../../constants/droppableData";
import { useCallback } from "react";
import { useSetCubby } from "../../hooks/useSetCubby";

type PantryCubbyProps = {
  itemStack: ItemStack;
  cubbyIndex: number;
  onDrop?: (itemStack: ItemStack) => void;
}

export const PantryCubby: React.FC<PantryCubbyProps> = (props) => {
  const { itemStack, cubbyIndex } = props;

  const setCubbyState = useSetCubby();

  const droppableData: DroppableData = {
    type: "pantry-cubby",
    cubbyIndex,
  }

  const { setNodeRef } = useDroppable({ id: cubbyIndex, data: droppableData });



  const onMoved = useCallback(() => {
    setCubbyState(cubbyIndex, ItemStackUtils.newEmpty());
  }, [cubbyIndex, setCubbyState]);

  return <Box sx={styles.cubby} ref={setNodeRef}>
    <ItemStackDisplay itemStack={itemStack} onMoved={onMoved} />
  </Box>;
}

const styles: Record<string, SxProps> = {
  cubby: {
    backgroundColor: "beige",
    width: "80px",
    height: "80px",
  }
}
