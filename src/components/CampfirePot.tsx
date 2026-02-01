import { useCallback } from "react";
import { type ItemStack } from "../classes/ItemStack";
import { ItemId } from "../constants/items";
import { ItemSlot } from "./ItemSlot";
import { useDungeonHavinnStore, type DungeonHavinnState } from "../store";
import { Box } from "@mui/material";
import fireSource from "../assets/bonfire.png"

const selectCampfirePot = (store: DungeonHavinnState) => store.campfirePot;

export const CampfirePot = () => {

  const campfirePot = useDungeonHavinnStore(selectCampfirePot);

  const onAddIngredient = useCallback((itemStack: ItemStack) => {
    if (itemStack.item?.itemId === ItemId.CAMPFIRE_POT) {
      useDungeonHavinnStore.setState(({ campfirePot: itemStack }))
    }
    return;
  }, []);

  return (

    <Box display='flex' flexDirection="column" gap={2}>
      <ItemSlot
        // Always show an empty pot
        itemStack={campfirePot}
        // When a user "places" an ingredient onto the pot, it gets added to the pot 
        setItemStack={onAddIngredient}
        // Ensure the user can only add one item to the campfire at a time
        maxCapacity={1}

        canReceiveItems={() => true}

        slotId={"campfire-pot"}
      />
      <img src={fireSource} width={80} />
    </Box>
  )
}